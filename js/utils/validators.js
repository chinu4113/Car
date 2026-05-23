// js/utils/validators.js
// specific validation logic for forms across the application

const Validators = {
    
    /**
     * specific email format check using regex
     * @param {string} email 
     * @returns {boolean}
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Checks if password is at least 6 characters long
     * @param {string} password 
     * @returns {boolean}
     */
    isValidPassword: function(password) {
        return password && password.length >= 6;
    },

    /**
     * Validates US phone number formats (simple check for 10 digits)
     * @param {string} phone 
     * @returns {boolean}
     */
    isValidPhone: function(phone) {
        // Removes all non-numeric characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if length is 10 or 11
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    },

    /**
     * Basic check for Vehicle Identification Number (17 chars)
     * @param {string} vin 
     * @returns {boolean}
     */
    isValidVIN: function(vin) {
        // VINs are exactly 17 characters, excluding I, O, and Q to avoid confusion with numbers
        const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
        return vinRegex.test(vin);
    },

    /**
     * Generic required field check
     * @param {string} value 
     * @returns {boolean}
     */
    isRequired: function(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    },

    /**
     * Helper to format error messages
     * @param {string} fieldName 
     * @returns {string}
     */
    getErrorMessage: function(fieldName, type) {
        const messages = {
            required: `${fieldName} is required.`,
            email: `Please enter a valid email address.`,
            phone: `Please enter a valid 10-digit phone number.`,
            password: `Password must be at least 6 characters.`,
            vin: `VIN must be exactly 17 alphanumeric characters.`
        };
        return messages[type] || 'Invalid input.';
    }
};

// Expose to window if needed specifically (though const Validators does this in global scope script)
window.Validators = Validators;