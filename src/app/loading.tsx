export default function Loading() {
  return (
    <div className="site-container py-10" role="status" aria-label="Loading">
      <div className="h-8 w-40 rounded-lg bg-violet-tint" />
      <div className="mt-8 h-12 w-full max-w-lg rounded-lg bg-violet-tint" />
      <div className="mt-4 h-4 w-full max-w-xl rounded bg-violet-tint/80" />
      <div className="mt-2 h-4 w-4/5 max-w-md rounded bg-violet-tint/80" />
    </div>
  );
}
