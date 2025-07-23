"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { authUtils } from "@/lib/authUtils";
import AdminLayout from "../../../../../admin/components/AdminLayout";
import CaseStudyForm from "../../../../../admin/components/CaseStudyForm";

export default function EditCaseStudyPage() {
  const router = useRouter();
  const params = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCaseStudy();
    }
  }, [params.id]);

  const fetchCaseStudy = async () => {
    try {
      const response = await authUtils.authenticatedFetch(`/api/admin/case-studies/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCaseStudy(data);
      } else {
        console.error('Failed to fetch case study');
        router.push('/admin/case-studies');
      }
    } catch (error) {
      console.error('Error fetching case study:', error);
      router.push('/admin/case-studies');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    router.push('/admin/case-studies');
  };

  const handleCancel = () => {
    router.push('/admin/case-studies');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-5">
          <i className="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
          <p>Loading case study...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i className="fas fa-edit me-3"></i>
            Edit Case Study
          </h1>
          <button 
            onClick={handleCancel}
            className="btn btn-outline-secondary"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Case Studies
          </button>
        </div>
        {caseStudy && (
          <CaseStudyForm 
            selected={caseStudy}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </AdminLayout>
  );
}
