import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "@/plugins";
import Link from "next/link.js";
import About31 from "../../../public/assets/imgs/about/3/1.webp";
import Image from "next/image.js";

gsap.registerPlugin(ScrollSmoother);

const DigitalMarketingAbout = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        ScrollSmoother.create({
          smooth: 1.35,
          effects: device_width < 1025 ? false : true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="about__area-3">
        <div className="container pt-140 pb-110">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="about__img-3">
                <Image
                  priority
                  style={{ width: "90", height: "auto" }}
                  src={About31}
                  alt="About Thumbnail"
                  data-speed="auto"
                  className="smootherReset768"
                />
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">WHO WE ARE</h2>
                <h3 className="sec-title title-anim">
                  WE BUILD TECH THAT SCALES WITH YOU
                </h3>
              </div>
              <div className="sec-text-wrapper">
                <div className="sec-text text-anim">
                  <p>
                    We're <strong>Outlfy</strong>—a tech partner for startups and
                    scaling businesses. We don't just write code; we{" "}
                    <strong>solve growth bottlenecks</strong> with:
                  </p>
                  <div
                    className="feature-list"
                    style={{
                      marginTop: "20px"
                    }}
                  >
                    <div
                      className="feature-item"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        className="feature-icon"
                        style={{
                          marginRight: "15px",
                          fontSize: "24px",
                          color: "var(--primary, #FE4A1B) !",
                        }}
                      >
                        <i className="fa-solid fa-robot"></i>
                      </div>
                      <div className="feature-content">
                        <h4
                          style={{
                            fontSize: "18px",
                            marginBottom: "5px",
                            color: "#e5e7eb",
                          }}
                        >
                          <strong>AI-powered automation</strong>
                        </h4>
                        <p
                          style={{
                            color: "#e5e7eb",
                          }}
                        >
                          <em>(Cut operational costs by 40%)</em>
                        </p>
                      </div>
                    </div>
                    <div
                      className="feature-item"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        className="feature-icon"
                        style={{
                          marginRight: "15px",
                          fontSize: "24px",
                          color: "#e5e7eb",
                        }}
                      >
                        <i className="fa-solid fa-layer-group"></i>
                      </div>
                      <div className="feature-content">
                        <h4
                          style={{
                            fontSize: "18px",
                            color: "#e5e7eb",
                          }}
                        >
                          <strong>All-in-one tech stacks</strong>
                        </h4>
                        <p
                          style={{
                            color: "#e5e7eb",
                          }}
                        >
                          <em>(E-commerce, delivery, CRM—no fragmentation)</em>
                        </p>
                      </div>
                    </div>
                    <div
                      className="feature-item"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        color: "#e5e7eb",
                      }}
                    >
                      <div
                        className="feature-icon"
                        style={{
                          marginRight: "15px",
                          fontSize: "24px",
                          color: "#e5e7eb",
                        }}
                      >
                        <i className="fa-solid fa-chart-line"></i>
                      </div>
                      <div className="feature-content">
                        <h4
                          style={{
                            fontSize: "18px",
                            marginBottom: "5px",
                          }}
                        >
                          <strong>Data-driven decisions</strong>
                        </h4>
                        <p
                          style={{
                            color: "var(--gray-2, #666)",
                          }}
                        >
                          <em>(From dashboards to execution)</em>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="btn_wrapper">
                    <Link
                      className="wc-btn-light btn-hover btn-item"
                      href="/about"
                    >
                      <span></span> Explore How We Work{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingAbout;
