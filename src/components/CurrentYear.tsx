import { cacheLife } from "next/cache";

// Cached and refreshed daily so the footer year stays current without
// forcing the whole layout to render dynamically.
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
