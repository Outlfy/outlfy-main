import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecommerce Solutions | Outlfy',
  description: 'Outlfy provides comprehensive ecommerce solutions to help businesses grow online',
};

import RootLayout from "@/components/common/layout/RootLayout";
import StartupAgencyHero from "@/components/hero/StartupAgencyHero";
import StartupAgencyWorkflow from "@/components/workflow/StartupAgencyWorkflow";
import StartupAgencyFeature from "@/components/feature/StartupAgencyFeature";
import StartupAgencyService from "@/components/service/StartupAgencyService";
import StartupAgencyFaq from "@/components/faq/StartupAgencyFaq";
import StartupAgencyPortfolio from "@/components/portfolio/StartupAgencyPortfolio";
import StartupAgencyTestimonial from "@/components/testimonial/StartupAgencyTestimonial";
import StartupAgencySolution from "@/components/solution/StartupAgencySolution";
import StartupAgencyBlog from "@/components/blog/StartupAgencyBlog";
import StartupAgencyCTA from "@/components/cta/StartupAgencyCTA";
import DigitalMarketingBrand from '@/components/brand/DigitalMarketingBrand';

const StartupAgency = () => {
  return (
    <div>
      <main>
        <RootLayout header="header1" footer="footer1">
          <StartupAgencyHero />
          <StartupAgencyWorkflow />
          <StartupAgencyFeature />
          <StartupAgencyService />
          <StartupAgencyFaq />
          {/* <StartupAgencyPortfolio /> */}
          <DigitalMarketingBrand /> 
          <StartupAgencyTestimonial />
          <StartupAgencySolution />
          <StartupAgencyBlog />
          <StartupAgencyCTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default StartupAgency;
