"use client";
import { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import TestimonialHero from "./TestimonialHero";

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  profilePicture: string;
  companyLogo: string;
  linkedinUrl: string;
  companySiteUrl: string;
  videoUrl?: string;
  projectType: string;
  status: string;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
}

interface TestimonialGridProps {
  // Props are optional since we'll fetch data via API
}

const TestimonialGrid: React.FC<TestimonialGridProps> = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/testimonials?featured=true&limit=3&sortBy=displayOrder&sortOrder=asc');
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const result = await response.json();
        
        if (result.success) {
          setTestimonials(result.data);
        } else {
          throw new Error(result.message || 'Failed to load testimonials');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTestimonials();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <>
        <TestimonialHero />
      <div className="container mt-5 mb-5">
        <div className="bento-grid">
          <div className="loading-placeholder">Loading testimonials...</div>
        </div>
      </div>
      </>
    );
  }

  // Hide component if error or no testimonials
  if (error || testimonials.length === 0) {
    return null;
  }

  // Filter for featured testimonials, sort by displayOrder, and take top 3
  const displayTestimonials = testimonials.map((testimonial, index) => ({
    ...testimonial,
    featured: index !== 0 && index !== testimonials.length - 1
  }));

  return (
    <>
    <div style={{marginTop: '-180px'}}>

      <style jsx>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 250px);
          gap: 14px;
        }
        .bento-item {
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .bento-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
    
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        
        .bento-item:hover::before {
          opacity: 1;
        }
        .rowspan-2 {
          grid-row: span 2;
        }
        .loading-placeholder, .error-placeholder {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 16px;
        }
        .error-placeholder {
          color: #e74c3c;
        }
        @media (max-width: 991px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: none;
          }
          .rowspan-2 {
            grid-row: span 1;
          }
        }
      `}</style>
        <TestimonialHero />
      
      <div className="container mt-5 mb-5">
        <div className="bento-grid">
          {displayTestimonials.map((item, idx) => (
            <div
              key={item._id || idx}
              className={`bento-item${item.videoUrl ? " rowspan-2" : ""}`}
            >
              <TestimonialCard testimonial={item} />
            </div>
          ))}
        </div>
      </div>
          </div>
    </>
  );
};

export default TestimonialGrid;