"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import LeadFlow from "@/components/lead/LeadFlow";
import type { BusinessType, Interest } from "@/lib/lead";

type OpenOptions = { business?: BusinessType; interests?: Interest[] };

const LeadModalContext = createContext<{ open: (options?: OpenOptions) => void }>({
  open: () => {},
});

export function useLeadModal() {
  return useContext(LeadModalContext);
}

/**
 * Wraps the site once. Any <DemoButton> opens the 2-step form in a modal.
 * Uses the native <dialog> element, which gives us a focus trap, Escape to close,
 * an inert background and focus return to the button that opened it.
 */
export default function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [business, setBusiness] = useState<BusinessType | undefined>();
  const [interests, setInterests] = useState<Interest[] | undefined>();
  const [session, setSession] = useState(0); // new key = a fresh, empty form each time
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((options?: OpenOptions) => {
    setBusiness(options?.business);
    setInterests(options?.interests);
    setSession((n) => n + 1);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden"; // lock page scroll

    return () => {
      html.style.overflow = previousOverflow;
      if (dialog.open) dialog.close(); // returns focus to the opener
    };
  }, [isOpen]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={close} // fires on Escape too
        onClick={(event) => {
          if (event.target === event.currentTarget) close(); // click on the backdrop
        }}
        aria-label="Get a free demo"
        className="m-auto h-dvh max-h-none w-full max-w-none overflow-hidden bg-white p-0 text-charcoal backdrop:bg-charcoal/40 backdrop:backdrop-blur-sm md:h-fit md:max-w-4xl md:rounded-3xl md:shadow-[0_30px_80px_-20px_rgb(31_41_55/0.45)]"
      >
        {isOpen && (
          <LeadFlow
            key={session}
            layout="modal"
            initialBusiness={business}
            initialInterests={interests}
            onClose={close}
          />
        )}
      </dialog>
    </LeadModalContext.Provider>
  );
}
