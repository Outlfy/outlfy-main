"use client";
import Story1 from "../../../public/assets/imgs/about(3).png";
import Story2 from "../../../public/assets/imgs/about(4).png";
import Story3 from "../../../public/assets/imgs/about(2).png";
import Story4 from "../../../public/assets/imgs/about(1).png";
import Image from "next/image";

const AboutStory = () => {
  return (
    <>
      <section className="story__area">
        <div className="container g-0 line pt-140">
          <span className="line-3"></span>
          <div className="sec-title-wrapper">
            <div className="from-text">
              from <span>2023</span>
            </div>

            <div className="row">
              <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                <h2 className="sec-sub-title title-anim">Tech Growth Partners</h2>
                <h3 className="sec-title title-anim">Our Story</h3>
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                <div className="story__text">
                  <p>
                    From fragmented tools to frictionless growth—this is where it
                    all began. In 2023, we saw founders and businesses stuck in
                    chaos: too many tools, disconnected data, and no real path to
                    scale.
                  </p>
                  <p>
                    Outlfy was born from a simple insight: founders don't need
                    more tools—they need one reliable partner who understands
                    growth. Our journey started in the trenches, freelancing with
                    early-stage startups, working side-by-side with visionary
                    founders, and building what truly moved the needle.
                    From automating operations to building custom dashboards, we
                    became the silent force behind growth. Over time, we evolved
                    into a full-stack team of technologists, strategists, and
                    builders—obsessed with one thing: outcomes.
                  </p>
                  <p>
                    Today, Outlfy replaces noise with clarity. We craft
                    AI-powered systems, stitch scattered processes into seamless
                    journeys, and help businesses scale without the sprawl. With
                    every partnership, we bring sharper execution, cleaner data,
                    and faster decisions. Because tech should unlock growth—not
                    limit it.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
              <div className="story__img-wrapper">
                <Image
                  priority
                  width={300}
                  style={{ height: "auto" }}
                  src={Story1}
                  alt="Story Thumbnail"
                  className="w-100"
                />
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="story__img-wrapper img-anim">
                <Image
                  priority
                  width={520}
                  style={{ height: "auto" }}
                  src={Story2}
                  alt="Story Thumbnail"
                  data-speed="auto"
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="story__img-wrapper">
                <Image
                  priority
                  width={230}
                  style={{ height: "auto" }}
                  src={Story3}
                  alt="Story Thumbnail"
                />
                <Image
                  priority
                  width={410}
                  style={{ height: "auto" }}
                  src={Story4}
                  alt="Story Thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutStory;
