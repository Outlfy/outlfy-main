'use client';

import React from 'react';
import CaseStudyListing from './CaseStudyListing';

const CaseStudiesPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero__area hero__area-2">
        
      </section>

      {/* Case Studies List */}
      <CaseStudyListing />

      {/* CTA Section */}
      <section className="cta__area">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="cta__content">
                <p className="cta__sub-title">Ready to Start?</p>
                <h2 className="cta__title">
                  Let's Create Your Next
                  <br />
                  Success Story
                </h2>
                <div className="btn_wrapper">
                  <a 
                    href="/contact" 
                    className="wc-btn-primary btn-hover btn-item"
                  >
                    <span></span>
                    Get Started Today
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesPage;
