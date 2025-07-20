import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology Partnership | Outlfy',
  description: 'Partner with Outlfy for ongoing technical support, strategy, and software development',
};

import RootLayout from "@/components/common/layout/RootLayout";
import TechPartnershipHero from "@/components/hero/TechPartnershipHero";
import TechPartnershipServices from "@/components/service/TechPartnershipServices";
import TechPartnershipBenefits from "@/components/benefit/TechPartnershipBenefits";
import TechPartnershipWorkflow from "@/components/workflow/TechPartnershipWorkflow";
import IdealPartnerProfile from "@/components/feature/IdealPartnerProfile";
import TechPartnershipCTA from "@/components/cta/TechPartnershipCTA";

const TechPartnership = () => {
  return (
    <div>
      <main>
        <RootLayout header="header1" footer="footer1">
          <TechPartnershipHero />
          <TechPartnershipServices />
          <TechPartnershipBenefits />
          <TechPartnershipWorkflow />
          <IdealPartnerProfile />
          <TechPartnershipCTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default TechPartnership;
