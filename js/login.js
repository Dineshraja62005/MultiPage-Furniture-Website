// Enhanced Login Form Interactions
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const resetForm = document.getElementById('resetForm');
    
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const showResetLink = document.getElementById('showReset');
    const backToLoginLink = document.getElementById('backToLogin');
    
    const passwordToggles = document.querySelectorAll('.toggle-password');

    // Form Switching
    function switchForm(showForm, hideForm1, hideForm2) {
        showForm.classList.remove('hidden-form');
        hideForm1.classList.add('hidden-form');
        hideForm2.classList.add('hidden-form');
        
    }

    // Event Listeners for Form Switching
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(registerForm, loginForm, resetForm);
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(loginForm, registerForm, resetForm);
        });
    }

    if (showResetLink) {
        showResetLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(resetForm, loginForm, registerForm);
        });
    }

    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(loginForm, resetForm, registerForm);
        });
    }

    // Password Visibility Toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    });

    // Form Submission Handlers
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageElement = loginForm.querySelector('.auth-message');
            const emailInput = loginForm.querySelector('input[name="email"]');
            const passwordInput = loginForm.querySelector('input[name="password"]');

            // Basic validation
            if (!emailInput.value || !passwordInput.value) {
                showMessage(messageElement, 'Please fill in all fields', 'error');
                return;
            }

            try {
                const response = await loginUser(emailInput.value, passwordInput.value);
                
                if (response.success) {
                    showMessage(messageElement, 'Login successful', 'success');
                    // Redirect or update UI after successful login
                    setTimeout(() => {
                        window.location.href = 'home.html';
                    }, 1500);
                } else {
                    showMessage(messageElement, response.message, 'error');
                }
            } catch (error) {
                showMessage(messageElement, 'An error occurred. Please try again.', 'error');
                console.error('Login error:', error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageElement = registerForm.querySelector('.auth-message');
            const nameInput = registerForm.querySelector('input[name="name"]');
            const emailInput = registerForm.querySelector('input[name="email"]');
            const passwordInput = registerForm.querySelector('input[name="password"]');
            const confirmPasswordInput = registerForm.querySelector('input[name="confirmPassword"]');
            const termsCheckbox = registerForm.querySelector('input[name="terms"]');

            // Validation
            if (!nameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
                showMessage(messageElement, 'Please fill in all fields', 'error');
                return;
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                showMessage(messageElement, 'Passwords do not match', 'error');
                return;
            }

            if (!termsCheckbox.checked) {
                showMessage(messageElement, 'Please agree to terms and conditions', 'error');
                return;
            }

            try {
                const response = await registerUser(
                    nameInput.value, 
                    emailInput.value, 
                    passwordInput.value
                );
                
                if (response.success) {
                    showMessage(messageElement, 'Registration successful', 'success');
                    // Automatically switch to login form
                    setTimeout(() => {
                        switchForm(loginForm, registerForm, resetForm);
                        registerForm.reset();
                    }, 2000);
                } else {
                    showMessage(messageElement, response.message, 'error');
                }
            } catch (error) {
                showMessage(messageElement, 'An error occurred. Please try again.', 'error');
                console.error('Registration error:', error);
            }
        });
    }

    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageElement = resetForm.querySelector('.auth-message');
            const emailInput = resetForm.querySelector('input[name="resetEmail"]');

            // Basic validation
            if (!emailInput.value) {
                showMessage(messageElement, 'Please enter your email', 'error');
                return;
            }

            // Placeholder for password reset logic
            showMessage(messageElement, 'Password reset instructions sent', 'success');
            
            // In a real app, this would call a backend password reset endpoint
            setTimeout(() => {
                switchForm(loginForm, resetForm, registerForm);
                resetForm.reset();
            }, 2000);
        });
    }

    // Helper function to show messages
    function showMessage(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = `auth-message ${type}`;
    }
});

// Authentication API calls (these should match your existing PHP backend)
async function loginUser(email, password) {
    try {
        const response = await fetch('php/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    } catch (error) {
        console.error('Login fetch error:', error);
        throw error;
    }
}

async function registerUser(name, email, password) {
    try {
        const response = await fetch('php/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        return await response.json();
    } catch (error) {
        console.error('Registration fetch error:', error);
        throw error;
    }
}