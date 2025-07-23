import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";
import Image from "next/image";
import animationCharCome from "@/lib/utils/animationCharCome";

gsap.registerPlugin(ScrollTrigger);

const CaseStudy1 = () => {
  const charAnim = useRef();
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch case studies from API
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch('/api/admin/case-studies');
        if (response.ok) {
          const data = await response.json();
          setCaseStudies(data.filter(study => study.published));
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  useEffect(() => {
    animationCharCome(charAnim.current);
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".case-study__animation .case-study__item", { x: 50, opacity: 0 });

        if (device_width < 1023) {
          const caseStudyList = gsap.utils.toArray(".case-study__animation .case-study__item");
          caseStudyList.forEach((item, i) => {
            let caseStudyTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            caseStudyTl.to(item, {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".case-study__animation .case-study__item", {
            scrollTrigger: {
              trigger: ".case-study__animation .case-study__item",
              start: "top center+=300",
              markers: false,
            },
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 2,
            stagger: {
              each: 0.3,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, [caseStudies]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="case-study__area-6 case-study__animation">
        <div className="container g-0 line pt-110 pb-110">
          <span className="line-3"></span>
          <div className="row pb-130">
            <div className="col-12">
              <div className="text-center">
                <p>Loading case studies...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="blog__area-6 case-study__animation">
        <div className="container g-0 line pt-110 pb-110">
          <span className="line-3"></span>
          <div className="row pb-130">
            <div className="col-xxl-8 col-xl-7 col-lg-6 col-md-6">
              <div className="sec-title-wrapper">
                <h2 className="sec-title-2 animation__char_come" ref={charAnim}>
                  Our Case <br />
                  Studies
                </h2>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-6">
              <div className="blog__text">
                <p>
                  Explore our successful projects and discover how we transform
                  ideas into powerful digital solutions that drive real business growth.
                </p>
              </div>
            </div>
          </div>

          <div className="row reset-grid">
            {caseStudies.length > 0 ? (
              caseStudies.map((caseStudy, index) => (
                <div key={caseStudy._id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                  <article className="blog__item case-study__item">
                    <div className="blog__img-wrapper">
                      <Link href={`/case-studies/${caseStudy.slug}`}>
                        <div className="img-box">
                          <Image
                            priority={index < 3}
                            width={400}
                            height={280}
                            style={{ width: "100%", height: "280px", objectFit: "cover" }}
                            className="image-box__item"
                            src={caseStudy.featuredImage?.url || '/assets/imgs/case-study/default.jpg'}
                            alt={caseStudy.featuredImage?.alt || caseStudy.title}
                          />
                          <Image
                            priority={index < 3}
                            width={400}
                            height={280}
                            style={{ width: "100%", height: "280px", objectFit: "cover" }}
                            className="image-box__item"
                            src={caseStudy.featuredImage?.url || '/assets/imgs/case-study/default.jpg'}
                            alt={caseStudy.featuredImage?.alt || caseStudy.title}
                          />
                        </div>
                      </Link>
                    </div>
                    <h4 className="blog__meta">
                      <Link href={`/case-studies/category/${caseStudy.projectType?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {caseStudy.projectType || 'Project'}
                      </Link> . {formatDate(caseStudy.createdAt)}
                    </h4>
                    <h5>
                      <Link href={`/case-studies/${caseStudy.slug}`} className="blog__title">
                        {caseStudy.title}
                      </Link>
                    </h5>
                    <p className="case-study__excerpt">
                      {caseStudy.excerpt || caseStudy.summary}
                    </p>
                    <div className="case-study__meta">
                      <span className="case-study__client">
                        <strong>Client:</strong> {caseStudy.clientName}
                      </span>
                      {caseStudy.timeline?.duration && (
                        <span className="case-study__duration">
                          <strong>Duration:</strong> {caseStudy.timeline.duration}
                        </span>
                      )}
                    </div>
                    <Link href={`/case-studies/${caseStudy.slug}`} className="blog__btn">
                      View Case Study{" "}
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </article>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center">
                  <p>No case studies found.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudy1;
