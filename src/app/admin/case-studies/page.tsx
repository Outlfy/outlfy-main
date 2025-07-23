"use client";
import { useState } from "react";
import AdminLayout from "../../../admin/components/AdminLayout";
import CaseStudyList from "../../../admin/components/CaseStudyList";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CaseStudiesPage() {
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelect = (caseStudy: any) => {
    // Navigate to edit page
    router.push(`/admin/case-studies/edit/${caseStudy._id}`);
  };

  const handleDelete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i className="fas fa-briefcase me-3"></i>
            Case Studies Management
          </h1>
          <Link href="/admin/case-studies/new" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            New Case Study
          </Link>
        </div>
        <CaseStudyList 
          onSelect={handleSelect}
          onDelete={handleDelete}
          refreshTrigger={refreshTrigger}
        />
      </div>
    </AdminLayout>
  );
}
