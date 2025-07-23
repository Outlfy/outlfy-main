"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Accordion, Row, Col, Alert, Tab, Tabs, Badge } from "react-bootstrap";
import { authUtils } from "@/lib/authUtils";
import TipTapEditor from "./TipTapEditor";

const sectionFields = [
  { key: "theProblem", label: "The Problem", icon: "fas fa-exclamation-triangle" },
  { key: "whatWeBuilt", label: "What We Built", icon: "fas fa-tools" },
  { key: "howWeDidIt", label: "How We Did It", icon: "fas fa-cogs" },
  { key: "theResults", label: "The Results", icon: "fas fa-chart-bar" },
  { key: "whatHappenedNext", label: "What Happened Next", icon: "fas fa-arrow-right" },
  { key: "whatThisMeansForYou", label: "What This Means For You", icon: "fas fa-lightbulb" },
];

const projectTypes = [
  'Web Development', 'Mobile App', 'E-commerce', 'Custom Software', 
  'AI/ML Solution', 'API Integration', 'UI/UX Design', 'Other'
];

const budgetRanges = [
  '$5K-$10K', '$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K+', 'Custom'
];

const statusOptions = [
  { value: 'draft', label: 'Draft', color: 'secondary' },
  { value: 'review', label: 'Under Review', color: 'warning' },
  { value: 'published', label: 'Published', color: 'success' },
  { value: 'archived', label: 'Archived', color: 'dark' },
];

const technologyCategories = [
  'frontend', 'backend', 'database', 'devops', 'design', 'other'
];

const CaseStudyForm = ({ selected, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    excerpt: "",
    clientName: "",
    clientLogo: "",
    clientWebsite: "",
    projectType: "",
    industry: "",
    timeline: { start: "", end: "", duration: "" },
    budget: { range: "", currency: "USD" },
    teamSize: "",
    outcome: "",
    status: "draft",
    featured: false,
    published: false,
    tags: [],
    categories: [],
    
    // Media
    featuredImage: { type: "image", url: "", alt: "" },
    
    // Technologies
    technologies: [],
    
    // Metrics
    metrics: [],
    
    // Links
    links: { live: "", demo: "", github: "", case_study: "" },
    
    // SEO
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
    },
    
    // Author
    author: { name: "", email: "", avatar: "" },
    
    // Content sections
    theProblem: { heading: "", content: "", excerpt: "", order: 1 },
    whatWeBuilt: { heading: "", content: "", excerpt: "", order: 2 },
    howWeDidIt: { heading: "", content: "", excerpt: "", order: 3 },
    theResults: { heading: "", content: "", excerpt: "", order: 4 },
    whatHappenedNext: { heading: "", content: "", excerpt: "", order: 5 },
    whatThisMeansForYou: { heading: "", content: "", excerpt: "", order: 6 },
    
    // Custom sections
    customSections: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("basic");
  const [newTag, setNewTag] = useState("");
  const [newTechnology, setNewTechnology] = useState({ name: "", category: "frontend", icon: "", url: "" });
  const [newMetric, setNewMetric] = useState({ label: "", value: "", description: "" });
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    if (selected) {
      setForm({
        ...selected,
        timeline: {
          start: selected.timeline?.start ? new Date(selected.timeline.start).toISOString().split('T')[0] : "",
          end: selected.timeline?.end ? new Date(selected.timeline.end).toISOString().split('T')[0] : "",
          duration: selected.timeline?.duration || ""
        },
        tags: selected.tags || [],
        categories: selected.categories || [],
        technologies: selected.technologies || [],
        metrics: selected.metrics || [],
        seo: selected.seo || {
          metaTitle: "",
          metaDescription: "",
          keywords: [],
          ogTitle: "",
          ogDescription: "",
          ogImage: "",
        }
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes(".")) {
      const keys = name.split(".");
      setForm((prev) => {
        const updated = { ...prev };
        let current = updated;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = type === 'checkbox' ? checked : value;
        return updated;
      });
    } else {
      setForm((prev) => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    }
  };

  const handleContentChange = (sectionKey, content) => {
    setForm((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        content: content
      }
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: "danger", text: "Please select a valid image file." });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "danger", text: "Image size should be less than 5MB." });
      return;
    }

    setImageUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setForm(prev => ({
          ...prev,
          featuredImage: {
            ...prev.featuredImage,
            url: base64String,
            type: "base64"
          }
        }));
        setMessage({ type: "success", text: "Image uploaded successfully!" });
        setImageUploading(false);
      };
      reader.onerror = () => {
        setMessage({ type: "danger", text: "Error reading the image file." });
        setImageUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: "danger", text: "Error uploading image." });
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    setForm(prev => ({
      ...prev,
      featuredImage: {
        ...prev.featuredImage,
        url: "",
        type: "image"
      }
    }));
    setMessage({ type: "success", text: "Image removed successfully!" });
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

  // Auto-generate meta title and description
  useEffect(() => {
    if (form.title && !form.seo?.metaTitle) {
      setForm(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          metaTitle: form.title.length > 60 ? form.title.substring(0, 57) + '...' : form.title
        }
      }));
    }
    
    if (form.summary && !form.seo?.metaDescription) {
      setForm(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          metaDescription: form.summary.length > 160 ? form.summary.substring(0, 157) + '...' : form.summary
        }
      }));
    }
  }, [form.title, form.summary, form.seo?.metaTitle, form.seo?.metaDescription]);

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addTechnology = () => {
    if (newTechnology.name.trim()) {
      setForm(prev => ({
        ...prev,
        technologies: [...prev.technologies, { ...newTechnology }]
      }));
      setNewTechnology({ name: "", category: "frontend", icon: "", url: "" });
    }
  };

  const removeTechnology = (index) => {
    setForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addMetric = () => {
    if (newMetric.label.trim() && newMetric.value.trim()) {
      setForm(prev => ({
        ...prev,
        metrics: [...prev.metrics, { ...newMetric }]
      }));
      setNewMetric({ label: "", value: "", description: "" });
    }
  };

  const removeMetric = (index) => {
    setForm(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const url = selected 
        ? `/api/admin/case-studies/${selected._id}` 
        : '/api/admin/case-studies';
      
      const method = selected ? 'PUT' : 'POST';
      
      const response = await authUtils.authenticatedFetch(url, {
        method: method,
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ type: "success", text: `Case study ${selected ? 'updated' : 'created'} successfully!` });
        if (onSave) {
          setTimeout(() => onSave(result), 1500); // Delay to show success message
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save case study');
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      setMessage({ type: "danger", text: error.message || "Error saving case study. Please try again." });
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
        <div className="d-flex gap-2">
          {form.status && (
            <Badge bg={statusOptions.find(s => s.value === form.status)?.color || 'secondary'}>
              {statusOptions.find(s => s.value === form.status)?.label || form.status}
            </Badge>
          )}
          {selected && (
            <Button variant="outline-secondary" size="sm" onClick={onCancel}>
              <i className="fas fa-times me-1"></i> Cancel
            </Button>
          )}
        </div>
      </div>

      {message.text && (
        <Alert variant={message.type} className="mb-3">
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
          {/* Basic Information Tab */}
          <Tab eventKey="basic" title={<><i className="fas fa-info-circle me-1"></i> Basic Info</>}>
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

            <Form.Group className="mb-3">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2}
                name="excerpt" 
                value={form.excerpt} 
                onChange={handleChange} 
                placeholder="Short excerpt for previews (auto-generated from summary if empty)"
              />
              <Form.Text className="text-muted">
                {(form.excerpt || '').length}/300 characters
              </Form.Text>
            </Form.Group>

            {/* Featured Image */}
            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center">
                <i className="fas fa-image me-2"></i>
                Featured Image
              </Form.Label>
              
              {form.featuredImage?.url ? (
                <div className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h6 className="mb-0">Current Image:</h6>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={removeImage}
                    >
                      <i className="fas fa-trash me-1"></i>
                      Remove
                    </Button>
                  </div>
                  <div className="text-center">
                    <img 
                      src={form.featuredImage?.url} 
                      alt={form.featuredImage?.alt || "Featured image"} 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '300px', 
                        objectFit: 'contain',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                  <div className="mt-2">
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Image type: {form.featuredImage?.type === 'base64' ? 'Uploaded (Base64)' : 'URL'}
                    </small>
                  </div>
                </div>
              ) : null}

              <Row>
                <Col md={8}>
                  <div className="mb-3">
                    <label className="form-label">Upload New Image</label>
                    <div className="input-group">
                      <input 
                        type="file" 
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={imageUploading}
                      />
                      <span className="input-group-text">
                        {imageUploading ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-upload"></i>
                        )}
                      </span>
                    </div>
                    <div className="form-text">
                      <i className="fas fa-info-circle me-1"></i>
                      Supported formats: JPG, PNG, GIF, WEBP. Max size: 5MB
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <div className="text-muted mb-2">OR</div>
                    <Button 
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        const url = prompt("Enter image URL:");
                        if (url) {
                          setForm(prev => ({
                            ...prev,
                            featuredImage: {
                              ...prev.featuredImage,
                              url: url,
                              type: "image"
                            }
                          }));
                        }
                      }}
                    >
                      <i className="fas fa-link me-1"></i>
                      Use URL
                    </Button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Alt Text</Form.Label>
                    <Form.Control 
                      name="featuredImage.alt" 
                      value={form.featuredImage?.alt || ''} 
                      onChange={handleChange} 
                      placeholder="Describe the image for accessibility and SEO"
                    />
                    <div className="form-text">
                      <i className="fas fa-universal-access me-1"></i>
                      Good alt text improves accessibility and SEO
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>

            {/* Status and Visibility */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={form.status} onChange={handleChange}>
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <div className="d-flex align-items-center gap-3 mt-4">
                    <Form.Check
                      type="checkbox"
                      name="featured"
                      label="Featured"
                      checked={form.featured}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="published"
                      label="Published"
                      checked={form.published}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {/* Tags */}
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div className="d-flex gap-2 mb-2 flex-wrap">
                {form.tags.map((tag, index) => (
                  <Badge key={index} bg="primary" className="d-flex align-items-center gap-1">
                    {tag}
                    <i 
                      className="fas fa-times cursor-pointer" 
                      onClick={() => removeTag(tag)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </Badge>
                ))}
              </div>
              <div className="d-flex gap-2">
                <Form.Control
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button variant="outline-primary" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
            </Form.Group>
          </Tab>

          {/* Project Details Tab */}
          <Tab eventKey="project" title={<><i className="fas fa-project-diagram me-1"></i> Project Details</>}>
            {/* Client Information */}
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
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Logo URL</Form.Label>
                  <Form.Control 
                    name="clientLogo" 
                    value={form.clientLogo} 
                    onChange={handleChange} 
                    placeholder="Logo URL"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Website</Form.Label>
                  <Form.Control 
                    name="clientWebsite" 
                    value={form.clientWebsite} 
                    onChange={handleChange} 
                    placeholder="https://client.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Project Type</Form.Label>
                  <Form.Select name="projectType" value={form.projectType} onChange={handleChange}>
                    <option value="">Select project type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
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
                  <Form.Label>Team Size</Form.Label>
                  <Form.Control 
                    type="number"
                    name="teamSize" 
                    value={form.teamSize} 
                    onChange={handleChange} 
                    placeholder="Number of team members"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Timeline */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="timeline.start" 
                    value={form.timeline?.start || ''} 
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
                    value={form.timeline?.end || ''} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control 
                    name="timeline.duration" 
                    value={form.timeline?.duration || ''} 
                    onChange={handleChange} 
                    placeholder="e.g., 8 weeks, 3 months"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Budget */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Budget Range</Form.Label>
                  <Form.Select name="budget.range" value={form.budget?.range || ''} onChange={handleChange}>
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Currency</Form.Label>
                  <Form.Select name="budget.currency" value={form.budget?.currency || 'USD'} onChange={handleChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Project Links */}
            <h6 className="mb-3">Project Links</h6>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Live Website</Form.Label>
                  <Form.Control 
                    name="links.live" 
                    value={form.links?.live || ''} 
                    onChange={handleChange} 
                    placeholder="https://live-site.com"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Demo URL</Form.Label>
                  <Form.Control 
                    name="links.demo" 
                    value={form.links?.demo || ''} 
                    onChange={handleChange} 
                    placeholder="https://demo.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>GitHub Repository</Form.Label>
                  <Form.Control 
                    name="links.github" 
                    value={form.links?.github || ''} 
                    onChange={handleChange} 
                    placeholder="https://github.com/..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Detailed Case Study</Form.Label>
                  <Form.Control 
                    name="links.case_study" 
                    value={form.links?.case_study || ''} 
                    onChange={handleChange} 
                    placeholder="https://detailed-case-study.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Outcome Summary</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                name="outcome" 
                value={form.outcome} 
                onChange={handleChange} 
                placeholder="Brief description of the project outcome"
              />
            </Form.Group>
          </Tab>

          {/* Content Sections Tab */}
          <Tab eventKey="content" title={<><i className="fas fa-edit me-1"></i> Content</>}>
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
                        value={form[key]?.heading || ''} 
                        onChange={handleChange} 
                        placeholder={`Enter heading for ${label}`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Content</Form.Label>
                      <TipTapEditor
                        content={form[key]?.content || ''}
                        onChange={(content) => handleContentChange(key, content)}
                        placeholder={`Enter content for ${label}...`}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Excerpt (Optional)</Form.Label>
                      <Form.Control 
                        as="textarea"
                        rows={2}
                        name={`${key}.excerpt`} 
                        value={form[key]?.excerpt || ''} 
                        onChange={handleChange} 
                        placeholder="Brief excerpt for this section"
                      />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Tab>

          {/* Technologies & Metrics Tab */}
          <Tab eventKey="tech" title={<><i className="fas fa-cogs me-1"></i> Tech & Metrics</>}>
            {/* Technologies */}
            <h6 className="mb-3">Technologies Used</h6>
            <div className="mb-3">
              {form.technologies.map((tech, index) => (
                <Badge key={index} bg="primary" className="me-2 mb-2 d-inline-flex align-items-center gap-1">
                  {tech.icon && <i className={tech.icon}></i>}
                  {tech.name} ({tech.category})
                  <i 
                    className="fas fa-times cursor-pointer" 
                    onClick={() => removeTechnology(index)}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </Badge>
              ))}
            </div>
            
            <Row className="mb-3">
              <Col md={4}>
                <Form.Control
                  value={newTechnology.name}
                  onChange={(e) => setNewTechnology({...newTechnology, name: e.target.value})}
                  placeholder="Technology name"
                />
              </Col>
              <Col md={3}>
                <Form.Select
                  value={newTechnology.category}
                  onChange={(e) => setNewTechnology({...newTechnology, category: e.target.value})}
                >
                  {technologyCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Control
                  value={newTechnology.icon}
                  onChange={(e) => setNewTechnology({...newTechnology, icon: e.target.value})}
                  placeholder="Icon class (optional)"
                />
              </Col>
              <Col md={2}>
                <Button variant="outline-primary" size="sm" onClick={addTechnology}>
                  Add
                </Button>
              </Col>
            </Row>

            {/* Key Metrics */}
            <h6 className="mb-3 mt-4">Key Metrics & Results</h6>
            <div className="mb-3">
              {form.metrics.map((metric, index) => (
                <div key={index} className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{metric.label}:</strong> {metric.value}
                    {metric.description && <><br/><small className="text-muted">{metric.description}</small></>}
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeMetric(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              ))}
            </div>
            
            <Row className="mb-3">
              <Col md={4}>
                <Form.Control
                  value={newMetric.label}
                  onChange={(e) => setNewMetric({...newMetric, label: e.target.value})}
                  placeholder="Metric label"
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  value={newMetric.value}
                  onChange={(e) => setNewMetric({...newMetric, value: e.target.value})}
                  placeholder="Value (e.g., 40%, $50K)"
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  value={newMetric.description}
                  onChange={(e) => setNewMetric({...newMetric, description: e.target.value})}
                  placeholder="Description (optional)"
                />
              </Col>
              <Col md={2}>
                <Button variant="outline-primary" size="sm" onClick={addMetric}>
                  Add
                </Button>
              </Col>
            </Row>
          </Tab>

          {/* SEO & Meta Tab */}
          <Tab eventKey="seo" title={<><i className="fas fa-search me-1"></i> SEO & Meta</>}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control 
                    name="seo.metaTitle" 
                    value={form.seo?.metaTitle || ''} 
                    onChange={handleChange} 
                    placeholder="SEO title (60 chars max)"
                    maxLength={60}
                  />
                  <Form.Text className="text-muted">
                    {(form.seo?.metaTitle || '').length}/60 characters
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Open Graph Title</Form.Label>
                  <Form.Control 
                    name="seo.ogTitle" 
                    value={form.seo?.ogTitle || ''} 
                    onChange={handleChange} 
                    placeholder="Social media title"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                name="seo.metaDescription" 
                value={form.seo?.metaDescription || ''} 
                onChange={handleChange} 
                placeholder="SEO description (160 chars max)"
                maxLength={160}
              />
              <Form.Text className="text-muted">
                {(form.seo?.metaDescription || '').length}/160 characters
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Open Graph Description</Form.Label>
              <Form.Control 
                as="textarea"
                rows={2}
                name="seo.ogDescription" 
                value={form.seo?.ogDescription || ''} 
                onChange={handleChange} 
                placeholder="Social media description"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Open Graph Image</Form.Label>
                  <Form.Control 
                    name="seo.ogImage" 
                    value={form.seo?.ogImage || ''} 
                    onChange={handleChange} 
                    placeholder="https://example.com/og-image.jpg"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Canonical URL</Form.Label>
                  <Form.Control 
                    name="seo.canonicalUrl" 
                    value={form.seo?.canonicalUrl || ''} 
                    onChange={handleChange} 
                    placeholder="https://outlfy.com/case-studies/..."
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Author Information */}
            <h6 className="mb-3 mt-4">Author Information</h6>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control 
                    name="author.name" 
                    value={form.author?.name || ''} 
                    onChange={handleChange} 
                    placeholder="Author name"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Author Email</Form.Label>
                  <Form.Control 
                    type="email"
                    name="author.email" 
                    value={form.author?.email || ''} 
                    onChange={handleChange} 
                    placeholder="author@outlfy.com"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Author Avatar</Form.Label>
                  <Form.Control 
                    name="author.avatar" 
                    value={form.author?.avatar || ''} 
                    onChange={handleChange} 
                    placeholder="Avatar URL"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Tab>
        </Tabs>

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
