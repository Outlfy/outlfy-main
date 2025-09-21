"use client";
import React, { useState, useEffect } from 'react';

const TestimonialList = ({ onEdit, onView, onCreate }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [stats, setStats] = useState(null);
  
  // Filters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: '',
    featured: '',
    company: '',
    projectType: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'featured', label: 'Featured' }
  ];

  const projectTypes = [
    { value: '', label: 'All Project Types' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' }
  ];

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          params.append(key, value);
        }
      });

      const response = await fetch(`/api/admin/testimonials?${params}`);
      const result = await response.json();

      if (result.success) {
        setTestimonials(result.data);
        setError('');
      } else {
        setError(result.message || 'Failed to fetch testimonials');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/testimonials?stats=true');
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(testimonials.map(t => t._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update-status', status })
      });

      const result = await response.json();
      if (result.success) {
        fetchTestimonials();
        fetchStats();
      } else {
        alert(result.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Status update error:', err);
      alert('Network error occurred');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-featured' })
      });

      const result = await response.json();
      if (result.success) {
        fetchTestimonials();
        fetchStats();
      } else {
        alert(result.message || 'Failed to toggle featured status');
      }
    } catch (err) {
      console.error('Toggle featured error:', err);
      alert('Network error occurred');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} testimonials?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedItems })
      });

      const result = await response.json();
      if (result.success) {
        setSelectedItems([]);
        fetchTestimonials();
        fetchStats();
        alert(result.message);
      } else {
        alert(result.message || 'Failed to delete testimonials');
      }
    } catch (err) {
      console.error('Bulk delete error:', err);
      alert('Network error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        fetchTestimonials();
        fetchStats();
        alert('Testimonial deleted successfully');
      } else {
        alert(result.message || 'Failed to delete testimonial');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error occurred');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning',
      approved: 'bg-success',
      rejected: 'bg-danger',
      featured: 'bg-primary'
    };
    return badges[status] || 'bg-secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getExcerpt = (html, maxLength = 100) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading && testimonials.length === 0) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonial-list">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Testimonials</h2>
          {stats && (
            <div className="d-flex gap-3 mt-2">
              <small className="text-muted">Total: {stats.total}</small>
              <small className="text-muted">Featured: {stats.featured}</small>
              {stats.byStatus.map(stat => (
                <small key={stat._id} className="text-muted">
                  {stat._id}: {stat.count}
                </small>
              ))}
            </div>
          )}
        </div>
        <button className="btn btn-primary" onClick={onCreate}>
          <i className="fas fa-plus me-2"></i>
          Add Testimonial
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="form-select form-select-sm"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label">Featured</label>
              <select
                value={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="">All</option>
                <option value="true">Featured</option>
                <option value="false">Not Featured</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label">Project Type</label>
              <select
                value={filters.projectType}
                onChange={(e) => handleFilterChange('projectType', e.target.value)}
                className="form-select form-select-sm"
              >
                {projectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Company Search</label>
              <input
                type="text"
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
                placeholder="Search by company name..."
                className="form-control form-control-sm"
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="createdAt">Date Created</option>
                <option value="name">Name</option>
                <option value="company">Company</option>
                <option value="status">Status</option>
                <option value="displayOrder">Display Order</option>
              </select>
            </div>

            <div className="col-md-1">
              <label className="form-label">Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span>{selectedItems.length} testimonials selected</span>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleBulkDelete}
          >
            <i className="fas fa-trash me-1"></i>
            Delete Selected
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th width="40">
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedItems.length === testimonials.length && testimonials.length > 0}
                    className="form-check-input"
                  />
                </th>
                <th>Client</th>
                <th>Company</th>
                <th>Testimonial</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Project Type</th>
                <th>Created</th>
                <th width="200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(testimonial => (
                <tr key={testimonial._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(testimonial._id)}
                      onChange={(e) => handleSelectItem(testimonial._id, e.target.checked)}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      {testimonial.profilePicture && (
                        <img
                          src={testimonial.profilePicture}
                          alt={testimonial.name}
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          className="rounded-circle me-2"
                        />
                      )}
                      <div>
                        <div className="fw-bold">{testimonial.name}</div>
                        <small className="text-muted">{testimonial.position}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      {testimonial.companyLogo && (
                        <img
                          src={testimonial.companyLogo}
                          alt={testimonial.company}
                          style={{ width: '30px', height: '20px', objectFit: 'contain' }}
                          className="me-2"
                        />
                      )}
                      <span>{testimonial.company}</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-truncate" style={{ maxWidth: '200px' }}>
                      {getExcerpt(testimonial.testimonial)}
                    </div>
                  </td>
                  <td>
                    <select
                      value={testimonial.status}
                      onChange={(e) => handleStatusUpdate(testimonial._id, e.target.value)}
                      className={`form-select form-select-sm badge ${getStatusBadge(testimonial.status)} border-0`}
                      style={{ color: 'white', fontSize: '0.75rem' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="featured">Featured</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleFeatured(testimonial._id)}
                      className={`btn btn-sm ${testimonial.featured ? 'btn-warning' : 'btn-outline-warning'}`}
                    >
                      <i className={`fas fa-star ${testimonial.featured ? '' : 'text-muted'}`}></i>
                    </button>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{testimonial.projectType}</span>
                  </td>
                  <td>
                    <small>{formatDate(testimonial.createdAt)}</small>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        onClick={() => onView(testimonial)}
                        className="btn btn-outline-info"
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => onEdit(testimonial)}
                        className="btn btn-outline-primary"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="btn btn-outline-danger"
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {testimonials.length === 0 && !loading && (
          <div className="text-center p-4">
            <div className="text-muted">
              <i className="fas fa-comments fa-2x mb-2"></i>
              <p>No testimonials found</p>
              <button className="btn btn-primary" onClick={onCreate}>
                Add Your First Testimonial
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {testimonials.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Showing page {filters.page} of {Math.ceil((stats?.total || 0) / filters.limit)}
          </div>
          <div className="btn-group">
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page <= 1}
              className="btn btn-outline-secondary"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={testimonials.length < filters.limit}
              className="btn btn-outline-secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialList;