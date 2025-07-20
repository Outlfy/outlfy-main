"use client";
import { useEffect, useRef } from "react";
import ThumbDev1 from "../../../public/assets/imgs/techa_1.png";
import ThumbDev2 from "../../../public/goal.png";
import Image from "next/image";
import animationCharCome from "@/lib/utils/animationCharCome";

const ServiceDetailsDevelopment = () => {
  const charAnim = useRef();
  useEffect(() => {
    animationCharCome(charAnim.current);
  }, []);
  return (
    <>
      <section className="development__area">
        <div className="container g-0 line pt-130 pb-150">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="sec-title-wrapper">
                <h2 className="sec-title animation__char_come" ref={charAnim}>
                  Tech Audit → 
                </h2>
                Uncover Your Hidden $50K+ Savings
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
              <div className="development__wrapper">
                <div className="development__content">
                  <p>
                    Every decision we make answers one question: Where are you
                    losing money—and how do we turn it into growth? We expose cost
                    leaks, security risks, and automation blind spots in your tech
                    stack.
                  </p>
                  <p>
                    Get a prioritized "Profit Roadmap" delivered in 72 hours that
                    transforms complex data into actionable intelligence, showing
                    precisely where resources vanish and which solutions deliver
                    maximum ROI.
                  </p>
                </div>
                <ul>
                  <li>+ Infrastructure Autopsy</li>
                  <li>+ Process X-Ray Analysis</li>
                  <li>+ Data Health Scanning</li>
                  <li>+ Security Stress Testing</li>
                  <li>+ ROI Simulation</li>
                  <li>+ Cost Transparency Architecture</li>
                </ul>
              </div>
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8">
              <div className="development__img">
                <Image
                  priority
                  src={ThumbDev1}
                  width={700}
                  alt="Development Image"
                  // data-speed="auto"
                  style={{ width: "auto", height: "auto !important", objectFit: "contain  !important" }}
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="development__img">
                <Image
                  priority
                  style={{ width: "auto", height: "auto !important", objectFit: "contain !important", }}
                  src={ThumbDev2}
                  alt="Development Image"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailsDevelopment;
