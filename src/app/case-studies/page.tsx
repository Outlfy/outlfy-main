import { Metadata } from 'next';
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: 'Case Studies | Outlfy - Successful Digital Transformation Projects',
  description: 'Explore our successful projects and discover how we transform ideas into powerful digital solutions that drive real business growth.',
};

import RootLayout from "@/components/common/layout/RootLayout";
import CaseStudiesPage from "@/components/casestudy/CaseStudiesPage";

const CaseStudies = () => {
  return (
    <div>
      <main>
        <RootLayout header="header1" footer="footer1">
          <CaseStudiesPage />
        </RootLayout>
      </main>
    </div>
  );
};

export default CaseStudies;
