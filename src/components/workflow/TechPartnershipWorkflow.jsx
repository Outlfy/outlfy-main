"use client";
import { useEffect } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

gsap.registerPlugin(ScrollTrigger);

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const TechPartnershipWorkflow = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        gsap.set(".fade_left", { x: -20, opacity: 0 });
        gsap.to(".fade_left", {
          scrollTrigger: {
            trigger: ".fade_left",
            start: "top center+=300",
          },
          x: 0,
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
      <section className="workflow__area">
        <div className="container g-0 line pt-140 pb-140">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">How We Work</h2>
                <h3 className="sec-title title-anim">Our Partnership Process</h3>
              </div>
            </div>

            <div className="col-xxl-12 workflow__slider">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={0}
                slidesPerView={1}
                freeMode={true}
                loop={true}
                speed={2000}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="workflow__slide fade_left">
                    <h4 className="workflow__step">01</h4>
                    <h5 className="workflow__name">Deep Business Dive</h5>
                    <p>
                      We study your operations, goals, and pain points—no assumptions, just data.
                    </p>
                    <h6 className="workflow__title fs-6">
                      "Understanding your DNA before writing code."
                    </h6>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="workflow__slide fade_left">
                    <h4 className="workflow__step">02</h4>
                    <h5 className="workflow__name">360° Tech Audit</h5>
                    <p>
                      Analyze systems (or start from scratch) to expose cost leaks and automation goldmines.
                    </p>
                    <h6 className="workflow__title fs-6">
                      "Finding the 20% efforts driving 80% results."
                    </h6>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="workflow__slide fade_left">
                    <h4 className="workflow__step">03</h4>
                    <h5 className="workflow__name">Agile Build Cycle</h5>
                    <p>
                      Develop, test, and deploy solutions in rapid sprints with continuous feedback.
                    </p>
                    <h6 className="workflow__title fs-6">
                      "Working tech in weeks—not months."
                    </h6>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="workflow__slide fade_left">
                    <h4 className="workflow__step">04</h4>
                    <h5 className="workflow__name">Growth Partnership</h5>
                    <p>
                      Monitor, optimize, and scale your tech with quarterly strategy sessions.
                    </p>
                    <h6 className="workflow__title  fs-6">
                      "Your success = Our KPI."
                    </h6>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechPartnershipWorkflow;
