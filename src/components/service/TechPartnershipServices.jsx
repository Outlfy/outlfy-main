"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother } from "@/plugins";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const TechPartnershipServices = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        let animation_services_7 = gsap.utils.toArray(
          ".animation_service_7 .service__item-7"
        );
        gsap.set(animation_services_7, {
          opacity: 0,
          x: -30,
        });

        if (animation_services_7) {
          if (device_width < 1023) {
            animation_services_7.forEach((item, i) => {
              gsap.to(item, {
                scrollTrigger: {
                  trigger: item,
                  start: "top center+=200",
                  markers: false,
                },
                opacity: 1,
                x: -0,
                ease: "power2.out",
                duration: 2,
                stagger: {
                  each: 0.4,
                },
              });
            });
          } else {
            gsap.to(".animation_service_7 .service__item-7", {
              scrollTrigger: {
                trigger: ".animation_service_7",
                start: "top center+=200",
                markers: false,
              },
              opacity: 1,
              x: 0,
              ease: "power2.out",
              duration: 2,
              stagger: {
                each: 0.4,
              },
            });
          }
        }
      });
      return () => tHero.revert();
    }
  }, []);
  
  return (
    <>
      <section className="service__area-7 pt-130">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="service__items-7 animation_service_7">
                <div className="service__item-7">
                  <div>
                    <h3 className="service__title-7">
                      Strategic Tech <span>Audit</span>
                    </h3>
                  </div>
                  <p>
                    Uncover hidden inefficiencies and prioritize high-ROI solutions tailored to your budget and goals.
                  </p>
                  <ul>
                    <li>+ Infrastructure Analysis</li>
                    <li>+ Cost Leak Detection</li>
                    <li>+ ROI Projection</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <div>
                    <h3 className="service__title-7">
                      Data-Driven <span>Roadmap</span>{" "}
                    </h3>
                  </div>
                  <p>
                    Turn business insights into actionable tech priorities—no guesswork, just measurable impact.
                  </p>
                  <ul>
                    <li>+ Process Mapping</li>
                    <li>+ Automation Planning</li>
                    <li>+ Scalability Design</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <div>
                    <h3 className="service__title-7">
                      Custom Ecosystem <span>Build</span>{" "}
                    </h3>
                  </div>
                  <p>
                    Develop tailored software that solves your core problems—not our preset solutions.
                  </p>
                  <ul>
                    <li>+ Agile Development</li>
                    <li>+ System Integration</li>
                    <li>+ Future-Proofing</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <div>
                    <h3 className="service__title-7">
                      Ongoing <span>Optimization</span>{" "}
                    </h3>
                  </div>
                  <p>
                    Continuously refine your tech with performance analytics and proactive upgrades.
                  </p>
                  <ul>
                    <li>+ KPI Tracking</li>
                    <li>+ Quarterly Reviews</li>
                    <li>+ Cost Efficiency</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <div>
                    <h3 className="service__title-7">
                      Team <span>Enablement</span>
                    </h3>
                  </div>
                  <p>
                    Train your staff and embed best practices—no dependency on external developers.
                  </p>
                  <ul>
                    <li>+ Workflow Training</li>
                    <li>+ Documentation</li>
                    <li>+ 24/7 Support</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <div>
                    <h3 className="service__title-7">
                      Growth <span>Partnership</span>{" "}
                    </h3>
                  </div>
                  <p>
                    Quarterly strategy sessions to align tech with your evolving business vision.
                  </p>
                  <ul>
                    <li>+ Scalability Audits</li>
                    <li>+ Innovation Labs</li>
                    <li>+ Market Adaptation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechPartnershipServices;
