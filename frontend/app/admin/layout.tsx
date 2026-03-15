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
    <div className="h-screen w-screen overflow-hidden">
      {children}
    </div>
  );
}
