"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminProtected from "./AdminProtected";
import "../styles/_admin.scss";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "fas fa-chart-line",
    },
    {
      name: "Case Studies",
      href: "/admin/case-studies",
      icon: "fas fa-briefcase",
    },
    {
      name: "Form Responses",
      href: "/admin/responses",
      icon: "fas fa-envelope",
    },
  ];

  return (
    <AdminProtected>
      <div className="admin-layout">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className={`col-md-3 col-lg-2 admin-sidebar ${sidebarOpen ? 'show' : ''}`}>
              <div className="admin-logo">
                <h3>Outlfy Admin</h3>
              </div>
              <nav className="admin-nav">
                {navigation.map((item) => (
                  <div key={item.name} className="nav-item">
                    <Link
                      href={item.href}
                      className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <i className={item.icon}></i>
                      {item.name}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="col-md-9 col-lg-10 admin-content">
              {/* Mobile Header */}
              <div className="d-md-none mb-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <i className="fas fa-bars"></i> Menu
                </button>
              </div>

              {/* Content */}
              <div className="fade-in">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminLayout;
