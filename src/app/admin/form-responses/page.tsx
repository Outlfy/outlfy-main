import AdminLayout from "../../../admin/components/AdminLayout";
import FormResponseList from "../../../admin/components/FormResponseList";

export const metadata = {
  title: "Form Responses - Admin Dashboard",
  description: "Manage contact form submissions and inquiries",
};

export default function FormResponsesPage() {
  return (
    <AdminLayout>
      <div className="fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i className="fas fa-envelope me-3"></i>
            Form Responses
          </h1>
          <div className="text-muted">
            <i className="fas fa-info-circle me-1"></i>
            Manage contact form submissions
          </div>
        </div>
        <FormResponseList />
      </div>
    </AdminLayout>
  );
}
