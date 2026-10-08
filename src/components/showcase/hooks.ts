import { useEffect, useState, useSyncExternalStore } from "react";

const reducedQuery = "(prefers-reduced-motion: reduce)";

/** True when the visitor asked for less motion. Server render assumes motion is fine. */
export function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(reducedQuery);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

/** True while the browser tab is in the background. */
export function useDocumentHidden() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => document.visibilityState === "hidden",
    () => false,
  );
}

/**
 * Drives "messages appear one by one". For each message it first shows a typing
 * indicator (typingMs[i]) and then the message itself.
 *
 * - `shown`: how many messages are fully visible
 * - `typingIndex`: which message is "being typed" right now (-1 for none)
 *
 * The sequence starts whenever the slide becomes active and resets shortly after
 * it fades out, so the next visit starts fresh. When `live` is false (reduced
 * motion) nothing runs and the caller shows every message at once.
 */
export function useChatSequence(active: boolean, live: boolean, typingMs: number[]) {
  const [state, setState] = useState({ shown: 0, typingIndex: -1 });
  // Stable key so the effect does not restart on every render
  const timing = typingMs.join(",");

  useEffect(() => {
    if (!live) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (!active) {
      // Reset after the fade-out has finished
      timers.push(setTimeout(() => setState({ shown: 0, typingIndex: -1 }), 700));
    } else {
      let time = 300;
      timing.split(",").forEach((value, index) => {
        timers.push(setTimeout(() => setState({ shown: index, typingIndex: index }), time));
        time += Number(value);
        timers.push(setTimeout(() => setState({ shown: index + 1, typingIndex: -1 }), time));
        time += 450;
      });
    }

    return () => timers.forEach(clearTimeout);
  }, [active, live, timing]);

  return state;
}

/** Counts up once per second while the slide is active (for the "Live call" timer). */
export function useElapsedSeconds(active: boolean, live: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!live) return;
    if (!active) {
      const reset = setTimeout(() => setSeconds(0), 700);
      return () => clearTimeout(reset);
    }
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(tick);
  }, [active, live]);

  return seconds;
}
