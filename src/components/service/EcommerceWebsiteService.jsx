"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";
import Service11 from "../../../public/assets/imgs/hero/ecom_web_p_1.png";
import Service12 from "../../../public/assets/imgs/hero/ecom_web_p_2.png";
import Service13 from "../../../public/assets/imgs/hero/ecom_web_p_3.png";
import Service14 from "../../../public/assets/imgs/hero/ecom_web_p_4.png";
import Service15 from "../../../public/assets/imgs/hero/ecom_web_p_5.png";
import Service16 from "../../../public/assets/imgs/hero/ecom_web_p_6.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const serviceContent = {
  nav: [
    {
      href: "#service_1",
      label: (
        <>
          Custom Store <br />
          Design
        </>
      ),
    },
    {
      href: "#service_2",
      label: (
        <>
          Admin Control <br />
          Hub
        </>
      ),
    },
    {
      href: "#service_3",
      label: (
        <>
          Product <br />
          Ecosystem
        </>
      ),
    },
    {
      href: "#service_4",
      label: (
        <>
          Customer & <br />
          Loyalty
        </>
      ),
    },
    {
      href: "#service_5",
      label: (
        <>
          Operations <br />
          Command
        </>
      ),
    },
    {
      href: "#service_6",
      label: (
        <>
          Unlimited <br />
          Expansion
        </>
      ),
    },
  ],
  images: [Service11, Service12, Service13, Service14, Service15, Service16],  items: [
    {
      id: "service_1",
      dataSecid: "1",
      image: Service11,
      title: "Tailored Storefront Creation",
      desc: (
        <>
          We build unique e-commerce websites and apps that match your brand identity pixel-perfectly. After launch, edit any element instantly through your admin panel.
        </>
      ),
      features: [
        "+ Brand-Specific Design",
        "+ Mobile-First Development",
        "+ SEO-Optimized Structure",
        "+ Custom UI Components",
        "+ 14-Day Launch Guarantee",
        "+ Unlimited Revisions",
      ],
    },
    {
      id: "service_2",
      dataSecid: "2",
      image: Service12,
      title: "Total Content Sovereignty",
      desc: (
        <>
          Modify every word, image, banner, and price across your entire site in seconds. No technical skills needed—just type and save.
        </>
      ),
      features: [
        "+ Text Editor (Any Element)",
        "+ Image/Banner Swapper",
        "+ Price Update Instantly",
        "+ Layout Presets",
        "+ Real-Time Preview",
        "+ Version History",
      ],
    },
    {
      id: "service_3",
      dataSecid: "3",
      image: Service13,
      title: "Advanced Catalog Mastery",
      desc: (
        <>
          Create unlimited products with complex attributes (colors, sizes, weights) and variations. Manage inventory, brands, and collections effortlessly.
        </>
      ),
      features: [
        "+ Multi-Attribute Products",
        "+ Bulk Import/Export",
        "+ Inventory Alerts",
        "+ Brand Management",
        "+ Category Nesting",
        "+ Stock Sync",
      ],
    },
    {
      id: "service_4",
      dataSecid: "4",
      image: Service14,
      title: "Revenue Boosting Engines",
      desc: (
        <>
          Run wallets, coupons, referral programs, and VIP tiers directly from your dashboard. Turn buyers into brand advocates.
        </>
      ),
      features: [
        "+ Digital Wallet System",
        "+ Coupon Code Generator",
        "+ Referral Point Tracker",
        "+ VIP Reward Tiers",
        "+ Abandoned Cart Saver",
        "+ Loyalty Analytics",
      ],
    },
    {
      id: "service_5",
      dataSecid: "5",
      image: Service15,
      title: "Unified Team Management",
      desc: (
        <>
          Control staff roles, delivery personnel, and customer support workflows from one centralized command center.
        </>
      ),
      features: [
        "+ Role-Based Permissions",
        "+ Delivery Boy GPS",
        "+ Order Assignment",
        "+ Staff Performance",
        "+ Audit Logs",
        "+ Commission Tracking",
      ],
    },
    {
      id: "service_6",
      dataSecid: "6",
      image: Service16,
      title: "Growth Without Limits",
      desc: (
        <>
          Add blogs, landing pages, or product galleries by typing content. No extra costs or developer delays.
        </>
      ),
      features: [
        "+ 1-Click Page Creation",
        "+ Blog/Article Modules",
        "+ Form Builder",
        "+ Case Study Sections",
        "+ FAQ Generators",
        "+ SEO Meta Control",
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
                        </ul>
                        <div className="btn_wrapper">
                          <Link
                            href="/service-details"
                            className="wc-btn-secondary btn-item btn-hover"
                          >
                            <span></span>Get free
                            <br />
                            qoutes <i className="fa-solid fa-arrow-right"></i>
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
