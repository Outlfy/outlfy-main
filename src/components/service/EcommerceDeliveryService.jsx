"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";
import Service11 from "../../../public/assets/imgs/hero/delivery_p_1.png";
import Service12 from "../../../public/assets/imgs/hero/delivery_p_2.png";
import Service13 from "../../../public/assets/imgs/hero/delivery_p_3.png";
import Service14 from "../../../public/assets/imgs/hero/delivery_p_4.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const serviceContent = {
  nav: [
    {
      href: "#service_1",
      label: (
        <>
          Delivery Control <br />
          Hub
        </>
      ),
    },
    {
      href: "#service_2",
      label: (
        <>
          Custom KPI <br />
          Tracker
        </>
      ),
    },
    {
      href: "#service_3",
      label: (
        <>
          White-Label <br />
          Branding
        </>
      ),
    },
    {
      href: "#service_4",
      label: (
        <>
          Hyper-Affordable <br />
          Scaling
        </>
      ),
    },
  ],
  images: [Service11, Service12, Service13, Service14],
  items: [
    {
      id: "service_1",
      dataSecid: "1",
      image: Service11,
      title: "Command Every Delivery Like a Pro",
      desc: (
        <>
          Your mission control for orders, drivers, and customer happiness. Track live progress, optimize routes, and handle exceptions in one dashboard.
        </>
      ),
      features: [
        "+ Real-time driver GPS",
        "+ Automated order assignment",
        "+ Customer ETA alerts",
        "+ Proof of delivery (photo/signature)",
        "+ Multi-store management",
        "+ Instant exception alerts",
      ],
    },
    {
      id: "service_2",
      dataSecid: "2",
      image: Service12,
      title: "Measure What Matters – Your Way",
      desc: (
        <>
          Define, track, and crush your delivery KPIs. Monitor turnaround times, driver efficiency, and customer ratings with customizable dashboards.
        </>
      ),
      features: [
        "+ Turnaround time analytics",
        "+ Driver performance scores",
        "+ Customer satisfaction (CSAT) reports",
        "+ On-time delivery %",
        "+ Cost-per-delivery metrics",
        "+ Custom KPI builder",
      ],
    },
    {
      id: "service_3",
      dataSecid: "3",
      image: Service13,
      title: "Deliver Under YOUR Brand – Not Ours",
      desc: (
        <>
          Your logo, colors, and identity on every touchpoint: driver app, customer portal, and manager dashboard. No tech skills needed.
        </>
      ),
      features: [
        "+ Branded driver app",
        "+ Custom customer notifications",
        "+ Themed manager portal",
        "+ Multi-language support",
        "+ 1-click branding kit",
        "+ No coding required",
      ],
    },
    {
      id: "service_4",
      dataSecid: "4",
      image: Service14,
      title: "Grow from 1 to 100 Locations – No Cost Surprises",
      desc: (
        <>
          Pay per delivery, not per feature. All-inclusive pricing with unlimited drivers, stores, and orders.
        </>
      ),
      features: [
        "+ $0 setup fees",
        "+ Pay-per-delivery pricing",
        "+ Unlimited driver accounts",
        "+ Free onboarding",
        "+ 24/7 support included",
        "+ 99.9% uptime SLA",
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
                            <span></span>Get Custom
                            <br />
                            Demo <i className="fa-solid fa-arrow-right"></i>
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
