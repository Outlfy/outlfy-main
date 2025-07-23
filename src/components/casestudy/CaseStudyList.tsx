'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CaseStudy, CaseStudyFilterOptions } from '@/types/case-study';
import CaseStudyCard from './CaseStudyCard';

interface CaseStudyListProps {
  initialCaseStudies?: CaseStudy[];
  showFilters?: boolean;
  limit?: number;
  featured?: boolean;
  className?: string;
}

const CaseStudyList: React.FC<CaseStudyListProps> = ({
  initialCaseStudies = [],
  showFilters = true,
  limit,
  featured = false,
  className = ''
}) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<CaseStudyFilterOptions>({
    featured,
    published: true,
    limit: limit || 6,
    page: 1,
    sort: 'newest'
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  // Fetch case studies
  const fetchCaseStudies = async (newFilters?: Partial<CaseStudyFilterOptions>) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      const currentFilters = { ...filters, ...newFilters };
      
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/case-studies?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setCaseStudies(data.caseStudies || []);
        
        // Extract unique categories and industries for filters
        const allCategories = data.caseStudies?.flatMap((cs: CaseStudy) => cs.categories || []) || [];
        const allIndustries = data.caseStudies?.map((cs: CaseStudy) => cs.industry).filter((industry: string | undefined): industry is string => Boolean(industry)) || [];
        
        const uniqueCategories = Array.from(new Set(allCategories)) as string[];
        const uniqueIndustries = Array.from(new Set(allIndustries)) as string[];
        
        setCategories(uniqueCategories);
        setIndustries(uniqueIndustries);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCaseStudies.length === 0) {
      fetchCaseStudies();
    }
  }, []);

  const handleFilterChange = (key: keyof CaseStudyFilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    fetchCaseStudies(newFilters);
  };

  const handleLoadMore = () => {
    const newFilters = { ...filters, page: (filters.page || 1) + 1 };
    setFilters(newFilters);
    fetchCaseStudies(newFilters);
  };

  return (
    <section className={`blog__area ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-xxl-8 col-xl-10 col-lg-10">
            <div className="sec-title-wrapper">
              <h2 className="sec-title-2">
                Case Studies
                {featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </h2>
              <p className="sec-text">
                Explore our portfolio of successful projects and discover how we transform ideas into powerful digital solutions.
              </p>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="row">
            <div className="col-xxl-12">
              <div className="blog__filter">
                <div className="filter-wrapper">
                  <div className="filter-item">
                    <label>Sort by:</label>
                    <select 
                      value={filters.sort || 'newest'}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                      className="filter-select"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="featured">Featured</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>

                  <div className="filter-item">
                    <label>Industry:</label>
                    <select 
                      value={filters.industry || ''}
                      onChange={(e) => handleFilterChange('industry', e.target.value || undefined)}
                      className="filter-select"
                    >
                      <option value="">All Industries</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-item">
                    <label>Category:</label>
                    <select 
                      value={filters.category || ''}
                      onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                      className="filter-select"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.featured || false}
                        onChange={(e) => handleFilterChange('featured', e.target.checked ? true : undefined)}
                      />
                      Featured Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {loading ? (
            <div className="col-xxl-12">
              <div className="loading-wrapper">
                <div className="loading-spinner"></div>
                <p>Loading case studies...</p>
              </div>
            </div>
          ) : caseStudies.length > 0 ? (
            caseStudies.map((caseStudy) => (
              <div key={caseStudy._id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <CaseStudyCard caseStudy={caseStudy} />
              </div>
            ))
          ) : (
            <div className="col-xxl-12">
              <div className="no-results">
                <h4>No case studies found</h4>
                <p>Try adjusting your filters or check back later for new case studies.</p>
                <Link href="/case-studies" className="wc-btn-primary btn-hover btn-item">
                  <span></span>
                  View All Case Studies
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          )}
        </div>

        {caseStudies.length > 0 && !limit && (
          <div className="row">
            <div className="col-xxl-12">
              <div className="blog__load-more">
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="wc-btn-primary btn-hover btn-item"
                >
                  <span></span>
                  {loading ? 'Loading...' : 'Load More'}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudyList;
