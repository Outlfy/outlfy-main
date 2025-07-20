"use client";
import { Accordion } from "react-bootstrap";
import ThumbFaq from "../../../public/assets/imgs/techa_4.png";
import Image from "next/image";

const ServiceDetailsFaq = () => {
  return (
    <>
      <section className="faq__area">
        <div className="container g-0 line pb-140">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="faq__img">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={ThumbFaq}
                  alt="FAQ Image"
                  data-speed="auto"
                />
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="faq__content">                <h2 className="faq__title title-anim">
                  Your Tech Prescription for Exponential Growth
                </h2>

                <div className="faq__list">
                  <Accordion
                    defaultActiveKey="0"
                    className="accordion"
                    id="accordionExample"
                  >                    <Accordion.Item eventKey="0" className="accordion-item">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingOne"
                      >
                        What's a Cost-Leak Map?
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        <p>
                          It's like an X-ray for your tech spending. We show you exactly where money vanishes – like unused software subscriptions ($8,400/year) or inefficient processes ($9,800/year) – and give simple instructions to recover it.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="accordion-item">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingTwo"
                      >
                        How does the Automation Priority List help?
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        <p>
                          We identify tasks wasting the most time (e.g., "Your team spends 22 hours/week on manual reports") and rank which automations give the biggest time savings. You'll get a clear "start here" plan to free up staff hours.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="accordion-item">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingThree"
                      >
                        What protection does the Risk Mitigation Plan offer?
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        <p>
                          We find hidden dangers like customer data leaks or compliance gaps before they become lawsuits or fines. You'll receive simple checklists to fix them – no tech jargon, just "do this now" actions.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3" className="accordion-item">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingFour"
                      >
                        Can the ROI Scorecard predict real savings?
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        <p>
                          Yes! We calculate your potential savings in actual dollars over time. Example: "Implementing X will save you $42,000 within 18 months." You see the payback timeline before spending any amount on development.
                        </p>
                      </Accordion.Body>                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailsFaq;
