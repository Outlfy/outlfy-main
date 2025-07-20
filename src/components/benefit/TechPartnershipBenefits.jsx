"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TechPartnershipBenefits = () => {
  const lineRef = useRef(null);

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

        gsap.set(".counter_animation", { y: 100, opacity: 0 });
        gsap.to(".counter_animation", {
          scrollTrigger: {
            trigger: ".counter_animation",
            start: "top center+=200",
          },
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1.5,
          stagger: {
            each: 0.3,
          },
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="cta__area">
        <div className="container g-0 line pt-140 pb-110">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12">
              <div className="cta__content">
                <p className="cta__sub-title">Why 200+ Founders Choose us</p>
                <h2 className="cta__title title-anim mb-5">
                  Partnership Over Projects
                </h2>
                <div className="cta__text">
                  <p className="fade_bottom">
                    "Project agencies build what you ask for. We build what you need."
                  </p>                  <p className="fade_bottom">
                    By embedding with your team, we become guardians of your tech health—eliminating redundant tools, automating manual workflows, and ensuring every dollar spent drives measurable growth. The result? 40% average cost savings and 2x faster scaling for businesses like yours.
                  </p>
                </div>
                
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "-50px" }}>
            <div className="col-xxl-12">
              <div className="counter__wrapper counter_animation">
                <div className="counter__item counter_animation">
                  <h2 className="counter__number">20+</h2>
                  <p>Scaling Partners</p>
                </div>
                <div className="counter__item counter_animation">
                  <h2 className="counter__number">40%</h2>
                  <p>Average Cost Savings</p>
                </div>
                <div className="counter__item counter_animation">
                  <h2 className="counter__number">2x</h2>
                  <p>Faster Scaling</p>
                </div>
                <div className="counter__item counter_animation">
                  <h2 className="counter__number">92%</h2>
                  <p>Client Retention Rate</p>
                </div>
              </div>
            </div>
            <div className="col justify-content-center align-items-center d-flex " style={{ marginTop: "-30px" }}>

              <div className="btn_wrapper pt-30 ">
                  <Link href={'/contact'} className="wc-btn-primary btn-hover btn-item fade_bottom">
                    <span></span> Let's Talk{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
            </div>
          </div>

          
        </div>
      </section>
    </>
  );
};

export default TechPartnershipBenefits;
