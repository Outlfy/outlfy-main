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
                 Let’s Fix Your Tech—Free Audit or Paid Solution. You Choose.
                </h2>
                <p className="cta__description mt-5">
                 Stop losing time and money to fragmented tools. Whether you need a full tech overhaul or a single AI solution, we’ll craft a plan that fits your budget.
                </p>
                <div className="btn_wrapper">
                  <Link
                    href="/contact"
                    className="wc-btn-primary btn-hover btn-item fw-bold"
                  >
                    <span></span>Book Free 45-Minute Session
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
