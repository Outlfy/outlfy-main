"use client";
import Link from "next/link";

const DigitalAgencyCTA = () => {
  return (
    <>
      <section className="cta__area">
        <div className="container line pb-110">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-12">              <div className="cta__content">
                <p className="cta__sub-title">Work with us</p>
                <h2 className="cta__title title-anim">
                  Transform Dead Stock Into Working Capital
                </h2>
                <p className="cta__description mt-5">
                  Our AI pinpoints exactly where your inventory bleeds profit – and plugs it. Get your prioritized waste reduction estimate in 72 hours.
                </p>
                <div className="btn_wrapper">
                  <Link
                    href="/contact"
                    className="wc-btn-primary btn-hover btn-item fw-bold"
                  >
                    <span></span>🚀 Get AI Audit →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalAgencyCTA;
