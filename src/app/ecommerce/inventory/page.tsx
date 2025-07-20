import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecommerce Inventory Management | Outlfy',
  description: 'Outlfy\'s inventory management solutions help ecommerce businesses optimize stock and improve efficiency',
};

import RootLayout from "@/components/common/layout/RootLayout";
import EcommerceInventoryHero from "@/components/hero/EcommerceInventoryHero";
import EcommerceInventoryService from "@/components/service/EcommerceInventoryService";
import EcommerceInventoryBrand from "@/components/brand/EcommerceInventoryBrand";
import EcommerceInventoryCTA from "@/components/cta/EcommerceInventoryCTA";

const Service = () => {
  return (
    <>
    
      <main>
        <RootLayout header="header1" footer="footer1">
          <EcommerceInventoryHero />
          <EcommerceInventoryService />
          <EcommerceInventoryBrand />
          <EcommerceInventoryCTA />
        </RootLayout>
      </main>
    </>
  );
};

export default Service;
