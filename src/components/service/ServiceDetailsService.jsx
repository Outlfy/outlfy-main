"use client";
import ServiceDetail from "../../../public/assets/imgs/techa_3.png";
import Shape6 from "../../../public/assets/imgs/icon/shape-6.png";
import Image from "next/image";

const ServiceDetailsService = () => {
  return (
    <>
      <section className="service__detail">
        <div className="container g-0 line pb-140">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">                <h2 className="sec-title title-anim">
                  From Cost Chaos to Strategic Clarity — We transform complex data into actionable intelligence within 72 hours.
                </h2>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
              <div className="service__detail-circle">
                <span></span>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9">
              <div className="service__detail-img">
                <Image
                  priority
                  width={960}
                  style={{ height: "auto" }}
                  src={ServiceDetail}
                  alt="Service detail image"
                />
                <Image
                  priority
                  width={51}
                  style={{ height: "auto" }}
                  src={Shape6}
                  alt="Service shape image"
                  className="sd-shape"
                />
              </div>              <div className="service__detail-content">
                <p>
                  Traditional tech audits drown you in generic recommendations. We deliver a visual Profit Blueprint that transforms complex data into actionable intelligence. Within 72 hours, you'll see precisely where resources vanish, how workflows stall growth, and which solutions deliver maximum ROI – all mapped to your unique business goals.
                </p>
                <p>
                  We dissect your entire tech ecosystem – software subscriptions, infrastructure costs, and operational overhead – to build a clear financial map showing exactly where money disappears and why. Every recommendation prioritizes solutions that don't just cut expenses but actively fuel revenue generation and market expansion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailsService;
