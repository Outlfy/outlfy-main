"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: (
      <>
        E-Commerce <br />
        Suite
      </>
    ),
    link: "/ecommerce",
    content: [
      "Launch Your All-in-One E-Commerce Empire in 45 Days (or We Work for Free)",
      "Stop paying 3+ vendors for apps, inventory, and delivery. We bundle it all—saving you 40% in costs.",
      "What You Get:",
    ],
    features: [
      "✅ AI-Powered Inventory System",
      "✅ Branded E-Commerce App + Website",
      "✅ Delivery Management Suite",
      "✅ 45-Day Deadline Guarantee",
    ],
    btnText: "Start Your E-Commerce Overhaul",
    img: "assets/imgs/home_1.png",
  },
  {
    title: (
      <>
        AI-Powered
        <br />
        Website Developer
      </>
    ),
    link: "/ecommerce/website",
    content: [
      "Launch New Website Pages in 1 Click—Pay 0 for Future Updates.",
      "No more $5,000+ dev bills for simple changes.",
      "What You Get:",
    ],
    features: [
      "✅ Custom Website + AI Admin Panel",
      "✅ Unlimited Pages/Blogs/Forms",
      "✅ Brand Consistency Guarantee",
    ],
    btnText: "Build Your Future-Proof Site",
    img: "assets/imgs/home_2.png",
  },
  {
    title: (
      <>
        AI Workflow <br />
        Automation
      </>
    ),
    link: "/",
    content: [
      "Automate 500+ Hours/Year of Manual Work",
      "HR, finance, ops—we handle the grunt work.",
      "What You Get:",
    ],
    features: [
      "✅ Pre-Built Templates",
      "✅ 24/7 Workflow Monitoring",
      "✅ 500-Hour Savings Guarantee",
    ],
    btnText: "Kill Repetitive Tasks Today",
    img: "assets/imgs/home_3.png",
  },
  {
    title: (
      <>
        Free Tech
        <br />
        Consultancy
      </>
    ),
    link: "/techaudit",
    content: [
      "Free 45-Min Session: Discover How to Cut Tech Costs by 30%+",
      "No pitch. Just a step-by-step plan to optimize your tech stack.",
      "What You Get:",
    ],
    features: [
      "✅ Tech Spend Audit",
      "✅ Custom Growth Roadmap",
      "✅ Limited Spots: Only 5/week",
    ],
    btnText: "Claim Your Free Session",
    img: "assets/imgs/home_4.png",
  },
];

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
                  Built from Experience. Designed for Impact.
                </h3>
                <p>
                  After years of building tech for fast-growing businesses, we’ve developed powerful products that solve real problems. If you’re in this space, there’s a high chance we already have the perfect solution for you.
                  <br />
                  <strong>Book a call — and let’s show you how we can help.</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xx-12">
              <div className="service__list-3" ref={serviceList}>
                {services.map((service, idx) => (
                  <div className="service__item-3 service_animation" key={idx}>
                    <h3>
                      <Link href={service.link} className="service__title-3">
                        {service.title}
                      </Link>
                    </h3>
                    <div className="service__content-3">
                      {service.content.map((txt, i) => (
                        <p key={i}>{txt}</p>
                      ))}
                      <ul>
                        {service.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="service__btn-3">
                      <div className="btn_wrapper">
                        <Link
                          href={service.link}
                          className="wc-btn-black btn-hover btn-item text-center"
                        >
                          <span></span> {service.btnText}
                          <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                    <div
                      className="service__hover-3"
                      style={{
                        backgroundImage: `url(${service.img})`,
                      }}
                    ></div>
                  </div>
                ))}
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
