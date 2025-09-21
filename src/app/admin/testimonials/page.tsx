import AdminLayout from "../../../admin/components/AdminLayout";
import TestimonialManagement from "../../../admin/components/TestimonialManagement";

export const metadata = {
  title: "Testimonial Management - Outlfy Admin",
  description: "Manage client testimonials and reviews",
};

export default function TestimonialsPage() {
  return (
    <AdminLayout>
      <TestimonialManagement />
    </AdminLayout>
  );
}