"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Case Studies",
      value: "12",
      icon: "fas fa-briefcase",
      color: "primary",
      change: "+2 this month"
    },
    {
      title: "Form Submissions",
      value: "47",
      icon: "fas fa-envelope",
      color: "success",
      change: "+15 this week"
    },
    {
      title: "Pending Responses",
      value: "8",
      icon: "fas fa-clock",
      color: "warning",
      change: "Needs attention"
    },
    {
      title: "Featured Projects",
      value: "5",
      icon: "fas fa-star",
      color: "info",
      change: "Active showcase"
    }
  ];

  const recentSubmissions = [
    { name: "John Doe", email: "john@example.com", subject: "Project Inquiry", time: "2 hours ago" },
    { name: "Sarah Johnson", email: "sarah@techstartup.com", subject: "Tech Partnership", time: "5 hours ago" },
    { name: "Mike Chen", email: "mike@retailcorp.com", subject: "Free Tech Audit", time: "1 day ago" },
  ];

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <i className="fas fa-tachometer-alt me-3"></i>
          Admin Dashboard
        </h1>
        <div className="text-muted">
          <i className="fas fa-calendar me-1"></i>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col md={6} lg={3} key={index} className="mb-3">
            <div className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <i className={stat.icon}></i>
              </div>
              <h3 className="stat-number">{stat.value}</h3>
              <p className="stat-label">{stat.title}</p>
              <small className="text-muted">{stat.change}</small>
            </div>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Recent Submissions */}
        <Col lg={8} className="mb-4">
          <div className="admin-card">
            <div className="card-header">
              <h5>
                <i className="fas fa-inbox me-2"></i>
                Recent Form Submissions
              </h5>
            </div>
            <div className="list-group list-group-flush">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{submission.name}</div>
                    <small className="text-muted">{submission.email}</small>
                    <div className="mt-1">
                      <span className="badge bg-primary rounded-pill">{submission.subject}</span>
                    </div>
                  </div>
                  <small className="text-muted">{submission.time}</small>
                </div>
              ))}
            </div>
            <div className="card-footer text-center">
              <a href="/admin/responses" className="btn btn-outline-primary btn-sm">
                <i className="fas fa-eye me-1"></i>
                View All Responses
              </a>
            </div>
          </div>
        </Col>

        {/* Quick Actions */}
        <Col lg={4} className="mb-4">
          <div className="admin-card">
            <div className="card-header">
              <h5>
                <i className="fas fa-bolt me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="d-grid gap-2">
              <a href="/admin/case-studies" className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>
                Add New Case Study
              </a>
              <a href="/admin/responses" className="btn btn-outline-primary">
                <i className="fas fa-envelope me-2"></i>
                View Responses
              </a>
              <a href="/admin/case-studies" className="btn btn-outline-secondary">
                <i className="fas fa-edit me-2"></i>
                Manage Case Studies
              </a>
            </div>
          </div>

          {/* System Info */}
          <div className="admin-card mt-3">
            <div className="card-header">
              <h5>
                <i className="fas fa-info-circle me-2"></i>
                System Info
              </h5>
            </div>
            <div className="small">
              <div className="d-flex justify-content-between mb-2">
                <span>Version:</span>
                <span className="text-muted">v1.0.0</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Last Backup:</span>
                <span className="text-muted">Today, 3:00 AM</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Database Status:</span>
                <span className="text-success">
                  <i className="fas fa-circle me-1"></i>
                  Connected
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Server Status:</span>
                <span className="text-success">
                  <i className="fas fa-circle me-1"></i>
                  Online
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
