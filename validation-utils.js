// Input validation utilities
const ValidationUtils = {
    // Sanitize input to prevent XSS
    sanitizeInput: function(input) {
        if (typeof input !== 'string') return input;
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    },

    // Validate email format
    validateEmail: function(email) {
        if (!email) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    },

    // Validate phone number format
    validatePhone: function(phone) {
        if (!phone) return true; // Optional field
        const phoneRegex = /^[\d\s\-+()]{10,20}$/;
        return phoneRegex.test(phone);
    },

    // Validate name format
    validateName: function(name) {
        if (!name) return false;
        const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
        return nameRegex.test(name);
    },

    // Validate message content
    validateMessage: function(message) {
        if (!message) return false;
        if (message.length < 10 || message.length > 1000) return false;
        // Check for common spam patterns
        const spamPatterns = [
            /viagra/i,
            /casino/i,
            /lottery/i,
            /winner/i,
            /congratulations/i,
            /click here/i,
            /free money/i,
            /investment opportunity/i,
            /bitcoin/i,
            /cryptocurrency/i
        ];
        return !spamPatterns.some(pattern => pattern.test(message));
    },

    // Validate subject selection
    validateSubject: function(subject) {
        const validSubjects = [
            'General Inquiry',
            'Services Information',
            'Request Consultation',
            'Technical Support'
        ];
        return validSubjects.includes(subject);
    },

    // Validate file upload (if implemented)
    validateFile: function(file) {
        if (!file) return true; // Optional
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        return file.size <= maxSize && allowedTypes.includes(file.type);
    },

    // Validate form data
    validateFormData: function(formData) {
        const errors = [];
        
        // Validate first name
        if (!this.validateName(formData.get('Name_First'))) {
            errors.push('Please enter a valid first name');
        }
        
        // Validate last name
        if (!this.validateName(formData.get('Name_Last'))) {
            errors.push('Please enter a valid last name');
        }
        
        // Validate email
        if (!this.validateEmail(formData.get('Email'))) {
            errors.push('Please enter a valid email address');
        }
        
        // Validate phone (if provided)
        const phone = formData.get('PhoneNumber_countrycode');
        if (phone && !this.validatePhone(phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        // Validate subject
        if (!this.validateSubject(formData.get('Dropdown'))) {
            errors.push('Please select a valid subject');
        }
        
        // Validate message
        if (!this.validateMessage(formData.get('MultiLine'))) {
            errors.push('Please enter a valid message (10-1000 characters)');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationUtils;
} 