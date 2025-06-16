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

const DigitalMarketingProtfolio = () => {
  return (
    <>
      <section className="portfolio__area-3">
        <div className="container pt-100 pb-150">
          <div className="row">
            <div className="col-xxl-12">              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">
                  CASE STUDIES <br />
                  THAT DELIVER
                </h2>
                <h3 className="sec-title title-anim">
                  REAL RESULTS, <br />
                  NOT EMPTY PROMISES
                </h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12 portfolio__slider-3">              <Swiper
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
              >                <div className="swiper-wrapper">
                  <SwiperSlide>
                    <div className="portfolio__slide-3">
                      <Link href="/service-details">
                        <h3 className="portfolio__title-3">
                          Farm Fresh <span>E-Commerce Suite</span>
                        </h3>
                        <div>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>CHALLENGE:</strong> Offline grocery chain losing 32% of business to delivery apps
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>SOLUTION:</strong> Built custom e-commerce platform with AI inventory and delivery
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>RESULT:</strong> +206% online sales in 90 days, delivery costs cut by 28%
                        </p>
                        </div>
                        <Image
                          priority
                          width={550}
                          style={{ height: "auto" }}
                          src={Portfilio32}
                          alt="FarmFresh E-Commerce Case Study"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="portfolio__slide-3">
                      <Link href="/service-details">
                        <h3 className="portfolio__title-3">
                          MediTech <span>AI Email Automation</span>
                        </h3>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>CHALLENGE:</strong> Medical supplier with 3% email open rate and zero conversions
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>SOLUTION:</strong> AI-powered email system with personalized product recommendations
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>RESULT:</strong> 42% open rate, $413,000 in attributable sales
                        </p>
                        <Image
                          priority
                          width={550}
                          style={{ height: "auto" }}
                          src={Portfilio31}
                          alt="MediTech AI Email Automation Case Study"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="portfolio__slide-3">
                      <Link href="/service-details">
                        <h3 className="portfolio__title-3">
                          BuildRight <span>Delivery Management</span>
                        </h3>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>CHALLENGE:</strong> Construction supplier losing $30K monthly to delivery errors
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>SOLUTION:</strong> Custom delivery app with real-time GPS and digital signatures
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>RESULT:</strong> 99.8% delivery accuracy, $27,450 monthly savings
                        </p>
                        <Image
                          priority
                          width={550}
                          style={{ height: "auto" }}
                          src={Portfilio33}
                          alt="BuildRight Delivery Management Case Study"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="portfolio__slide-3">
                      <Link href="/service-details">
                        <h3 className="portfolio__title-3">
                          ConsultPro <span>AI Website + CRM</span>
                        </h3>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>CHALLENGE:</strong> Consultant spending $5K/month on disconnected tools
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>SOLUTION:</strong> All-in-one platform with AI lead scoring and follow-up
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                          <strong>RESULT:</strong> Tool costs cut 70%, consultation bookings up 43%
                        </p>
                        <Image
                          priority
                          width={550}
                          style={{ height: "auto" }}
                          src={Portfilio34}
                          alt="ConsultPro AI Website + CRM Case Study"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
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
