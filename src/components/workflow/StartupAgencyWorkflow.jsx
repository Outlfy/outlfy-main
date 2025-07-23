"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Thumb1 from "../../../public/assets/imgs/1.webp";
import Thumb2 from "../../../public/assets/imgs/2.webp";
import Thumb3 from "../../../public/assets/imgs/3.webp";
import Image from "next/image.js";

gsap.registerPlugin(ScrollTrigger);

const StartupAgencyWorkflow = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        let animation_workflow_6 = gsap.utils.toArray(
          ".animation_workflow_6 .workflow__item-4"
        );
        if (animation_workflow_6) {
          if (device_width < 1023) {
            animation_workflow_6.forEach((item, i) => {
              gsap.from(item, {
                scrollTrigger: {
                  trigger: item,
                  start: "top center+=200",
                  markers: false,
                },
                opacity: 0,
                x: -30,
                ease: "power2.out",
                duration: 2,
                stagger: {
                  each: 0.4,
                },
              });
            });
          } else {
            gsap.from(".animation_workflow_6 .workflow__item-4", {
              scrollTrigger: {
                trigger: ".animation_workflow_6",
                start: "top center+=200",
                markers: false,
              },
              opacity: 0,
              x: -30,
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
      <section className="workflow__area-4">
        <div className="container line_4 pt-100 pb-130">
          <div className="line-col-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="row animation_workflow_6">
            <div className="col-xxl-12">              <div className="title-wrapper-6 text-anim">
                <h2 className="sec-subtile-6">Your Growth, Simplified</h2>
                <h3 className="sec-title-6 title-anim">How we work</h3>
                <p>
                  We create a full blueprint of your business, then find tasks you can automate <br /> 
                  and tools that can save you money.
                </p>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="workflow__item-4">
                <Image
                  priority
                  width={195}
                  style={{ height: "auto" }}
                  src={Thumb1}
                  alt="Work Image"
                />                <h4 className="workflow__title-4">Audit</h4>
                <p>
                  We create a full blueprint of your business, then find tasks you can automate and tools that can save you money.
                </p>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="workflow__item-4">
                <Image
                  priority
                  width={195}
                  style={{ height: "auto" }}
                  src={Thumb2}
                  alt="Work Image"
                />                <h4 className="workflow__title-4">Build</h4>
                <p>
                  We make software that works exactly how your business needs it.
                </p>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="workflow__item-4">
                <Image
                  priority
                  width={195}
                  style={{ height: "auto" }}
                  src={Thumb3}
                  alt="Work Image"
                />                <h4 className="workflow__title-4">Scale</h4>
                <p>
                  Grow faster by adding stores, saving time with automation, and becoming the top player in your space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartupAgencyWorkflow;
