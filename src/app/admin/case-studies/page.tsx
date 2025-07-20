"use client";
import { useState } from "react";
import AdminLayout from "../../../admin/components/AdminLayout";
import CaseStudyForm from "../../../admin/components/CaseStudyForm";
import CaseStudyList from "../../../admin/components/CaseStudyList";
import { Button } from "react-bootstrap";

export default function CaseStudiesPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelect = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setShowForm(true);
  };

  const handleSave = () => {
    setSelectedCaseStudy(null);
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCancel = () => {
    setSelectedCaseStudy(null);
    setShowForm(false);
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
          <Button
            variant="primary"
            onClick={() => setShowForm(!showForm)}
            className="d-flex align-items-center"
          >
            <i className={`fas ${showForm ? 'fa-list' : 'fa-plus'} me-2`}></i>
            {showForm ? 'View List' : 'Add New Case Study'}
          </Button>
        </div>

        <div className="row">
          {!showForm ? (
            <div className="col-12">
              <CaseStudyList 
                onSelect={handleSelect}
                onDelete={handleDelete}
                refreshTrigger={refreshTrigger}
              />
            </div>
          ) : (
            <>
              <div className="col-lg-4">
                <CaseStudyList 
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                  refreshTrigger={refreshTrigger}
                />
              </div>
              <div className="col-lg-8">
                <CaseStudyForm
                  selected={selectedCaseStudy}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
