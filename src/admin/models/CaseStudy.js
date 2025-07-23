// Case Study Model for MongoDB
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Section schema for reusable structure with rich content
const SectionSchema = new Schema({
  heading: { type: String, required: true },
  content: { type: String, required: true }, // Rich HTML content from TipTap editor
  excerpt: { type: String }, // Short description for previews
  order: { type: Number, default: 0 }, // For custom ordering
});

// SEO Meta schema
const SEOMetaSchema = new Schema({
  metaTitle: { type: String, maxlength: 60 },
  metaDescription: { type: String, maxlength: 160 },
  keywords: [String],
  ogTitle: { type: String },
  ogDescription: { type: String },
  ogImage: { type: String }, // URL to Open Graph image
  twitterCard: { type: String, enum: ['summary', 'summary_large_image'], default: 'summary_large_image' },
  canonicalUrl: { type: String },
});

// Media schema for images, videos, etc.
const MediaSchema = new Schema({
  type: { type: String, enum: ['image', 'video', 'document', 'base64'], required: true },
  url: { type: String, required: true }, // URL or base64 data
  alt: { type: String }, // Alt text for images
  caption: { type: String },
  width: { type: Number },
  height: { type: Number },
  fileSize: { type: Number }, // in bytes
  mimeType: { type: String },
});

// Technology/Tools used schema
const TechnologySchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend', 'database', 'devops', 'design', 'other'] },
  icon: { type: String }, // Icon class or URL
  url: { type: String }, // Link to technology
});

// Main Case Study Schema
const CaseStudySchema = new Schema(
  {
    // General Info
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String },
    excerpt: { type: String, maxlength: 300 }, // Short excerpt for previews
    
    // Hero/Featured Image
    featuredImage: MediaSchema,
    gallery: [MediaSchema], // Additional images/media

    // Project Summary
    clientName: { type: String, required: true },
    clientLogo: { type: String }, // URL to client logo
    clientWebsite: { type: String },
    projectType: { 
      type: String,
      enum: ['Web Development', 'Mobile App', 'E-commerce', 'Custom Software', 'AI/ML Solution', 'API Integration', 'UI/UX Design', 'Other']
    },
    industry: { type: String },
    
    // Project Details
    timeline: {
      start: { type: Date },
      end: { type: Date },
      duration: { type: String }, // e.g., "8 weeks", "3 months"
    },
    budget: {
      range: { type: String, enum: ['$5K-$10K', '$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K+', 'Custom'] },
      currency: { type: String, default: 'USD' },
    },
    teamSize: { type: Number },
    
    // Technologies Used
    technologies: [TechnologySchema],
    
    // Key Metrics/Results
    metrics: [{
      label: { type: String, required: true }, // e.g., "Performance Improvement"
      value: { type: String, required: true }, // e.g., "40%"
      description: { type: String },
    }],
    
    // Project Links
    links: {
      live: { type: String }, // Live website URL
      demo: { type: String }, // Demo URL
      github: { type: String }, // GitHub repository
      case_study: { type: String }, // Detailed case study URL
    },

    outcome: { type: String },

    // Section-wise Breakdown (each is a reusable rich text section)
    theProblem: SectionSchema,
    whatWeBuilt: SectionSchema,
    howWeDidIt: SectionSchema,
    theResults: SectionSchema,
    whatHappenedNext: SectionSchema,
    whatThisMeansForYou: SectionSchema,
    
    // Additional flexible sections
    customSections: [SectionSchema],

    // SEO and Meta
    seo: SEOMetaSchema,
    
    // Status and Visibility
    status: { 
      type: String, 
      enum: ['draft', 'review', 'published', 'archived'], 
      default: 'draft' 
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    
    // Analytics
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    
    // Author Information
    author: {
      name: { type: String },
      email: { type: String },
      avatar: { type: String },
    },
    
    // Tags and Categories
    tags: [String],
    categories: [String],
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to update the updatedAt field and handle publishing
CaseStudySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  
  // Auto-generate excerpt from summary if not provided
  if (!this.excerpt && this.summary) {
    this.excerpt = this.summary.substring(0, 297) + (this.summary.length > 297 ? '...' : '');
  }
  
  next();
});

// Virtual for formatted duration
CaseStudySchema.virtual('formattedDuration').get(function() {
  if (this.timeline.start && this.timeline.end) {
    const start = new Date(this.timeline.start);
    const end = new Date(this.timeline.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.ceil(diffDays / 7);
    const diffMonths = Math.ceil(diffDays / 30);
    
    if (diffDays <= 7) return `${diffDays} days`;
    if (diffWeeks <= 8) return `${diffWeeks} weeks`;
    return `${diffMonths} months`;
  }
  return this.timeline.duration || 'Not specified';
});

// Create indexes for better query performance
// Note: slug index is automatically created by unique: true in schema definition
CaseStudySchema.index({ status: 1, published: 1 });
CaseStudySchema.index({ featured: 1 });
CaseStudySchema.index({ 'seo.keywords': 1 });
CaseStudySchema.index({ tags: 1 });
CaseStudySchema.index({ industry: 1 });
CaseStudySchema.index({ projectType: 1 });
CaseStudySchema.index({ createdAt: -1 });

export default mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);
