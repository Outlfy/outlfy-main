import React, { useRef, useEffect, useState } from 'react';

interface TestimonialCardProps {
  testimonial?: {
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
  };
  showVideo?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial,
  showVideo = false 
}) => {
  const featuredContentRef = useRef<HTMLDivElement>(null);
  const regularContentRef = useRef<HTMLDivElement>(null);
  const [featuredScrollable, setFeaturedScrollable] = useState(false);
  const [regularScrollable, setRegularScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = (ref: React.RefObject<HTMLDivElement | null>, setScrollable: (scrollable: boolean) => void) => {
      if (ref.current) {
        const isScrollable = ref.current.scrollHeight > ref.current.clientHeight;
        setScrollable(isScrollable);
      }
    };

    // Check both content areas
    checkScrollable(featuredContentRef, setFeaturedScrollable);
    checkScrollable(regularContentRef, setRegularScrollable);

    // Re-check on window resize
    const handleResize = () => {
      checkScrollable(featuredContentRef, setFeaturedScrollable);
      checkScrollable(regularContentRef, setRegularScrollable);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [testimonial]);
  // Default testimonial for when no data is provided
  const defaultTestimonial = {
    _id: 'default',
    name: 'Sarah Johnson',
    position: 'Marketing Director',
    company: 'TechCorp Solutions',
    testimonial: '<p>Working with <strong>Outlfy</strong> has been a game-changer for our business. Their expertise in digital transformation helped us <em>increase our online presence by 300%</em> and streamline our operations significantly.</p>',
    profilePicture: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE4IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA4MEMyMCA2Ni43NDUyIDMwLjc0NTIgNTYgNDQgNTZIMTAwVjEwMEgyMFY4MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjM3Mzg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2dvPC90ZXh0Pgo8L3N2Zz4=',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    companySiteUrl: 'https://techcorp.com',
    videoUrl: 'https://youtube.com/embed/dQw4w9WgXcQ',
    projectType: 'web-development',
    status: 'approved',
    featured: false,
    displayOrder: 1,
    createdAt: new Date().toISOString()
  };

  const data = testimonial || defaultTestimonial;

  // FEATURED CARD - DARK MATTE
  if (data.featured) {
    return (
      <div className="testimonial-card testimonial-card--featured">
        
          {/* Video if exists */}
          {data.videoUrl && (
            <div className="testimonial-card__video">
              <iframe
                src={data.videoUrl}
                title="Video Testimonial"
                frameBorder="0"
                allowFullScreen
                className="testimonial-card__video-iframe"
              ></iframe>
            </div>
          )}
        {/* Scrollable Testimonial Content */}
        <div 
          ref={featuredContentRef}
          className="testimonial-card__content"
          data-scrollable={featuredScrollable}
        >
          <div 
            className="testimonial-card__text" 
            dangerouslySetInnerHTML={{ __html: data.testimonial }}
          />
          
        </div>

        {/* Author Info */}
        <div className="testimonial-card__footer">
          <div className="testimonial-card__author">
            <img 
              src={data.profilePicture} 
              alt={data.name} 
              className="testimonial-card__avatar"
            />
            <div className="testimonial-card__info">
              <h4 className="testimonial-card__name">{data.name}</h4>
              <p className="testimonial-card__position">{data.position}</p>
            </div>
          </div>

          {/* Company Logo */}
          <div className="testimonial-card__company">
            <img 
              src={data.companyLogo} 
              alt={data.company} 
              className="testimonial-card__company-logo"
            />
          </div>
        </div>

        {/* Hidden Social Links - Show on Hover */}
        <div className="testimonial-card__social">
          <a 
            href={data.linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="testimonial-card__social-link"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a 
            href={data.companySiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="testimonial-card__social-link"
          >
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>

        <style jsx>{`
          /* Base Card Styles */
          .testimonial-card {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            border-radius: 8px;
            padding: 24px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            transition: all 0.3s ease;
          
          }
          
          .testimonial-card:hover .testimonial-card__social {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          }
          .testimonial-card--featured {
            background: 
              radial-gradient(circle, rgba(41, 47, 51, 1) 0%, rgba(27, 31, 34, 1) 100%), 
              url('/assets/Card.svg') center/cover;
            color: white;
          }

          .testimonial-card:hover .testimonial-card__social {
            opacity: 1;
          }

          /* Content Styles */
          .testimonial-card__content {
            color:white;
            overflow-y: auto;
            margin-bottom: 20px;
            padding-right: 8px;
            position: relative;
            mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          }

          .testimonial-card__content::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 8px;
            height: 40px;
            background: linear-gradient(to bottom, transparent 0%, rgba(31, 41, 51, 0.8) 100%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          /* Show fade when content is scrollable */
          .testimonial-card__content[data-scrollable="true"]::after {
            opacity: 1;
          }

          .testimonial-card__content:hover::after {
            opacity: 1;
          }

          

          .testimonial-card__content[data-scrollable="true"]::before {
            opacity: 1;
          }

          .testimonial-card__content::-webkit-scrollbar {
            width: 4px;
          }

          .testimonial-card__content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }

          .testimonial-card__content::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
          }

          .testimonial-card__text  {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            line-height: 1.6;
            }
            
            .testimonial-card__text :global(p) {
              color: #C6CDD1 !important;
            margin-bottom: 12px;
          }

         

          .testimonial-card__video-iframe {
            width: 100%;
            height: 250px;
            border-radius: 8px;
          }

          /* Footer Styles */
          .testimonial-card__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .testimonial-card__author {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .testimonial-card__avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
          }

          .testimonial-card__name {
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 4px 0;
            color: white;
          }

          .testimonial-card__position {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
          }

          .testimonial-card__company-logo {
            height: 48px;
            width: auto;
            max-width: 80px;
            object-fit: contain;
            filter: brightness(0) invert(1);
            opacity: 0.8;
          }

          /* Social Links */
          .testimonial-card__social {
            position: absolute;
            top: 16px;
            right: 16px;
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .testimonial-card__social-link {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.2s ease;
            font-size: 14px;
          }

          .testimonial-card__social-link:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          @media (max-width: 768px) {
            .testimonial-card {
              width: 100%;
              max-width: 400px;
            }
          }
        `}</style>
      </div>
    );
  }

  // REGULAR CARD - SIMPLE WHITE
  return (
    <div className="testimonial-card testimonial-card--regular">
      
          {/* Video if exists */}
          {data.videoUrl && (
            <div className="testimonial-card__video">
              <iframe
                src={data.videoUrl}
                title="Video Testimonial"
                frameBorder="0"
                allowFullScreen
                className="testimonial-card__video-iframe"
              ></iframe>
            </div>
          )}
      {/* Scrollable Testimonial Content */}
      <div 
        ref={regularContentRef}
        className="testimonial-card__content"
        data-scrollable={regularScrollable}
      >
        <div 
          className="testimonial-card__text" 
          dangerouslySetInnerHTML={{ __html: data.testimonial }}
        />
      </div>

      {/* Author Info */}
      <div className="testimonial-card__footer">
        <div className="testimonial-card__author">
          <img 
            src={data.profilePicture} 
            alt={data.name} 
            className="testimonial-card__avatar"
          />
          <div className="testimonial-card__info">
            <h4 className="testimonial-card__name">{data.name}</h4>
            <p className="testimonial-card__position">{data.position}</p>
          </div>
        </div>

        {/* Company Logo */}
        <div className="testimonial-card__company">
          <img 
            src={data.companyLogo} 
            alt={data.company} 
            className="testimonial-card__company-logo"
          />
        </div>
      </div>

      {/* Hidden Social Links - Show on Hover */}
      <div className="testimonial-card__social">
        <a 
          href={data.linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="testimonial-card__social-link"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a 
          href={data.companySiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="testimonial-card__social-link"
        >
          <i className="fas fa-external-link-alt"></i>
        </a>
      </div>

      <style jsx>{`
        /* Base Card Styles */
        .testimonial-card {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          border-radius: 8px;
          padding: 24px;
          width: auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s ease;
        }

        .testimonial-card--regular {
          background: transparent;
          color: #374151;
          // box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          border: 1.5px solid #e5e7eb;
        }

        .testimonial-card:hover .testimonial-card__social {
          opacity: 1;
        }

        /* Content Styles */
        .testimonial-card__content {
       
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 8px;
          position: relative;
          mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
        }

        .testimonial-card__content::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 8px;
          height: 30px;
          background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.9) 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* Show fade when content is scrollable */
        .testimonial-card__content[data-scrollable="true"]::after {
          opacity: 1;
        }

        .testimonial-card__content:hover::after {
          opacity: 1;
        }

       

        .testimonial-card__content[data-scrollable="true"]::before {
          opacity: 1;
        }

        .testimonial-card__content::-webkit-scrollbar {
          width: 4px;
        }

        .testimonial-card__content::-webkit-scrollbar-track {
          // background: rgba(0, 0, 0, 0.05);
        }

        .testimonial-card__content::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }

        .testimonial-card__text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
        }
          /* Video Styles */
         

          .testimonial-card__video-iframe {
            width: 100%;
            height: 250px;
            border-radius: 8px;
          }

        .testimonial-card__text :global(p) {
          margin-bottom: 12px;
        }

        /* Footer Styles */
        .testimonial-card__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .testimonial-card__author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .testimonial-card__avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .testimonial-card__name {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #1f2937;
        }

        .testimonial-card__position {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .testimonial-card__company-logo {
          height: 48px;
          width: auto;
          max-width: 80px;
          object-fit: contain;
        }

        /* Social Links */
        .testimonial-card__social {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .testimonial-card__social-link {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .testimonial-card__social-link:hover {
          background: #3b82f6;
          color: white;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            width: 100%;
            max-width: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialCard;