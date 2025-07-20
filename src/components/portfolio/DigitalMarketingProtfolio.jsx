"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Portfilio31 from "../../../public/assets/imgs/portfolio/3/1.jpg";
import Portfilio32 from "../../../public/assets/imgs/portfolio/3/2.jpg";
import Portfilio33 from "../../../public/assets/imgs/portfolio/3/3.jpg";
import Portfilio34 from "../../../public/assets/imgs/portfolio/3/4.jpg";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const slides = [
  {
    title: (
      <>
        Novam <span>Legal</span>
      </>
    ),
    challenge: "Struggling with siloed vendor management and costly, inefficient workflows.",
    solution: "Custom ERP + 3 role-specific portals (admin, vendors, users).",
    result: "$50K/year saved in operational costs, 80% faster cross-team collaboration",
    img: Portfilio32,
    alt: "Novam Legal Case Study",
    cta: "Read how we streamlined their operations"
  },
  {
    title: (
      <>
        MyDay<span>One</span>
      </>
    ),
    challenge: "Paying $10k+ yearly for minor website updates.",
    solution: "AI-powered self-service website builder + admin panel.",
    result: "1-click page launches (70% cheaper than dev fees), 3x faster content updates",
    img: Portfilio31,
    alt: "MyDayOne Case Study",
    cta: "See how we cut their dev costs"
  },
  {
    title: (
      <>
        Soach <span>Global</span>
      </>
    ),
    challenge: "Needed an end-to-end ecosystem (app + portals + website) in record time.",
    solution: "Full-stack development (app + 3 portals + SEO-optimized site).",
    result: "8-week deployment (50% faster than industry avg), 2x user engagement post-launch",
    img: Portfilio33,
    alt: "Soach Global Case Study",
    cta: "Explore their tech transformation"
  },
  {
    title: (
      <>
        CA Cloud<span>Desk</span>
      </>
    ),
    challenge: "Manual lead generation and poor client onboarding.",
    solution: "65+ page user guides + lead magnets (calculators, infographics).",
    result: "40% more qualified leads, 90% faster client onboarding",
    img: Portfilio34,
    alt: "CA Cloud Desk Case Study",
    cta: "See how we drove their growth"
  },
];

const DigitalMarketingProtfolio = () => {
  return (
    <>
      <section className="portfolio__area-3">
        <div className="container pt-100 pb-150">
          <div className="row">
            <div className="col-xxl-12">              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">
                  FEATURED <br />
                  WORK
                </h2>
                
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12 portfolio__slider-3">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                speed={1500}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: ".pp-prev",
                  nextEl: ".pp-next",
                }}
                pagination={{ el: ".swiper-pagination", type: "fraction" }}
              >
                <div className="swiper-wrapper">
                  {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="portfolio__slide-3">
                        <Link href="/service-details">
                          <h3 className="portfolio__title-3" style={{paddingLeft:"50px"}}>{slide.title}</h3>                          <div style={{backgroundColor:"#121212"}}>
                           
                            <p className="text-white" style={{ marginBottom: "20px", fontSize: "16px" }}>
                              {slide.cta} →
                            </p>
                          </div>
                          <Image
                            priority
                            width={550}
                            style={{ height: "auto" }}
                            src={slide.img}
                            alt={slide.alt}
                          />
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>

                <div className="swiper-pagination"></div>

                <div className="swiper-btn">
                  <div style={{ cursor: "pointer" }} className="pp-prev">
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  </div>
                  <div style={{ cursor: "pointer" }} className="pp-next">
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingProtfolio;
