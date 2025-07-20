"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import { FreeMode, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Feature41 from "../../../public/assets/imgs/feature/4/1.png";
import Feature42 from "../../../public/assets/imgs/feature/4/2.png";
import Feature43 from "../../../public/assets/imgs/feature/4/3.png";
import Feature from "../../../public/assets/imgs/hero/ecom_p_1.png";
import Icon1 from "../../../public/assets/imgs/feature/4/icon-1.png";
import Icon2 from "../../../public/assets/imgs/feature/4/icon-2.png";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const StartupAgencyFeature = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".fade_bottom_4", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom_4");
          fadeArray.forEach((item, i) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            fadeTl.to(item, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom_4", {
            scrollTrigger: {
              trigger: ".fade_bottom_4",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="feature__area-6">
        <div className="container line_4">
          <div className="line-col-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="row">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6">
              <div className="feature__content-left">                
                <h2 className="sec-subtile-6">Features</h2>
                <h3 className="sec-title-6 title-anim">
                  We Understand <br /> E-Commerce—and We <br /> Build What It Needs
                </h3>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-6">
              <div className="feature__content-right">                <h4 className="feature__title-6">Systemization</h4>
                <p>
                  We constantly focus on innovating and improving internal operations, so that any business can build <span>systems and processes</span> that are easy to implement and scale using our software tools.
                </p>
                <p>
                  Track inventory, delivery, tasks, and sales from one sleek dashboard. No more juggling 10+ tabs.
                </p>
                <Image
                  priority
                  width={130}
                  height={97}
                  className="feature__img-1"
                  src={Feature41}
                  alt="Icon"
                />
                <Image
                  priority
                  width={99}
                  height={131}
                  className="feature__img-2"
                  src={Feature42}
                  alt="Icon"
                />
                <Image
                  priority
                  width={38}
                  height={38}
                  className="feature__img-3"
                  src={Feature43}
                  alt="Icon"
                />
              </div>
            </div>            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="feature__content">
                <Image
                  priority
                  width={630}
                  style={{ height: "auto" }}
                  src={Feature}
                  alt="Features Image"
                />
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="feature__content-btm">
                <Swiper
                  modules={[FreeMode, Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={2}
                  loop={true}
                  speed={1000}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: ".feature-prev-button",
                    nextEl: ".feature-next-button",
                  }}
                  pagination={{
                    el: ".feature-pagination",
                    clickable: true,
                  }}
                  className="swiper feature__slider"
                >
                  <SwiperSlide>
                    <div className="feature__content-item fade_bottom_4">
                      <Image
                        priority
                        width={50}
                        height={50}
                        src={Icon1}
                        style={{ objectFit: "contain" }}
                        className="p-0 mb-1"
                        alt="Features Image"
                      />
                      <h5>
                        UNIFIED <br /> DASHBOARD
                      </h5>
                      <h6>Command Center for Your Empire</h6>
                      <p>Track inventory, delivery, tasks, and sales from one sleek dashboard. No more juggling 10+ tabs.</p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="feature__content-item fade_bottom_4">
                      <Image
                        priority
                        width={50}
                        height={50}
                        src={Icon2}
                        className="p-0 mb-1"
                        alt="Features Image"
                      />
                      <h5>
                        SELF-SERVICE <br /> UPDATES
                      </h5>
                      <h6>Launch Pages. Change Prices. Add Products. All in 1 Click.</h6>
                      <p>No coders. No fees. Just type, click, and watch your store transform.</p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="feature__content-item fade_bottom_4">
                      <Image
                        priority
                        width={50}
                        height={50}
                        src={Icon1}
                        className="p-0 mb-1"
                        alt="Features Image"
                      />
                      <h5>
                        AI INVENTORY <br /> GURU
                      </h5>
                      <h6>Predict. Automate. Profit.</h6>
                      <p>Our AI analyzes trends, predicts stock needs, and auto-orders supplies—cutting waste by 30%+</p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="feature__content-item fade_bottom_4">
                      <Image
                        priority
                        width={50}
                        height={50}
                        src={Icon2}
                        className="p-0 mb-1"
                        alt="Features Image"
                      />
                      <h5>
                        DELIVERY <br /> HERO
                      </h5>
                      <h6>Real-Time Tracking, Zero Delays</h6>
                      <p>Track drivers, optimize routes, and slash fuel costs with AI-powered logistics.</p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="feature__content-item fade_bottom_4">
                      <Image
                        priority
                        width={50}
                        height={50}
                        src={Icon1}
                        className="p-0 mb-1"
                        alt="Features Image"
                      />
                      <h5>
                        TASK & AUDIT <br /> MASTER
                      </h5>
                      <h6>HR, QC, Payroll—All in One Place</h6>
                      <p>Assign tasks, audit workflows, and approve payments without leaving the dashboard.</p>
                    </div>
                  </SwiperSlide>
                </Swiper>

                <div className="feature__controls mt-4">
                  <div className="feature__btn">
                    <div
                      style={{ cursor: "pointer" }}
                      className="feature-prev-button swipper-btn"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="feature-next-button swipper-btn"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartupAgencyFeature;
