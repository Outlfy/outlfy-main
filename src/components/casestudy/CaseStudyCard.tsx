'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/types/case-study';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, className = '' }) => {
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTechIcons = (technologies: typeof caseStudy.technologies) => {
    if (!technologies || technologies.length === 0) return null;
    
    return technologies.slice(0, 4).map((tech, index) => (
      <span key={tech._id || index} className="tech-icon" title={tech.name}>
        {tech.icon && <i className={tech.icon}></i>}
        {!tech.icon && <span className="tech-name">{tech.name.charAt(0)}</span>}
      </span>
    ));
  };

  return (
    <div className={`blog__item ${className}`}>
      <div className="blog__img-wrapper">
        <div className="img-box">
          <Image
            priority
            width={370}
            height={270}
            className="image-box__item"
            src={caseStudy.featuredImage?.url || '/assets/imgs/blog/1.jpg'}
            alt={caseStudy.featuredImage?.alt || caseStudy.title}
          />
          <Link href={`/case-studies/${caseStudy.slug}`} className="blog__link">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
      <div className="blog__content">
        <div className="blog__meta">
          <span className="blog__date">
            {formatDate(caseStudy.publishedAt || caseStudy.createdAt)}
          </span>
          {caseStudy.industry && (
            <span className="blog__category">{caseStudy.industry}</span>
          )}
          {caseStudy.featured && (
            <span className="blog__featured">Featured</span>
          )}
        </div>
        <h4 className="blog__title">
          <Link href={`/case-studies/${caseStudy.slug}`}>
            {caseStudy.title}
          </Link>
        </h4>
        <p className="blog__text">
          {caseStudy.excerpt || caseStudy.summary}
        </p>
        <div className="blog__bottom">
          <div className="blog__author">
            <div className="avatar">
              <Image
                width={50}
                height={50}
                src={caseStudy.author?.avatar || '/assets/imgs/team/avatar.jpg'}
                alt={caseStudy.author?.name || 'Author'}
              />
            </div>
            <div className="author-info">
              <h5 className="blog__author-title">{caseStudy.author?.name || 'Outlfy Team'}</h5>
              <span className="blog__author-designation">{caseStudy.clientName}</span>
            </div>
          </div>
          {caseStudy.technologies && caseStudy.technologies.length > 0 && (
            <div className="blog__tech-stack">
              {getTechIcons(caseStudy.technologies)}
              {caseStudy.technologies.length > 4 && (
                <span className="tech-more">+{caseStudy.technologies.length - 4}</span>
              )}
            </div>
          )}
        </div>
        <div className="blog__tags">
          {caseStudy.tags?.slice(0, 3).map((tag, index) => (
            <Link key={index} href={`/case-studies?tag=${encodeURIComponent(tag)}`} className="blog__tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
