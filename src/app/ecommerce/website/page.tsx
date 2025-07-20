import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecommerce Website Development | Outlfy',
  description: 'Build a high-performing ecommerce website with Outlfy\'s custom development services',
};


import RootLayout from "@/components/common/layout/RootLayout";
import EcommerceWebsiteHero from "@/components/hero/EcommerceWebsiteHero";
import EcommerceWebsiteService from "@/components/service/EcommerceWebsiteService";
import EcommerceWebsiteBrand from "@/components/brand/EcommerceWebsiteBrand";
import EcommerceWebsiteCTA from "@/components/cta/EcommerceWebsiteCTA";

const Service = () => {
  return (
    <>
     
      <main>
        <RootLayout header="header1" footer="footer1">
          <EcommerceWebsiteHero />
          <EcommerceWebsiteService />
          <EcommerceWebsiteBrand />
          <EcommerceWebsiteCTA />
        </RootLayout>
      </main>
    </>
  );
};

export default Service;
