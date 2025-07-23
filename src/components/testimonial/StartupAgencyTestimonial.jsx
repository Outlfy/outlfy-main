"use client";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Testimonial41 from "../../../public/assets/imgs/brand/logo-2.svg";
import Testimonial42 from "../../../public/assets/imgs/brand/logo-5.svg";
import Testimonial43 from "../../../public/assets/imgs/brand/logo-6.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const StartupAgencyTestimonial = () => {
  return (
    <>
      <section className="testimonial__area-4 ">
        <div className="container g-0 line_4">
          <div className="line-col-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="row">
            <div className="col-xxl-12">              <div className="testimonial__sec-title text-anim">
                <h2 className="sec-subtile-6">Testimonials</h2>
                <h3 className="sec-title-6 title-anim">What Our Clients Say</h3>
                <p>
                  Trusted by innovators across retail, food tech, healthcare, and e-commerce industries
                </p>
              </div>
            </div>
            <div className="testimonial__slider-4">
              <Swiper
                modules={[FreeMode, Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                freeMode={true}
                loop={true}
                speed={2000}
                navigation={{
                  prevEl: ".prev-button",
                  nextEl: ".next-button",
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                pagination={{
                  el: ".pagination",
                  type: "fraction",
                }}
                className="swiper testimonial__slider-4"
              >                <div className="swiper-wrapper">
                  <SwiperSlide>
                    <div className="testimonial__slide-4">
                      <Image
                        priority
                        width={85}
                        height={85}
                        className="testimonial__img-4"
                        src={Testimonial41}
                        alt="Testimonial Image"
                      />
                      <div className="testimonial__info-4">
                        <h4 className="testimonial__feedback-4">
                          MyDayOne
                        </h4>
                        <p>
                          Outlfy's self-service website tool saved us $50K/year in dev costs. Launching new pages in 1 click? Game-changer!
                        </p>
                        <h5 className="testimonial__name-4">
                          Shweta Agrawal
                        </h5>
                        <h6 className="testimonial__role-4">
                          Co-Founder & CPO
                        </h6>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="testimonial__slide-4">
                      <Image
                        priority
                        width={85}
                        height={85}
                        className="testimonial__img-4"
                        src={Testimonial42}
                        alt="Testimonial Image"
                      />
                      <div className="testimonial__info-4">
                        <h4 className="testimonial__feedback-4">Daykart</h4>
                        <p>
                          Our delivery delays dropped from 20% to 3% overnight. The AI route optimizer is pure magic!
                        </p>
                        <h5 className="testimonial__name-4">Sumit Mishra</h5>
                        <h6 className="testimonial__role-4">CEO, Grocery Delivery</h6>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="testimonial__slide-4">
                      <Image
                        priority
                        width={85}
                        height={85}
                        className="testimonial__img-4"
                        src={Testimonial43}
                        alt="Testimonial Image"
                      />
                      <div className="testimonial__info-4">
                        <h4 className="testimonial__feedback-4">
                          YouCare Medical
                        </h4>
                        <p>
                          The AI inventory system cut our medical supply waste by 45%. Now we focus on patients, not spreadsheets.
                        </p>
                        <h5 className="testimonial__name-4">Divyansh Kush</h5>
                        <h6 className="testimonial__role-4">
                          Founder, CEO
                        </h6>
                      </div>
                    </div>
                  </SwiperSlide>
                 
                </div>
                <div className="testimonial__btn-4">
                  <div
                    style={{ cursor: "pointer" }}
                    className="next-button swipper-btn"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="prev-button swipper-btn"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                  <div className="pagination testimonial__pagination-4">
                    <div className="pag"></div>
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

export default StartupAgencyTestimonial;
