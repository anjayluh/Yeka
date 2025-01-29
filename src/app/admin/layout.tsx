import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="admin-layout">
        {children} {/* Let Next.js dynamically load the correct page */}
      </div>
    </AuthGuard>
  );
}
