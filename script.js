// FAQ Expansion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            item.classList.toggle('active');
            
            // Log for debugging
            console.log('FAQ item clicked:', item.classList.contains('active'));
        });
    });
    
    // Log for debugging
    console.log('FAQ functionality initialized');
});

// Human verification for forms
document.addEventListener('DOMContentLoaded', function() {
    // Find all forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Check if this is a Zoho form (has the specific action URL)
        if (form.action && form.action.includes('zohopublic.com')) {
            // Add human verification checkbox if it doesn't exist
            if (!form.querySelector('.human-verification')) {
                // Create verification container
                const verificationContainer = document.createElement('div');
                verificationContainer.className = 'human-verification';
                verificationContainer.style.marginBottom = '15px';
                
                // Create checkbox and label
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'human-verification-' + Math.random().toString(36).substr(2, 9);
                checkbox.name = 'human_verification';
                checkbox.required = true;
                checkbox.style.marginRight = '8px';
                
                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                label.textContent = 'I am a human and not a bot';
                label.style.fontSize = '14px';
                label.style.color = '#333';
                
                // Add elements to container
                verificationContainer.appendChild(checkbox);
                verificationContainer.appendChild(label);
                
                // Find the submit button container
                const submitContainer = form.querySelector('.zf-fmFooter');
                if (submitContainer) {
                    // Insert before the submit button
                    submitContainer.parentNode.insertBefore(verificationContainer, submitContainer);
                } else {
                    // If no submit container found, add to the end of the form
                    form.appendChild(verificationContainer);
                }
                
                // Add form validation
                form.addEventListener('submit', function(e) {
                    if (!checkbox.checked) {
                        e.preventDefault();
                        alert('Please confirm that you are human by checking the box.');
                        return false;
                    }
                });
            }
        }
    });
}); 