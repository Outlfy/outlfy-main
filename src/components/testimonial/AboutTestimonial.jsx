"use client";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const AboutTestimonial = () => {
  return (
    <>
      <section className="testimonial__area-2">
        <div className="container g-0 line pb-140">
          <span className="line-3"></span>

          <div className="row g-0">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="testimonial__video">
                <video autoPlay muted loop>
                  <source src="assets/video/testimonial.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
              <div className="testimonial__slider-wrapper-2">
                <div className="testimonial__slider">
                  <Swiper
                    modules={[FreeMode, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    freeMode={true}
                    loop={true}
                    speed={2000}
                    navigation={{
                      nextEl: ".next-button",
                      prevEl: ".prev-button",
                    }}
                  >
                    {/* <SwiperSlide>
                      <div className="testimonial__slide">
                        <div className="testimonial__inner-2">
                          <h2 className="testimonial__title-2">
                            Doubled our B2B leads in 30 days
                          </h2>
                          <p className="testimonial__text-2">
                            Outlfy's AI email system doubled our B2B leads in 30
                            days. Their automation approach is exactly what we
                            needed to scale our sales pipeline efficiently.
                          </p>
                          <h3 className="testimonial__author">Soach Global</h3>
                          <h4 className="testimonial__role">Client</h4>
                        </div>
                      </div>
                    </SwiperSlide> */}

                    <SwiperSlide className="swiper-slide ">
                      <div className="testimonial__slide">
                        <div className="testimonial__inner-2">
                          <h2 className="testimonial__title-2">
                            Saved us $50K in development costs
                          </h2>
                          <p className="testimonial__text-2">
                            Their self-service website tool saved us $50K in dev
                            costs. The 1-click page launching feature transformed
                            how we deploy new content and campaigns.
                          </p>
                          <h3 className="testimonial__author">MyDayOne</h3>
                          <h4 className="testimonial__role">Client</h4>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="testimonial__slide">
                        <div className="testimonial__inner-2">
                          <h2 className="testimonial__title-2">
                            A tech partner that speaks our language
                          </h2>
                          <p className="testimonial__text-2">
                            Finally, a tech partner that speaks our language.
                            Their custom ERP built in 6 weeks delivered exactly
                            what we needed for our legal practice management.
                          </p>
                          <h3 className="testimonial__author">Novam Legal</h3>
                          <h4 className="testimonial__role">Client</h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className="testimonial__pagination">
                  <div style={{ cursor: "pointer" }} className="prev-button">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                  <div style={{ cursor: "pointer" }} className="next-button">
                    <i className="fa-solid fa-arrow-left"></i>
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

export default AboutTestimonial;
