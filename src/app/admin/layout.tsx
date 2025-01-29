import AuthGuard from "@/components/auth/AuthGuard";
import AdminDashboard from '@/app/admin/page';
import AddProduct from '@/app/admin/products/add-product/page';
import EditProduct from '@/app/admin/products/edit-product/page';
import ContactsDashboard from '@/app/admin/contacts/page';
import AddContact from '@/app/admin/contacts/add-contact/page';
import EditContact from '@/app/admin/contacts/edit-contact/page';
import BlogsDashboard from '@/app/admin/blogs/page';
import AddBlog from '@/app/admin/blogs/add-blog/page';
import EditBlog from '@/app/admin/blogs/edit-blog/page';
import ProgramsDashboard from '@/app/admin/training-programs/page';
import AddProgram from '@/app/admin/training-programs/add-training-program/page';
import EditProgram from '@/app/admin/training-programs/edit-training-program/page';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="admin-layout">
        <AdminDashboard />
        <AddProduct />
        <EditProduct />
        <ContactsDashboard />
        <AddContact />
        <EditContact />
        <BlogsDashboard />
        <AddBlog />
        <EditBlog />
        <ProgramsDashboard />
        <AddProgram />
        <EditProgram />
        {children}
      </div>
    </AuthGuard>
  );
}
