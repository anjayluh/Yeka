import AdminDashboard from '@/app/admin/page'; 
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="admin-layout">
        <AdminDashboard />
        {children}
      </div>
    </AuthGuard>
  );
}
