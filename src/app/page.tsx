'use client'
import RootLayout from "@/components/common/layout/RootLayout";
import DigitalMarketingHero from "@/components/hero/DigitalMarketingHero";
import DigitalMarketingBrand from "@/components/brand/DigitalMarketingBrand";
import DigitalMarketingAbout from "@/components/about/DigitalMarketingAbout";
import DigitalMarketingService from "@/components/service/DigitalMarketingService";
import DigitalMarketingProtfolio from "@/components/portfolio/DigitalMarketingProtfolio";
import DigitalMarketingTestimonial from "@/components/testimonial/DigitalMarketingTestimonial";
import DigitalMarketingWorkflow from "@/components/workflow/DigitalMarketingWorkflow";
import DigitalMarketingPrice from "@/components/price/DigitalMarketingPrice";
import DigitalMarketingBlog from "@/components/blog/DigitalMarketingBlog";

export default function DigitalMarketing() {
  return (
    <main suppressHydrationWarning>
      <RootLayout header="header1" footer="footer1">
        <DigitalMarketingHero />
        <DigitalMarketingBrand />
        <DigitalMarketingAbout />
        <DigitalMarketingService />
        <DigitalMarketingProtfolio />
        <DigitalMarketingTestimonial />
        <DigitalMarketingWorkflow />
        <DigitalMarketingPrice />
        <DigitalMarketingBlog />
      </RootLayout>
    </main>
  );
}
