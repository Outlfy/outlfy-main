"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Form, InputGroup, Alert } from "react-bootstrap";

// Dummy data for demonstration
const dummyData = [
  {
    _id: "1",
    title: "MyDayOne E-commerce Platform",
    slug: "mydayone-ecommerce",
    clientName: "MyDayOne",
    industry: "E-commerce",
    projectType: "Web Development",
    featured: true,
    published: true,
    createdAt: "2024-01-15",
    timeline: {
      start: "2024-01-01",
      end: "2024-02-15"
    }
  },
  {
    _id: "2",
    title: "Novam Legal Management System",
    slug: "novam-legal-system",
    clientName: "Novam Legal",
    industry: "Legal",
    projectType: "Custom Software",
    featured: false,
    published: true,
    createdAt: "2024-02-20",
    timeline: {
      start: "2024-02-01",
      end: "2024-03-30"
    }
  },
  {
    _id: "3",
    title: "Soach Global App Ecosystem",
    slug: "soach-global-ecosystem",
    clientName: "Soach Global",
    industry: "Technology",
    projectType: "Mobile App",
    featured: true,
    published: false,
    createdAt: "2024-03-10",
    timeline: {
      start: "2024-03-01",
      end: "2024-04-20"
    }
  }
];

const CaseStudyList = ({ onSelect, onDelete, refreshTrigger }) => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchCaseStudies();
  }, [refreshTrigger]);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
      setCaseStudies(dummyData);
    } catch (error) {
      setMessage({ type: "danger", text: "Error loading case studies" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      try {
        // Simulate API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 500));
        setCaseStudies(prev => prev.filter(cs => cs._id !== id));
        setMessage({ type: "success", text: "Case study deleted successfully" });
        if (onDelete) onDelete();
      } catch (error) {
        setMessage({ type: "danger", text: "Error deleting case study" });
      }
    }
  };

  const toggleStatus = async (id, field) => {
    try {
      setCaseStudies(prev => 
        prev.map(cs => 
          cs._id === id ? { ...cs, [field]: !cs[field] } : cs
        )
      );
      setMessage({ type: "success", text: `Case study ${field} updated` });
    } catch (error) {
      setMessage({ type: "danger", text: `Error updating ${field}` });
    }
  };

  const filteredCaseStudies = caseStudies.filter(cs => {
    const matchesSearch = cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cs.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cs.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "published" && cs.published) ||
                         (filterStatus === "draft" && !cs.published) ||
                         (filterStatus === "featured" && cs.featured);
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-card">
      <div className="card-header">
        <h5>
          <i className="fas fa-briefcase me-2"></i>
          Case Studies ({filteredCaseStudies.length})
        </h5>
      </div>

      {message.text && (
        <Alert variant={message.type} className="mb-3" dismissible onClose={() => setMessage({ type: "", text: "" })}>
          {message.text}
        </Alert>
      )}

      {/* Search and Filter */}
      <div className="row mb-3">
        <div className="col-md-8">
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by title, client, or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-4">
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Case Studies</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="featured">Featured</option>
          </Form.Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
          <p className="mt-2">Loading case studies...</p>
        </div>
      ) : (
        <Table responsive className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Industry</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCaseStudies.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <i className="fas fa-folder-open fa-2x text-muted mb-2 d-block"></i>
                  No case studies found
                </td>
              </tr>
            ) : (
              filteredCaseStudies.map((cs) => (
                <tr key={cs._id}>
                  <td>
                    <div>
                      <strong>{cs.title}</strong>
                      <br />
                      <small className="text-muted">/{cs.slug}</small>
                    </div>
                  </td>
                  <td>{cs.clientName}</td>
                  <td>{cs.industry}</td>
                  <td>
                    <Badge bg="info" className="rounded-pill">
                      {cs.projectType}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      <Badge 
                        bg={cs.published ? "success" : "secondary"} 
                        className="rounded-pill cursor-pointer"
                        onClick={() => toggleStatus(cs._id, "published")}
                        style={{ cursor: "pointer" }}
                      >
                        {cs.published ? "Published" : "Draft"}
                      </Badge>
                      {cs.featured && (
                        <Badge 
                          bg="warning" 
                          className="rounded-pill cursor-pointer"
                          onClick={() => toggleStatus(cs._id, "featured")}
                          style={{ cursor: "pointer" }}
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td>{formatDate(cs.createdAt)}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => onSelect(cs)}
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-success"
                        onClick={() => window.open(`/case-studies/${cs.slug}`, '_blank')}
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(cs._id)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CaseStudyList;
