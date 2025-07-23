"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Form, InputGroup, Alert, Modal } from "react-bootstrap";
import { authUtils } from "@/lib/authUtils";

const FormResponseList = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const response = await authUtils.authenticatedFetch('/api/admin/form-responses');
      if (response.ok) {
        const data = await response.json();
        setResponses(data.responses || []);
      } else {
        throw new Error('Failed to fetch form responses');
      }
    } catch (error) {
      console.error('Error loading form responses:', error);
      setMessage({ type: "danger", text: "Error loading form responses" });
      setResponses([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await authUtils.authenticatedFetch(`/api/admin/form-responses/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setResponses(prev => 
          prev.map(response => 
            response._id === id ? { ...response, status: newStatus } : response
          )
        );
        setMessage({ type: "success", text: "Status updated successfully" });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage({ type: "danger", text: "Error updating status" });
    }
  };

  const updateNotes = async (id, notes) => {
    try {
      const response = await authUtils.authenticatedFetch(`/api/admin/form-responses/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ adminNotes: notes }),
      });
      
      if (response.ok) {
        setResponses(prev => 
          prev.map(response => 
            response._id === id ? { ...response, adminNotes: notes } : response
          )
        );
        setMessage({ type: "success", text: "Notes updated successfully" });
      } else {
        throw new Error('Failed to update notes');
      }
    } catch (error) {
      console.error('Error updating notes:', error);
      setMessage({ type: "danger", text: "Error updating notes" });
    }
  };

  const deleteResponse = async (id) => {
    if (window.confirm("Are you sure you want to delete this response?")) {
      try {
        const response = await authUtils.authenticatedFetch(`/api/admin/form-responses/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setResponses(prev => prev.filter(response => response._id !== id));
          setMessage({ type: "success", text: "Response deleted successfully" });
        } else {
          throw new Error('Failed to delete response');
        }
      } catch (error) {
        console.error('Error deleting response:', error);
        setMessage({ type: "danger", text: "Error deleting response" });
      }
    }
  };

  const filteredResponses = responses.filter(response => {
    const matchesSearch = (response.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (response.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (response.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (response.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || response.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      new: "primary",
      read: "info",
      replied: "success",
      archived: "secondary"
    };
    return <Badge bg={variants[status]} className="rounded-pill">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const handleViewDetails = (response) => {
    setSelectedResponse(response);
    setShowModal(true);
    if (response.status === 'new') {
      updateStatus(response._id, 'read');
    }
  };

  return (
    <div className="admin-card">
      <div className="card-header">
        <h5>
          <i className="fas fa-envelope me-2"></i>
          Form Responses ({filteredResponses.length})
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
              placeholder="Search by name, email, subject, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-4">
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </Form.Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
          <p className="mt-2">Loading responses...</p>
        </div>
      ) : (
        <Table responsive className="admin-table">
          <thead>
            <tr>
              <th>Contact Info</th>
              <th>Subject</th>
              <th>Message Preview</th>
              <th>Source</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResponses.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <i className="fas fa-inbox fa-2x text-muted mb-2 d-block"></i>
                  No responses found
                </td>
              </tr>
            ) : (
              filteredResponses.map((response) => (
                <tr key={response._id} className={response.status === 'new' ? 'table-primary' : ''}>
                  <td>
                    <div>
                      <strong>{response.name}</strong>
                      <br />
                      <a href={`mailto:${response.email}`} className="text-decoration-none">
                        {response.email}
                      </a>
                      {response.phone && (
                        <>
                          <br />
                          <a href={`tel:${response.phone}`} className="text-decoration-none text-muted">
                            {response.phone}
                          </a>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{response.subject}</td>
                  <td>
                    <div style={{ maxWidth: '200px' }}>
                      {response.message.length > 100 
                        ? response.message.substring(0, 100) + '...'
                        : response.message
                      }
                    </div>
                  </td>
                  <td>
                    <Badge bg="outline-secondary" className="rounded-pill">
                      {response.source}
                    </Badge>
                  </td>
                  <td>{getStatusBadge(response.status)}</td>
                  <td>{formatDate(response.createdAt)}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => handleViewDetails(response)}
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-success"
                        onClick={() => window.open(`mailto:${response.email}`, '_blank')}
                        title="Reply via Email"
                      >
                        <i className="fas fa-reply"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteResponse(response._id)}
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

      {/* Response Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-envelope me-2"></i>
            Response Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResponse && (
            <div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6>Contact Information</h6>
                  <p><strong>Name:</strong> {selectedResponse.name}</p>
                  <p><strong>Email:</strong> <a href={`mailto:${selectedResponse.email}`}>{selectedResponse.email}</a></p>
                  {selectedResponse.phone && <p><strong>Phone:</strong> <a href={`tel:${selectedResponse.phone}`}>{selectedResponse.phone}</a></p>}
                </div>
                <div className="col-md-6">
                  <h6>Submission Details</h6>
                  <p><strong>Source:</strong> {selectedResponse.source}</p>
                  <p><strong>Date:</strong> {formatDate(selectedResponse.createdAt)}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedResponse.status)}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <h6>Subject</h6>
                <p>{selectedResponse.subject}</p>
              </div>
              
              <div className="mb-3">
                <h6>Message</h6>
                <div className="p-3 bg-light rounded">
                  {selectedResponse.message}
                </div>
              </div>
              
              <div className="mb-3">
                <Form.Label><strong>Admin Notes</strong></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedResponse.adminNotes}
                  onChange={(e) => setSelectedResponse({...selectedResponse, adminNotes: e.target.value})}
                  placeholder="Add notes about this response..."
                />
              </div>
              
              <div className="mb-3">
                <Form.Label><strong>Status</strong></Form.Label>
                <Form.Select
                  value={selectedResponse.status}
                  onChange={(e) => setSelectedResponse({...selectedResponse, status: e.target.value})}
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </Form.Select>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              updateStatus(selectedResponse._id, selectedResponse.status);
              updateNotes(selectedResponse._id, selectedResponse.adminNotes);
              setShowModal(false);
            }}
          >
            <i className="fas fa-save me-1"></i>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormResponseList;
