import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Outlfy | Technology Strategy and Custom Software',
  description: 'Learn about Outlfy, our mission, vision, and how we help businesses succeed with technology',
};

import DigitalAgencyBrand from "@/components/brand/DigitalAgencyBrand";
import RootLayout from "@/components/common/layout/RootLayout";
import AboutCounter from "@/components/counter/AboutCounter";
import AboutCTA from "@/components/cta/AboutCTA";
import AboutHero from "@/components/hero/AboutHero";
import AboutStory from "@/components/story/AboutStory";
import AboutTeam from "@/components/team/AboutTeam";
import AboutTestimonial from "@/components/testimonial/AboutTestimonial";


const About = () => {
  return (
    <div>
    
      <main>
      <RootLayout header="header1" footer="footer1">
          <AboutHero />
          <AboutStory />
          <AboutCounter />
          {/* <AboutTeam /> */}
          <DigitalAgencyBrand />
          <AboutTestimonial />
          <AboutCTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default About;
