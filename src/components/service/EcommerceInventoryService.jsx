"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";
import Service11 from "../../../public/assets/imgs/hero/inventory_p_1.png";
import Service12 from "../../../public/assets/imgs/hero/inventory_p_2.png";
import Service13 from "../../../public/assets/imgs/hero/inventory_p_3.png";
import Service14 from "../../../public/assets/imgs/hero/inventory_p_4.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const serviceContent = {
  nav: [
    {
      href: "#service_1",
      label: (
        <>
          AI Forecasting <br />
          Engine
        </>
      ),
    },
    {
      href: "#service_2",
      label: (
        <>
          Stock Health <br />
          Dashboard
        </>
      ),
    },
    {
      href: "#service_3",
      label: (
        <>
          Profit <br />
          Maximizer
        </>
      ),
    },
    {
      href: "#service_4",
      label: (
        <>
          Customizable <br />
          Control Hub
        </>
      ),
    },
  ],  images: [Service11, Service12, Service13, Service14],
  items: [
    {
      id: "service_1",
      dataSecid: "1",
      image: Service11,
      title: "See 90 Days Into Your Inventory Future",
      desc: (
        <>
          AI analyzes sales history, seasonality, and trends to predict demand. Stop guessing how much to order.
        </>
      ),
      features: [
        "+ Daily/weekly/monthly sales rates",
        "+ Sale velocity tracking",
        "+ Seasonal pattern strength",
        "+ Sales forecasting",
        "+ Unusual behavior alerts",
        "+ Replenishment thresholds",
      ],
    },
    {
      id: "service_2",
      dataSecid: "2",
      image: Service12,
      title: "Fix Inventory Leaks Before They Cost You",
      desc: (
        <>
          Real-time flags for dead stock, shortages, and slow-movers – with actionable fixes.
        </>
      ),
      features: [
        "+ Dead stock duration flags",
        "+ Days until stockout",
        "+ Slow-mover alerts",
        "+ Safety stock quantities",
        "+ ABC value classification",
        "+ Stockout revenue loss",
      ],
    },
    {
      id: "service_3",
      dataSecid: "3",
      image: Service13,
      title: "Turn Excess Stock Into Cash, Not Waste",
      desc: (
        <>
          Automated recommendations to clear slow-movers and boost margins.
        </>
      ),
      features: [
        "+ Suggested discount levels",
        "+ Profit margin per product",
        "+ Waste cost projections",
        "+ Alert priority scoring",
        "+ Overall profit contribution",
        "+ Customizable rules",
      ],
    },
    {
      id: "service_4",
      dataSecid: "4",
      image: Service14,
      title: "Your Business, Your Rules – Zero Coding",
      desc: (
        <>
          Tailor dashboards, alerts, and reports to your unique workflows.
        </>
      ),
      features: [
        "+ Drag-and-drop builder",
        "+ ERP integration (SAP, Oracle, etc.)",
        "+ Multi-store views",
        "+ White-label reporting",
        "+ Role-based access",
        "+ 1-click exports",
      ],
    },
  ],
};

const Service1 = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        if (device_width > 1200) {
          gsap.to(".service__list-6", {
            scrollTrigger: {
              trigger: ".service__area-6",
              pin: ".service__list-6",
              pinSpacing: true,
              start: "top top",
              end: "bottom bottom",
            },
          });

          gsap.to(".service__image-wrap", {
            scrollTrigger: {
              trigger: ".service__area-6",
              pin: ".mid-content",
              pinSpacing: true,
              start: "top top",
              end: "bottom bottom",
              markers: false,
            },
          });

          let service_images = gsap.utils.toArray(".service__image");
          let service_imagess = gsap.utils.toArray(".service__image img");
          let service_items = gsap.utils.toArray(".service__item-6");

          if (service_items) {
            service_items.forEach((image, i) => {
              let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: image,
                  scrub: 1,
                  start: "top top-=600",
                  markers: false,
                },
              });
              tl.to(service_images[i], {
                zIndex: "1",
              });
              tl.to(
                service_imagess[i],
                {
                  opacity: 0,
                  duration: 1,
                  scale: 1.2,
                  ease: "power4.out",
                },
                "-=1"
              );
            });
          }

          let navItems = gsap.utils.toArray(".service__list-6 li a");
          if (navItems) {
            navItems.forEach((nav) => {
              nav.addEventListener("click", (e) => {
                e.preventDefault();
                const ids = nav.getAttribute("href");
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: ids,
                  ease: "power4.out",
                });
              });
            });
          }
        }
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <section className="service__area-6">
      <div className="container">
        <div className="row inherit-row">
          <div className="col-xxl-12">
            <div className="content-wrapper">
              <div className="left-content">
                <ul className="service__list-6">
                  {serviceContent.nav.map((item, idx) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mid-content">
                {serviceContent.images.map((img, idx) => (
                  <div className="service__image" key={idx}>
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={img}
                      alt="Service Image"
                    />
                  </div>
                ))}
              </div>
              <div className="right-content">
                <div className="service__items-6">
                  {serviceContent.items.map((item) => (
                    <div
                      className={`service__item-6${item.dataSecid === "1" ? " has__service_animation" : ""}`}
                      id={item.id}
                      data-secid={item.dataSecid}
                      key={item.id}
                    >
                      <div className="image-tab">
                        <Image
                          priority
                          style={{ width: "auto", height: "auto" }}
                          src={item.image}
                          alt="Service Image"
                        />
                      </div>
                      <div className="animation__service_page">
                        <h2 className="service__title-6">{item.title}</h2>
                        <p>{item.desc}</p>
                        <ul>
                          {item.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>                        <div className="btn_wrapper">
                          <Link
                            href="/contact"
                            className="wc-btn-secondary btn-item btn-hover"
                          >
                            <span></span>Watch AI
                            <br />
                            Predict <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service1;
