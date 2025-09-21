import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outlfy - Tech Partners',
  description: 'Outlfy helps businesses succeed with custom software development and technology strategy',
};

import RootLayout from "@/components/common/layout/RootLayout";
import DigitalMarketingHero from "@/components/hero/DigitalMarketingHero";
import DigitalMarketingBrand from "@/components/brand/DigitalMarketingBrand";
import DigitalMarketingAbout from "@/components/about/DigitalMarketingAbout";
import DigitalMarketingService from "@/components/service/DigitalMarketingService";
import DigitalMarketingWorkflow from "@/components/workflow/DigitalMarketingWorkflow";
import TestimonialGrid from '@/components/testimonials/TestimonialGridHome';

export default function DigitalMarketing() {
  return (
    <main suppressHydrationWarning>
      <RootLayout header="header1" footer="footer1">
        <DigitalMarketingHero />
        <DigitalMarketingBrand />
        <DigitalMarketingAbout />
        <DigitalMarketingService />
        <TestimonialGrid/>
        {/* <DigitalMarketingProtfolio /> */}
        {/* <DigitalMarketingTestimonial /> */}
        <DigitalMarketingWorkflow />
        {/* <DigitalMarketingPrice /> */}
        {/* <DigitalMarketingBlog /> */}
      </RootLayout>
    </main>
  );
}
