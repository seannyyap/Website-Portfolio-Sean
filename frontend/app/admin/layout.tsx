/**
 * Admin layout: Sanity Studio gets full viewport.
 * No max-width or padding so the Studio can use the full window.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full overflow-hidden">
      {children}
    </div>
  );
}
