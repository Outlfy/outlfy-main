import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import animationWordCome from "@/lib/utils/animationWordCome";

const CaseStudyDetails1 = () => {
  const wordAnim = useRef();
  const wordAnim2 = useRef();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchCaseStudy();
    }
  }, [slug]);

  useEffect(() => {
    if (caseStudy) {
      animationWordCome(wordAnim.current);
      animationWordCome(wordAnim2.current);
    }
  }, [caseStudy]);

  const fetchCaseStudy = async () => {
    try {
      const response = await fetch(`/api/admin/case-studies?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setCaseStudy(data[0]);
        } else {
          setError('Case study not found');
        }
      } else {
        setError('Failed to fetch case study');
      }
    } catch (err) {
      console.error('Error fetching case study:', err);
      setError('Error loading case study');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderContent = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (loading) {
    return (
      <section className="blog__detail">
        <div className="container g-0 line pt-140">
          <div className="row">
            <div className="col-12 text-center">
              <p>Loading case study...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !caseStudy) {
    return (
      <section className="blog__detail">
        <div className="container g-0 line pt-140">
          <div className="row">
            <div className="col-12 text-center">
              <h2>Case Study Not Found</h2>
              <p>{error}</p>
              <Link href="/case-studies" className="btn-primary">
                Back to Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="blog__detail case-study__detail">
        <div className="container g-0 line pt-140">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-8 col-xl-10 offset-xxl-2 offset-xl-1">
              <div className="blog__detail-top">
                <h2
                  className="blog__detail-date animation__word_come"
                  ref={wordAnim}
                >
                  {caseStudy.projectType}, {caseStudy.industry} <span>{formatDate(caseStudy.createdAt)}</span>
                </h2>
                <h3
                  className="blog__detail-title animation__word_come"
                  ref={wordAnim2}
                >
                  {caseStudy.title}
                </h3>
                <div className="blog__detail-metalist">
                  <div className="blog__detail-meta">
                    <div className="case-study__author">
                      {caseStudy.author?.avatar && (
                        <Image
                          priority
                          width={50}
                          height={50}
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          src={caseStudy.author.avatar}
                          alt={caseStudy.author.name || "Author"}
                        />
                      )}
                      <p>
                        Project by <span>{caseStudy.author?.name || "Outlfy Team"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="blog__detail-meta">
                    <p>
                      Client <span>{caseStudy.clientName}</span>
                    </p>
                  </div>
                  <div className="blog__detail-meta">
                    <p>
                      Duration <span>{caseStudy.timeline?.duration || 'N/A'}</span>
                    </p>
                  </div>
                </div>
                
                {/* Case Study Summary */}
                <div className="case-study__summary">
                  <p className="lead">{caseStudy.summary}</p>
                </div>

                {/* Project Info Cards */}
                <div className="case-study__info-grid">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="case-study__info-card">
                        <h4>Project Timeline</h4>
                        <ul>
                          {caseStudy.timeline?.start && (
                            <li><strong>Started:</strong> {formatDate(caseStudy.timeline.start)}</li>
                          )}
                          {caseStudy.timeline?.end && (
                            <li><strong>Completed:</strong> {formatDate(caseStudy.timeline.end)}</li>
                          )}
                          <li><strong>Duration:</strong> {caseStudy.timeline?.duration || 'N/A'}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="case-study__info-card">
                        <h4>Project Details</h4>
                        <ul>
                          <li><strong>Industry:</strong> {caseStudy.industry}</li>
                          <li><strong>Team Size:</strong> {caseStudy.teamSize} members</li>
                          <li><strong>Budget Range:</strong> {caseStudy.budget?.range}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="col-xxl-12">
              <div className="blog__detail-thumb case-study__featured-image">
                <Image
                  priority
                  width={1200}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                  src={caseStudy.featuredImage?.url || '/assets/imgs/case-study/default.jpg'}
                  alt={caseStudy.featuredImage?.alt || caseStudy.title}
                  data-speed="0.5"
                />
              </div>
            </div>

            {/* Case Study Content */}
            <div className="col-xxl-8 col-xl-10 offset-xxl-2 offset-xl-1">
              <div className="blog__detail-content case-study__content">
                
                {/* Technologies Used */}
                {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                  <div className="case-study__technologies">
                    <h3>Technologies Used</h3>
                    <div className="tech-grid">
                      {caseStudy.technologies.map((tech, index) => (
                        <div key={index} className="tech-item">
                          {tech.icon && <i className={tech.icon}></i>}
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* The Problem */}
                {caseStudy.theProblem?.content && (
                  <div className="case-study__section">
                    <h2>{caseStudy.theProblem.heading || "The Challenge"}</h2>
                    <div dangerouslySetInnerHTML={renderContent(caseStudy.theProblem.content)} />
                  </div>
                )}

                {/* What We Built */}
                {caseStudy.whatWeBuilt?.content && (
                  <div className="case-study__section">
                    <h2>{caseStudy.whatWeBuilt.heading || "The Solution"}</h2>
                    <div dangerouslySetInnerHTML={renderContent(caseStudy.whatWeBuilt.content)} />
                  </div>
                )}

                {/* How We Did It */}
                {caseStudy.howWeDidIt?.content && (
                  <div className="case-study__section">
                    <h2>{caseStudy.howWeDidIt.heading || "Our Approach"}</h2>
                    <div dangerouslySetInnerHTML={renderContent(caseStudy.howWeDidIt.content)} />
                  </div>
                )}

                {/* Key Metrics */}
                {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                  <div className="case-study__metrics">
                    <h2>Key Results</h2>
                    <div className="metrics-grid">
                      {caseStudy.metrics.map((metric, index) => (
                        <div key={index} className="metric-item">
                          <div className="metric-value">{metric.value}</div>
                          <div className="metric-label">{metric.label}</div>
                          {metric.description && (
                            <div className="metric-description">{metric.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* The Results */}
                {caseStudy.theResults?.content && (
                  <div className="case-study__section">
                    <h2>{caseStudy.theResults.heading || "The Results"}</h2>
                    <div dangerouslySetInnerHTML={renderContent(caseStudy.theResults.content)} />
                  </div>
                )}

                {/* What Happened Next */}
                {caseStudy.whatHappenedNext?.content && (
                  <div className="case-study__section">
                    <h2>{caseStudy.whatHappenedNext.heading || "What Happened Next"}</h2>
                    <div dangerouslySetInnerHTML={renderContent(caseStudy.whatHappenedNext.content)} />
                  </div>
                )}

                {/* What This Means For You */}
                {caseStudy.whatThisMeansForYou?.content && (
                  <div className="case-study__section">
                    <h2>{caseStudy.whatThisMeansForYou.heading || "What This Means For You"}</h2>
                    <div dangerouslySetInnerHTML={renderContent(caseStudy.whatThisMeansForYou.content)} />
                  </div>
                )}

                {/* Project Links */}
                {(caseStudy.links?.live || caseStudy.links?.demo || caseStudy.links?.github) && (
                  <div className="case-study__links">
                    <h3>Project Links</h3>
                    <div className="project-links">
                      {caseStudy.links.live && (
                        <a href={caseStudy.links.live} target="_blank" rel="noopener noreferrer" className="project-link">
                          <i className="fa-solid fa-globe"></i> Live Website
                        </a>
                      )}
                      {caseStudy.links.demo && (
                        <a href={caseStudy.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                          <i className="fa-solid fa-play"></i> View Demo
                        </a>
                      )}
                      {caseStudy.links.github && (
                        <a href={caseStudy.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                          <i className="fab fa-github"></i> GitHub Repository
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="blog__detail-tags case-study__tags">
                <p className="sub-title-anim">
                  tags: {caseStudy.tags?.map((tag, index) => (
                    <span key={index}>
                      <Link href={`/case-studies/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                        {tag}
                      </Link>
                      {index < caseStudy.tags.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>

              {/* Navigation */}
              <div className="case-study__navigation">
                <Link href="/case-studies" className="btn-back">
                  <i className="fa-solid fa-arrow-left"></i> Back to Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetails1;
