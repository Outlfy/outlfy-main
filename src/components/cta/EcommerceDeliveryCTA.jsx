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
                <p className="cta__sub-title">Ready to Transform Your Deliveries?</p>
                <h2 className="cta__title title-anim">
                  Launch Your Delivery System in 14 Days – Guaranteed
                </h2>
                <p className="cta__description mt-5">
                  We'll build or replace your existing delivery system in 14 days – or work free. Complete delivery control with your brand, real-time tracking, and pay-per-delivery pricing.
                </p>
                <div className="btn_wrapper">
                  <Link
                    href="/contact"
                    className="wc-btn-primary btn-hover btn-item fw-bold"
                  >
                    <span></span>🚀 Claim 14-Day Guarantee
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
