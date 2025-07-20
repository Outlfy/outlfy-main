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
                  Stop Funding Invisible Tech Waste
                </h2>
                <p className="cta__description mt-5">
                  Let's transform your tech from liability to profit engine. Get your prioritized "Profit Roadmap" delivered in 72 hours that shows exactly where you're losing money and how to turn it into growth.
                </p>
                <div className="btn_wrapper">
                  <Link
                    href="/contact"
                    className="wc-btn-primary btn-hover btn-item fw-bold"
                  >
                    <span></span>Book My Forensic Audit →
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
