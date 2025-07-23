"use client";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../../admin/components/AdminLayout";
import CaseStudyForm from "../../../../admin/components/CaseStudyForm";

export default function NewCaseStudyPage() {
  const router = useRouter();

  const handleSave = () => {
    // Redirect to case studies list after saving
    router.push('/admin/case-studies');
  };

  const handleCancel = () => {
    // Redirect back to case studies list
    router.push('/admin/case-studies');
  };

  return (
    <AdminLayout>
      <div className="fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i className="fas fa-plus me-3"></i>
            Create New Case Study
          </h1>
          <button 
            onClick={handleCancel}
            className="btn btn-outline-secondary"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Case Studies
          </button>
        </div>
        <CaseStudyForm 
          selected={null}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
