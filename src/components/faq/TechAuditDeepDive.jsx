import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

gsap.registerPlugin(ScrollTrigger);

const TechAuditDeepDive = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        gsap.set(".fade_bottom", { y: 30, opacity: 0 });
        gsap.to(".fade_bottom", {
          scrollTrigger: {
            trigger: ".fade_bottom",
            start: "top center+=300",
          },
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
          stagger: {
            each: 0.2,
          },
        });
      });
      return () => tHero.revert();
    }
  }, []);

  return (
    <>
      <section className="faq__area">
        <div className="container g-0 line pt-130 pb-140">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">Tech Audit Deep Dive</h2>
                <h3 className="sec-title title-anim">Our Forensic Approach to Your Tech Health</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12">
              <div className="faq__list">
                <div className="faq__item fade_bottom">
                  <div className="faq__header">
                    <h4>
                      <span>01</span> Infrastructure Scan
                    </h4>
                  </div>
                  <div className="faq__body">
                    <p>
                      Inventory all software, APIs, and workflows—mapping costs vs. value
                    </p>
                  </div>
                </div>

                <div className="faq__item fade_bottom">
                  <div className="faq__header">
                    <h4>
                      <span>02</span> Process X-Raying
                    </h4>
                  </div>
                  <div className="faq__body">
                    <p>
                      Time-track team activities to identify automation hotspots
                    </p>
                  </div>
                </div>

                <div className="faq__item fade_bottom">
                  <div className="faq__header">
                    <h4>
                      <span>03</span> Data Autopsy
                    </h4>
                  </div>
                  <div className="faq__body">
                    <p>
                      Analyze decision-making pipelines for insight gaps
                    </p>
                  </div>
                </div>

                <div className="faq__item fade_bottom">
                  <div className="faq__header">
                    <h4>
                      <span>04</span> Security & Compliance
                    </h4>
                  </div>
                  <div className="faq__body">
                    <p>
                      Stress-test systems for vulnerabilities and regulatory risks
                    </p>
                  </div>
                </div>

                <div className="faq__item fade_bottom">
                  <div className="faq__header">
                    <h4>
                      <span>05</span> ROI Simulation
                    </h4>
                  </div>
                  <div className="faq__body">
                    <p>
                      Model implementation costs against 1-3 year growth projections
                    </p>
                  </div>
                </div>
              </div>

              <div className="faq__outcome pt-50">
                <div className="sec-title-wrapper">
                  <h3 className="sec-title title-anim">Outcome:</h3>
                  <p className="sec-text title-anim">
                    A prioritized "Tech Prescription" with exact savings, timelines, and impact metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechAuditDeepDive;
