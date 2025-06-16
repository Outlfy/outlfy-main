import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const DigitalMarketingService = () => {
  const serviceList = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      imageAnimation(serviceList.current.children);
      let tHero = gsap.context(() => {
        let service__items_3 = gsap.utils.toArray(".service_animation");
        let service__items_heading = gsap.utils.toArray(
          ".service_animation h3"
        );
        let service__items_content = gsap.utils.toArray(
          ".service_animation .service__content-3"
        );

        service__items_3.forEach((service_item, i) => {
          gsap.set([service__items_heading[i], service__items_content[i]], {
            x: -30,
            opacity: 0,
          });

          let service3_timeline = gsap.timeline({
            scrollTrigger: {
              trigger: service_item,
              start: "top center+=200",
              markers: false,
            },
          });

          service3_timeline.to(service__items_heading[i], {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1.5,
            stagger: {
              each: 0.2,
            },
          });
          service3_timeline.to(
            service__items_content[i],
            {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
              stagger: {
                each: 0.2,
              },
            },
            "-=1"
          );
        });
      });
      return () => tHero.revert();
    }
  }, []);

  const imageAnimation = (data) => {
    function followImageCursor(event, serviceImgItem) {
      const contentBox = serviceImgItem.getBoundingClientRect();
      const dx = event.clientX - contentBox.x;
      const dy = event.clientY - contentBox.y;
      serviceImgItem.children[3].style.transform = `translate(${dx}px, ${dy}px)`;
    }

    for (let i = 0; i < data.length; i++) {
      data[i].addEventListener("mousemove", (event) => {
        setInterval(followImageCursor(event, data[i]), 1000);
      });
    }
  };

  return (
    <>
      <section className="service__area-3 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper pt-130 text-anim">
                <h2 className="sec-sub-title title-anim">OUR PRODUCTS</h2>
                <h3 className="sec-title title-anim">
                  STOP WASTING $10,000+ ON BROKEN TECH
                </h3>
                <p>
                  Most businesses overspend on disconnected tools, underused data,
                  and reactive fixes. Here's how we fix it:
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xx-12">
              <div className="service__list-3" ref={serviceList}>
                <div className="service__item-3 service_animation">
                  <h3>
                    <Link href="/service-details" className="service__title-3">
                      E-Commerce <br />
                      Suite
                    </Link>
                  </h3>
                  <div className="service__content-3">
                    <p>
                      GRAND SLAM OFFER:
                      Launch Your All-in-One E-Commerce Empire in 45 Days (or We Work
                      for Free)
                    </p>
                    <p>
                      Stop paying 3+ vendors for apps, inventory, and delivery. We
                      bundle it all—saving you 40% in costs.
                    </p>
                    <ul className="">
                      <li>
                        {" "}
                        + AI-Powered Inventory System (Predict demand, cut waste)
                      </li>
                      <li>
                        {" "}
                        + Branded E-Commerce App + Website (Mobile-optimized)
                      </li>
                      <li>
                        {" "}
                        + Delivery Management Suite (Track drivers in real-time)
                      </li>
                      <li>
                        {" "}
                        + 45-Day Deadline Guarantee (Delayed? 1 month free support)
                      </li>
                    </ul>
                  </div>
                  <div className="service__btn-3">
                    <div className="btn_wrapper">
                      <Link
                        href="/service-details"
                        className="wc-btn-black btn-hover btn-item"
                      >
                        <span></span> Start Your E-Commerce Overhaul
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="service__hover-3"
                    style={{
                      backgroundImage: "url(assets/imgs/service/3/1.jpg)",
                    }}
                  ></div>
                </div>
                <div className="service__item-3 service_animation">
                  <h3>
                    <Link href="/service-details" className="service__title-3 ">
                      Delivery <br />
                      Management System
                    </Link>
                  </h3>
                  <div className="service__content-3">
                    <p>
                      GRAND SLAM OFFER:
                      Slash Delivery Costs by 30% or Get 6 Months Free
                    </p>
                    <p>
                      Inefficient routes? Lost packages? We fix it—or pay you.
                    </p>
                    <ul className="">
                      <li>
                        {" "}
                        + Driver + Manager Apps (Live GPS, route optimization)
                      </li>
                      <li>
                        {" "}
                        + AI-Powered Delivery Analytics (Cut fuel costs by 25%)
                      </li>
                      <li>
                        {" "}
                        + 100% On-Time Delivery Guarantee (Missed? We cover refunds)
                      </li>
                    </ul>
                  </div>
                  <div className="service__btn-3">
                    <div className="btn_wrapper">
                      <Link
                        href="/service-details"
                        className="wc-btn-black btn-hover btn-item"
                      >
                        <span></span> Optimize Your Logistics Now
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="service__hover-3"
                    style={{
                      backgroundImage: "url(assets/imgs/service/3/2.png)",
                    }}
                  ></div>
                </div>
                <div className="service__item-3 service_animation">
                  <h3 className="">
                    <Link href="/service-details" className="service__title-3">
                      AI Email <br />
                      Lead Management
                    </Link>
                  </h3>
                  <div className="service__content-3">
                    <p>
                      GRAND SLAM OFFER:
                      Double Your B2B Leads in 30 Days (Guaranteed)
                    </p>
                    <p>
                      Stop chasing dead leads. Our AI writes, verifies, and
                      auto-follows up.
                    </p>
                    <ul className="">
                      <li>
                        {" "}
                        + AI Email Writer (Human-like outreach at scale)
                      </li>
                      <li>
                        {" "}
                        + Automated Lead Tracker (Score, prioritize, close)
                      </li>
                      <li>
                        {" "}
                        + 30-Day Performance Guarantee (No results? Full refund)
                      </li>
                    </ul>
                  </div>
                  <div className="service__btn-3">
                    <div className="btn_wrapper">
                      <Link
                        href="/service-details"
                        className="wc-btn-black btn-hover btn-item"
                      >
                        <span></span> 2x Your Lead Pipeline
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="service__hover-3"
                    style={{
                      backgroundImage: "url(assets/imgs/service/3/3.png)",
                    }}
                  ></div>
                </div>
                <div className="service__item-3 service_animation">
                  <h3 className="">
                    <Link href="/service-details" className="service__title-3">
                      AI-Powered
                      <br />
                      Website Developer
                    </Link>
                  </h3>
                  <div className="service__content-3">
                    <p>
                      GRAND SLAM OFFER:
                      Your AI-Built Website in 10 Days (Not 10 Weeks)
                    </p>
                    <p>
                      Tired of endless revisions and missed deadlines? Our AI builds
                      your entire site in days.
                    </p>
                    <ul className="">
                      <li>
                        {" "}
                        + AI-Generated Design Options (Choose from 10+ mockups)
                      </li>
                      <li>
                        {" "}
                        + One-Time Revision Promise (You'll love v1, but we'll tweak
                        if needed)
                      </li>
                      <li>
                        {" "}
                        + 100% SEO-Optimized (Built to rank from day one)
                      </li>
                    </ul>
                  </div>
                  <div className="service__btn-3">
                    <div className="btn_wrapper">
                      <Link
                        href="/service-details"
                        className="wc-btn-black btn-hover btn-item"
                      >
                        <span></span> Get Your 10-Day Website
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="service__hover-3"
                    style={{
                      backgroundImage: "url(assets/imgs/service/3/4.png)",
                    }}
                  ></div>
                </div>
                <div className="service__item-3 service_animation">
                  <h3 className="">
                    <Link href="/service-details" className="service__title-3">
                      AI Workflow
                      <br />
                      Automation
                    </Link>
                  </h3>
                  <div className="service__content-3">
                    <p>
                      GRAND SLAM OFFER:
                      Replace 5 Tools with 1 Automation (Save $900/month)
                    </p>
                    <p>
                      Kill the tech stack bloat. Our AI consolidates your tools into
                      seamless workflows.
                    </p>
                    <ul className="">
                      <li>
                        {" "}
                        + Custom Automation Design (Connects all your existing tools)
                      </li>
                      <li>
                        {" "}
                        + Zero-Code Setup (We handle 100% of implementation)
                      </li>
                      <li>
                        {" "}
                        + ROI Guarantee (Minimum 3x return or we refund you)
                      </li>
                    </ul>
                  </div>
                  <div className="service__btn-3">
                    <div className="btn_wrapper">
                      <Link
                        href="/service-details"
                        className="wc-btn-black btn-hover btn-item"
                      >
                        <span></span> Cut Your Tool Costs
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="service__hover-3"
                    style={{
                      backgroundImage: "url(assets/imgs/service/3/5.png)",
                    }}
                  ></div>
                </div>
                <div className="service__item-3 service_animation">
                  <h3 className="">
                    <Link href="/service-details" className="service__title-3">
                      B2B Sales/Marketing
                      <br />
                      Automation
                    </Link>
                  </h3>
                  <div className="service__content-3">
                    <p>
                      GRAND SLAM OFFER:
                      6 Months of Qualified Leads (Just $3,997/mo)
                    </p>
                    <p>
                      Stop paying 5-figure retainers to agencies that deliver late and
                      under-perform.
                    </p>
                    <ul className="">
                      <li>
                        {" "}
                        + AI-Verified Lead Lists (100% accurate contact info)
                      </li>
                      <li>
                        {" "}
                        + Done-For-You Campaign Sequences (From cold to sold)
                      </li>
                      <li>
                        {" "}
                        + 100 Qualified Leads Guarantee (Per month, minimum)
                      </li>
                    </ul>
                  </div>
                  <div className="service__btn-3">
                    <div className="btn_wrapper">
                      <Link
                        href="/service-details"
                        className="wc-btn-black btn-hover btn-item"
                      >
                        <span></span> Fill Your Sales Pipeline
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="service__hover-3"
                    style={{
                      backgroundImage: "url(assets/imgs/service/3/6.png)",
                    }}
                  ></div>
                </div>
                <div className="service__item-3 service_animation">
                  <h3 className="">
                    <Link href="/service-details" className="service__title-3">
                      Free Tech
                      <br />
                      Consultancy
                    </Link>
                  </h3>
                  <div className="service__content-3">
                    <p>
                      GRAND SLAM OFFER:
                      30-Min Expert Tech Audit (100% Free, No Strings)
                    </p>
                    <p>
                      Get an actionable plan to fix your tech problems—whether you hire
                      us or not.
                    </p>
                    <ul className="">
                      <li>
                        {" "}
                        + System Architecture Review (Identify costly inefficiencies)
                      </li>
                      <li>
                        {" "}
                        + Implementation Roadmap (What to fix first, second, third)
                      </li>
                      <li>
                        {" "}
                        + ROI Calculator (See exactly what you'll save)
                      </li>
                    </ul>
                  </div>
                  <div className="service__btn-3">
                    <div className="btn_wrapper">
                      <Link
                        href="/service-details"
                        className="wc-btn-black btn-hover btn-item"
                      >
                        <span></span> Claim Your Free Audit
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="service__hover-3"
                    style={{
                      backgroundImage: "url(assets/imgs/service/3/7.png)",
                    }}
                  ></div>
                </div>

                <div className="service3__img-wrap">
                  <div className="service3__img"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingService;
