"use client";
import TestimonialCard from "./TestimonialCard";

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
  testimonials?: Testimonial[];
}

const TestimonialGrid: React.FC<TestimonialGridProps> = ({ testimonials = [] }) => {
  // Fallback data if no testimonials are provided


  // Use database testimonials if available, otherwise fallback to default
  const displayTestimonials = testimonials.length > 0 ? testimonials : [];

  return (
    <>
      <style jsx>{`
        .bento-grid {
        margin-top: 100px;
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
    </>
  );
};

export default TestimonialGrid;