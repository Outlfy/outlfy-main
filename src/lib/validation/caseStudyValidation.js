// Shared validation rules for case studies
// Can be used on both client and server sides

export const caseStudyValidationRules = {
  title: {
    required: true,
    minLength: 5,
    maxLength: 200,
    message: "Title is required and must be between 5-200 characters"
  },
  slug: {
    required: true,
    pattern: /^[a-z0-9-]+$/,
    minLength: 3,
    maxLength: 100,
    message: "Slug is required and must contain only lowercase letters, numbers, and hyphens"
  },
  clientName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: "Client name is required and must be between 2-100 characters"
  },
  projectType: {
    required: true,
    message: "Project type is required"
  },
  summary: {
    maxLength: 1000,
    message: "Summary must not exceed 1000 characters"
  },
  excerpt: {
    maxLength: 300,
    message: "Excerpt must not exceed 300 characters"
  },
  "seo.metaTitle": {
    maxLength: 60,
    message: "Meta title must not exceed 60 characters"
  },
  "seo.metaDescription": {
    maxLength: 160,
    message: "Meta description must not exceed 160 characters"
  },
  "timeline.start": {
    validate: (value, form) => {
      if (value && form.timeline?.end) {
        return new Date(value) <= new Date(form.timeline.end);
      }
      return true;
    },
    message: "Start date must be before end date"
  },
  "timeline.end": {
    validate: (value, form) => {
      if (value && form.timeline?.start) {
        return new Date(value) >= new Date(form.timeline.start);
      }
      return true;
    },
    message: "End date must be after start date"
  },
  clientWebsite: {
    pattern: /^https?:\/\/.+/,
    message: "Client website must be a valid URL starting with http:// or https://"
  },
  "links.live": {
    pattern: /^https?:\/\/.+/,
    message: "Live URL must be a valid URL starting with http:// or https://"
  },
  "links.demo": {
    pattern: /^https?:\/\/.+/,
    message: "Demo URL must be a valid URL starting with http:// or https://"
  },
  "links.github": {
    pattern: /^https?:\/\/.+/,
    message: "GitHub URL must be a valid URL starting with http:// or https://"
  },
  teamSize: {
    validate: (value) => {
      if (value && (isNaN(value) || value < 1 || value > 100)) {
        return false;
      }
      return true;
    },
    message: "Team size must be a number between 1 and 100"
  }
};

// Helper function to get nested object values
export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper function to set nested object values
export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
};

// Validate a single field
export const validateField = (name, value, formData = {}) => {
  const rule = caseStudyValidationRules[name];
  if (!rule) return null;

  // Required validation
  if (rule.required && (!value || value.toString().trim() === '')) {
    return rule.message || `${name} is required`;
  }

  // Skip other validations if field is empty and not required
  if (!value || value.toString().trim() === '') return null;

  // String length validations
  if (rule.minLength && value.length < rule.minLength) {
    return rule.message || `${name} must be at least ${rule.minLength} characters`;
  }
  if (rule.maxLength && value.length > rule.maxLength) {
    return rule.message || `${name} must not exceed ${rule.maxLength} characters`;
  }

  // Pattern validation
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message || `${name} format is invalid`;
  }

  // Custom validation function
  if (rule.validate && !rule.validate(value, formData)) {
    return rule.message || `${name} is invalid`;
  }

  return null;
};

// Validate entire case study form
export const validateCaseStudy = (formData) => {
  const errors = {};
  let isValid = true;

  // Validate basic fields
  Object.keys(caseStudyValidationRules).forEach(fieldName => {
    const value = getNestedValue(formData, fieldName);
    const error = validateField(fieldName, value, formData);
    if (error) {
      setNestedValue(errors, fieldName, error);
      isValid = false;
    }
  });

  // Validate section content requirements
  const requiredSections = ['theProblem', 'whatWeBuilt', 'howWeDidIt', 'theResults'];
  requiredSections.forEach(sectionName => {
    const section = formData[sectionName];
    if (!section?.heading?.trim()) {
      errors[`${sectionName}.heading`] = `${sectionName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} heading is required`;
      isValid = false;
    }
    if (!section?.content?.trim()) {
      errors[`${sectionName}.content`] = `${sectionName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} content is required`;
      isValid = false;
    }
  });

  // Validate technologies (at least one required)
  if (!formData.technologies || formData.technologies.length === 0) {
    errors.technologies = "At least one technology is required";
    isValid = false;
  }

  // Validate metrics (at least one required for published case studies)
  if (formData.status === 'published' && (!formData.metrics || formData.metrics.length === 0)) {
    errors.metrics = "At least one metric is required for published case studies";
    isValid = false;
  }

  return { isValid, errors };
};

// Server-side validation for API routes
export const validateCaseStudyForAPI = (data) => {
  const { isValid, errors } = validateCaseStudy(data);
  
  // Additional server-side checks can be added here
  // For example, checking if slug already exists in database
  
  return { isValid, errors };
};
