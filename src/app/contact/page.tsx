import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Outlfy | Get in Touch',
  description: 'Contact Outlfy for custom software development, technology strategy, and digital solutions',
};

import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import Contact1 from "@/components/contact/Contact1";

const Contact = () => {
  return (
    <>
      <main>
      <RootLayout header="header1" footer="footer1">
          <Contact1 />
        </RootLayout>
      </main>
    </>
  );
};

export default Contact;
