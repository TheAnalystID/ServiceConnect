// Form validation and security measures
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    let lastSubmitTime = 0;
    const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds between submissions

    // Rate limiting
    form.addEventListener('submit', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
            e.preventDefault();
            alert('Please wait a few seconds before submitting again.');
            return false;
        }
        lastSubmitTime = currentTime;
    });

    // Input validation
    const emailInput = form.querySelector('input[name="Email"]');
    const phoneInput = form.querySelector('input[name="PhoneNumber_countrycode"]');
    const messageInput = form.querySelector('textarea[name="MultiLine"]');
    const firstNameInput = form.querySelector('input[name="Name_First"]');
    const lastNameInput = form.querySelector('input[name="Name_Last"]');
    const subjectInput = form.querySelector('select[name="Dropdown"]');

    // Real-time validation with visual feedback
    function validateInput(input, validator, errorMessage) {
        input.addEventListener('input', function() {
            const value = ValidationUtils.sanitizeInput(this.value);
            if (!validator(value)) {
                this.setCustomValidity(errorMessage);
                this.classList.add('invalid');
            } else {
                this.setCustomValidity('');
                this.classList.remove('invalid');
            }
        });
    }

    // Apply validation to all inputs
    validateInput(firstNameInput, ValidationUtils.validateName, 'Please enter a valid first name');
    validateInput(lastNameInput, ValidationUtils.validateName, 'Please enter a valid last name');
    validateInput(emailInput, ValidationUtils.validateEmail, 'Please enter a valid email address');
    validateInput(phoneInput, ValidationUtils.validatePhone, 'Please enter a valid phone number');
    validateInput(messageInput, ValidationUtils.validateMessage, 'Please enter a valid message (10-1000 characters)');
    validateInput(subjectInput, ValidationUtils.validateSubject, 'Please select a valid subject');

    // Form submission validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const validation = ValidationUtils.validateFormData(formData);
        
        if (!validation.isValid) {
            alert(validation.errors.join('\n'));
            return false;
        }
        
        // If validation passes, submit the form
        this.submit();
    });

    // Prevent multiple submissions
    let isSubmitting = false;
    form.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
        isSubmitting = true;
        setTimeout(() => {
            isSubmitting = false;
        }, 5000);
    });
}); 