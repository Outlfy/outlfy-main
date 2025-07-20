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
                <p className="cta__sub-title">Ready for Brand-Tailored E-Commerce?</p>
                <h2 className="cta__title title-anim">
                  Stop overpaying for cookie-cutter platforms
                </h2>
                <p className="cta__description mt-5">
                  Get custom-built power with total control. Change any text, image, or price in seconds—no tech skills needed.
                </p>
                <div className="btn_wrapper">
                  <Link
                    href="/contact"
                    className="wc-btn-primary btn-hover btn-item fw-bold"
                  >
                    <span></span>👉 Claim My 10% Discount + Free Demo →
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
