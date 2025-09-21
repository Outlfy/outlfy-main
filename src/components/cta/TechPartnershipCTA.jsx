"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TechPartnershipCTA = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        gsap.set(".cta__content", { y: 50, opacity: 0 });
        gsap.to(".cta__content", {
          scrollTrigger: {
            trigger: ".cta__content",
            start: "top center+=200",
          },
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1.5,
        });

        gsap.set(".cta__btn", { scale: 0.8, opacity: 0 });
        gsap.to(".cta__btn", {
          scrollTrigger: {
            trigger: ".cta__btn",
            start: "top center+=300",
          },
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          duration: 1,
          delay: 0.5,
        });
      });
      return () => tHero.revert();
    }
  }, []);

  return (
    <>
      <section className="cta__area">
        <div className="container line pt-140 pb-110">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-12">
              <div className="cta__content w-100">
                <p className="cta__sub-title">Stop Overpaying for Disconnected Tech - that dont gives you returns</p>
                <h2 className="cta__title w-100">
                  Let's build your custom growth ecosystem—start with a free 45-minute audit.
                </h2>
                <div className="btn_wrapper">
                  <Link href="/contact" className="wc-btn-primary btn-hover btn-item cta__btn">
                    <span></span> Claim My Free <br />
                    Tech Audit{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  
                </div>
                <div className="cta__urgency pt-30">
                  <p className="urgency-text">
                    <span className="urgency-badge">⏰</span>
                    Hurry Up! Only 5 slots available this month! Don't miss out.
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

export default TechPartnershipCTA;
