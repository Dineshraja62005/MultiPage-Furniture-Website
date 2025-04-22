// login.js - Handles login form interactions

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const resetForm = document.getElementById('resetForm');
    
    // Message elements
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');
    const resetMessage = document.getElementById('resetMessage');
    
    // Switch between forms
    document.getElementById('showRegister').addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        registerForm.classList.remove('hidden-form');
        registerForm.classList.add('active-form');
        resetForm.classList.remove('active-form');
        resetForm.classList.add('hidden-form');
    });
    
    document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');
        registerForm.classList.remove('active-form');
        registerForm.classList.add('hidden-form');
        resetForm.classList.remove('active-form');
        resetForm.classList.add('hidden-form');
    });
    
    document.getElementById('showReset').addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        registerForm.classList.remove('active-form');
        registerForm.classList.add('hidden-form');
        resetForm.classList.remove('hidden-form');
        resetForm.classList.add('active-form');
    });
    
    document.getElementById('backToLogin').addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');
        resetForm.classList.remove('active-form');
        resetForm.classList.add('hidden-form');
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;
        
        // Validate inputs
        if (!email || !password) {
            showMessage(loginMessage, 'Please enter both email and password', 'error');
            return;
        }
        
        // Show loading message
        showMessage(loginMessage, 'Logging in...', 'info');
        
        // Attempt login
        loginUser(email, password)
            .then(result => {
                if (result.success) {
                    showMessage(loginMessage, result.message, 'success');
                    
                    // Close the login form
                    setTimeout(() => {
                        document.querySelector('#closer').click();
                        // Reload to update UI
                        window.location.reload();
                    }, 1000);
                } else {
                    showMessage(loginMessage, result.message, 'error');
                }
            });
    });
    
    // Handle registration form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;
        const confirmPassword = this.querySelector('input[name="confirmPassword"]').value;
        const termsAgreed = this.querySelector('input[name="terms"]').checked;
        
        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            showMessage(registerMessage, 'Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage(registerMessage, 'Passwords do not match', 'error');
            return;
        }
        
        if (!termsAgreed) {
            showMessage(registerMessage, 'You must agree to the terms and conditions', 'error');
            return;
        }
        
        // Show loading message
        showMessage(registerMessage, 'Creating your account...', 'info');
        
        // Attempt registration
        registerUser(name, email, password)
            .then(result => {
                if (result.success) {
                    showMessage(registerMessage, result.message + '. You can now log in.', 'success');
                    
                    // Clear form
                    this.reset();
                    
                    // Switch to login form after delay
                    setTimeout(() => {
                        document.getElementById('showLogin').click();
                    }, 2000);
                } else {
                    showMessage(registerMessage, result.message, 'error');
                }
            });
    });
    
    // Handle reset password form
    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[name="resetEmail"]').value;
        
        // In a real app, this would call a backend endpoint
        // For now, just show a message
        
        showMessage(resetMessage, 'If your email exists in our system, you will receive reset instructions shortly.', 'success');
        
        // Clear form
        this.reset();
        
        // Return to login after delay
        setTimeout(() => {
            document.getElementById('backToLogin').click();
        }, 3000);
    });
    
    // Helper function to show form messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'message ' + type;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    }
});