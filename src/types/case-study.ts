// TypeScript interfaces based on MongoDB CaseStudy model

export interface CaseStudySection {
  _id?: string;
  heading: string;
  content: string; // Rich HTML content from TipTap editor
  excerpt?: string; // Short description for previews
  order?: number; // For custom ordering
}

export interface CaseStudySEO {
  _id?: string;
  metaTitle?: string; // maxlength: 60
  metaDescription?: string; // maxlength: 160
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string; // URL to Open Graph image
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
}

export interface CaseStudyMedia {
  _id?: string;
  type: 'image' | 'video' | 'document' | 'base64';
  url: string; // URL or base64 data
  alt?: string; // Alt text for images
  caption?: string;
  width?: number;
  height?: number;
  fileSize?: number; // in bytes
  mimeType?: string;
}

export interface CaseStudyTechnology {
  _id?: string;
  name: string;
  category?: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'other';
  icon?: string; // Icon class or URL
  url?: string; // Link to technology
}

export interface CaseStudyMetric {
  _id?: string;
  label: string; // e.g., "Performance Improvement"
  value: string; // e.g., "40%"
  description?: string;
}

export interface CaseStudyTimeline {
  start?: Date | string;
  end?: Date | string;
  duration?: string; // e.g., "8 weeks", "3 months"
}

export interface CaseStudyBudget {
  range?: '$5K-$10K' | '$10K-$25K' | '$25K-$50K' | '$50K-$100K' | '$100K+' | 'Custom';
  currency?: string; // default: 'USD'
}

export interface CaseStudyLinks {
  live?: string; // Live website URL
  demo?: string; // Demo URL
  github?: string; // GitHub repository
  case_study?: string; // Detailed case study URL
}

export interface CaseStudyAuthor {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface CaseStudy {
  _id?: string;
  
  // General Info
  title: string;
  slug: string;
  summary?: string;
  excerpt?: string; // maxlength: 300 - Short excerpt for previews
  
  // Hero/Featured Image
  featuredImage?: CaseStudyMedia;
  gallery?: CaseStudyMedia[]; // Additional images/media

  // Project Summary
  clientName: string;
  clientLogo?: string; // URL to client logo
  clientWebsite?: string;
  projectType?: 'Web Development' | 'Mobile App' | 'E-commerce' | 'Custom Software' | 'AI/ML Solution' | 'API Integration' | 'UI/UX Design' | 'Other';
  industry?: string;
  
  // Project Details
  timeline?: CaseStudyTimeline;
  budget?: CaseStudyBudget;
  teamSize?: number;
  
  // Technologies Used
  technologies?: CaseStudyTechnology[];
  
  // Key Metrics/Results
  metrics?: CaseStudyMetric[];
  
  // Project Links
  links?: CaseStudyLinks;

  outcome?: string;

  // Section-wise Breakdown (each is a reusable rich text section)
  theProblem?: CaseStudySection;
  whatWeBuilt?: CaseStudySection;
  howWeDidIt?: CaseStudySection;
  theResults?: CaseStudySection;
  whatHappenedNext?: CaseStudySection;
  whatThisMeansForYou?: CaseStudySection;
  
  // Additional flexible sections
  customSections?: CaseStudySection[];

  // SEO and Meta
  seo?: CaseStudySEO;
  
  // Status and Visibility
  status?: 'draft' | 'review' | 'published' | 'archived';
  featured?: boolean;
  published?: boolean;
  publishedAt?: Date | string;
  
  // Analytics
  views?: number;
  likes?: number;
  shares?: number;
  
  // Author Information
  author?: CaseStudyAuthor;
  
  // Tags and Categories
  tags?: string[];
  categories?: string[];
  
  // Timestamps
  createdAt?: Date | string;
  updatedAt?: Date | string;

  // Virtual field
  formattedDuration?: string;
}

export interface CaseStudyListResponse {
  caseStudies: CaseStudy[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

export interface CaseStudyFilterOptions {
  category?: string;
  technology?: string;
  industry?: string;
  status?: string;
  featured?: boolean;
  published?: boolean;
  limit?: number;
  page?: number;
  sort?: 'newest' | 'oldest' | 'popular' | 'featured';
}
