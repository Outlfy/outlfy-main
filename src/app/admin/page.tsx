import AdminLayout from "../../admin/components/AdminLayout";
import AdminDashboard from "../../admin/components/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard - Outlfy",
  description: "Outlfy Admin Panel Dashboard",
};

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
