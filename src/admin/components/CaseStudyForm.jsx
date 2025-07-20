"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Accordion, Row, Col, Alert } from "react-bootstrap";

const sectionFields = [
  { key: "theProblem", label: "The Problem", icon: "fas fa-exclamation-triangle" },
  { key: "whatWeBuilt", label: "What We Built", icon: "fas fa-tools" },
  { key: "howWeDidIt", label: "How We Did It", icon: "fas fa-cogs" },
  { key: "theResults", label: "The Results", icon: "fas fa-chart-bar" },
  { key: "whatHappenedNext", label: "What Happened Next", icon: "fas fa-arrow-right" },
  { key: "whatThisMeansForYou", label: "What This Means For You", icon: "fas fa-lightbulb" },
];

const CaseStudyForm = ({ selected, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    clientName: "",
    projectType: "",
    industry: "",
    timeline: { start: "", end: "" },
    outcome: "",
    featured: false,
    published: true,
    theProblem: { heading: "", content: "" },
    whatWeBuilt: { heading: "", content: "" },
    howWeDidIt: { heading: "", content: "" },
    theResults: { heading: "", content: "" },
    whatHappenedNext: { heading: "", content: "" },
    whatThisMeansForYou: { heading: "", content: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (selected) {
      setForm({
        ...selected,
        timeline: {
          start: selected.timeline?.start ? new Date(selected.timeline.start).toISOString().split('T')[0] : "",
          end: selected.timeline?.end ? new Date(selected.timeline.end).toISOString().split('T')[0] : "",
        }
      });
    } else {
      setForm({
        title: "",
        slug: "",
        summary: "",
        clientName: "",
        projectType: "",
        industry: "",
        timeline: { start: "", end: "" },
        outcome: "",
        featured: false,
        published: true,
        theProblem: { heading: "", content: "" },
        whatWeBuilt: { heading: "", content: "" },
        howWeDidIt: { heading: "", content: "" },
        theResults: { heading: "", content: "" },
        whatHappenedNext: { heading: "", content: "" },
        whatThisMeansForYou: { heading: "", content: "" },
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else if (name.startsWith("timeline.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        timeline: { ...prev.timeline, [field]: value },
      }));
    } else {
      setForm((prev) => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    if (form.title && !selected) {
      setForm(prev => ({ ...prev, slug: generateSlug(form.title) }));
    }
  }, [form.title, selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: "success", text: "Case study saved successfully!" });
      if (onSave) onSave(form);
      
      // Reset form if it's a new case study
      if (!selected) {
        setForm({
          title: "",
          slug: "",
          summary: "",
          clientName: "",
          projectType: "",
          industry: "",
          timeline: { start: "", end: "" },
          outcome: "",
          featured: false,
          published: true,
          theProblem: { heading: "", content: "" },
          whatWeBuilt: { heading: "", content: "" },
          howWeDidIt: { heading: "", content: "" },
          theResults: { heading: "", content: "" },
          whatHappenedNext: { heading: "", content: "" },
          whatThisMeansForYou: { heading: "", content: "" },
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Error saving case study. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>
          <i className="fas fa-briefcase me-2"></i>
          {selected ? "Edit Case Study" : "Add New Case Study"}
        </h4>
        {selected && (
          <Button variant="outline-secondary" size="sm" onClick={onCancel}>
            <i className="fas fa-times me-1"></i> Cancel
          </Button>
        )}
      </div>

      {message.text && (
        <Alert variant={message.type} className="mb-3">
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Row className="mb-3">
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                required 
                placeholder="Enter case study title"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Slug *</Form.Label>
              <Form.Control 
                name="slug" 
                value={form.slug} 
                onChange={handleChange} 
                required 
                placeholder="url-friendly-name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Summary</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}
            name="summary" 
            value={form.summary} 
            onChange={handleChange} 
            placeholder="Brief summary of the case study"
          />
        </Form.Group>

        {/* Client & Project Info */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Client Name *</Form.Label>
              <Form.Control 
                name="clientName" 
                value={form.clientName} 
                onChange={handleChange} 
                required 
                placeholder="Client company name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Project Type</Form.Label>
              <Form.Select name="projectType" value={form.projectType} onChange={handleChange}>
                <option value="">Select project type</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Custom Software">Custom Software</option>
                <option value="AI/ML Solution">AI/ML Solution</option>
                <option value="API Integration">API Integration</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Industry</Form.Label>
              <Form.Control 
                name="industry" 
                value={form.industry} 
                onChange={handleChange} 
                placeholder="e.g., Healthcare, Fintech"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control 
                type="date" 
                name="timeline.start" 
                value={form.timeline.start} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type="date" 
                name="timeline.end" 
                value={form.timeline.end} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Outcome</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={2}
            name="outcome" 
            value={form.outcome} 
            onChange={handleChange} 
            placeholder="Brief description of the project outcome"
          />
        </Form.Group>

        {/* Settings */}
        <Row className="mb-4">
          <Col>
            <Form.Check
              type="checkbox"
              name="featured"
              label="Featured Case Study"
              checked={form.featured}
              onChange={handleChange}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              name="published"
              label="Published"
              checked={form.published}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Content Sections */}
        <h5 className="mb-3">
          <i className="fas fa-edit me-2"></i>
          Content Sections
        </h5>
        
        <Accordion defaultActiveKey="0" className="mb-4">
          {sectionFields.map(({ key, label, icon }, idx) => (
            <Accordion.Item eventKey={String(idx)} key={key}>
              <Accordion.Header>
                <i className={`${icon} me-2`}></i>
                {label}
              </Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Section Heading</Form.Label>
                  <Form.Control 
                    name={`${key}.heading`} 
                    value={form[key].heading} 
                    onChange={handleChange} 
                    placeholder={`Enter heading for ${label}`}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name={`${key}.content`} 
                    value={form[key].content} 
                    onChange={handleChange} 
                    placeholder="Enter the content for this section (supports HTML/Markdown)"
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Submit Button */}
        <div className="d-grid">
          <Button 
            type="submit" 
            className="btn-primary" 
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                {selected ? "Update Case Study" : "Create Case Study"}
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CaseStudyForm;
