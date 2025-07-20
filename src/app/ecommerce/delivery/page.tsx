import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecommerce Delivery Solutions | Outlfy',
  description: 'Optimize your ecommerce delivery process with Outlfy\'s specialized delivery solutions',
};

import RootLayout from "@/components/common/layout/RootLayout";
import EcommerceDeliveryHero from "@/components/hero/EcommerceDeliveryHero";
import EcommerceDeliveryService from "@/components/service/EcommerceDeliveryService";
import EcommerceDeliveryBrand from "@/components/brand/EcommerceDeliveryBrand";
import EcommerceDeliveryCTA from "@/components/cta/EcommerceDeliveryCTA";

const Service = () => {
  return (
    <>
  
      <main>
        <RootLayout header="header1" footer="footer1">
          <EcommerceDeliveryHero />
          <EcommerceDeliveryService />
          <EcommerceDeliveryBrand />
          <EcommerceDeliveryCTA />
        </RootLayout>
      </main>
    </>
  );
};

export default Service;
