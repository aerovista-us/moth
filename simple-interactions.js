// Simple Interactions - Clean and Lightweight
document.addEventListener('DOMContentLoaded', function() {
    // Simple form interactions
    const inputs = document.querySelectorAll('.mystical-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('fade-in');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('fade-in');
        });
    });
    
    // Simple checkbox interactions
    const checkboxes = document.querySelectorAll('.mystical-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            this.closest('li').classList.add('slide-in');
        });
    });
    
    // Simple navigation
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');
        });
    });
});
