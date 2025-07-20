// Case Study Model for MongoDB
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Section schema for reusable structure
const SectionSchema = new Schema({
  heading: { type: String, required: true },
  content: { type: String, required: true }, // Rich text: HTML or Markdown
});

// Main Case Study Schema
const CaseStudySchema = new Schema(
  {
    // General Info
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String },

    // Project Summary
    clientName: { type: String, required: true },
    projectType: { type: String },
    industry: { type: String },
    timeline: {
      start: { type: Date },
      end: { type: Date },
    },
    outcome: { type: String },

    // Section-wise Breakdown (each is a reusable rich text section)
    theProblem: SectionSchema,
    whatWeBuilt: SectionSchema,
    howWeDidIt: SectionSchema,
    theResults: SectionSchema,
    whatHappenedNext: SectionSchema,
    whatThisMeansForYou: SectionSchema,

    // Meta data
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to update the updatedAt field
CaseStudySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CaseStudy', CaseStudySchema);
