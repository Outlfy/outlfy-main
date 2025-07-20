// Form Response Model for MongoDB
const mongoose = require('mongoose');
const { Schema } = mongoose;

const FormResponseSchema = new Schema(
  {
    // Basic fields from contact form
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: { type: String, required: true },
    
    // Additional flexible fields
    meta: Schema.Types.Mixed, // For any extra fields that might be added to forms
    
    // Form source tracking
    formType: { type: String, default: 'contact' }, // contact, newsletter, etc.
    source: String, // Which page the form was submitted from
    
    // Status tracking
    status: { 
      type: String, 
      enum: ['new', 'read', 'replied', 'archived'], 
      default: 'new' 
    },
    
    // Admin notes
    adminNotes: String,
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
FormResponseSchema.index({ email: 1 });
FormResponseSchema.index({ status: 1 });
FormResponseSchema.index({ createdAt: -1 });

module.exports = mongoose.model('FormResponse', FormResponseSchema);
