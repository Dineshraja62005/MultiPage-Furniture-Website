// auth.js - Authentication system for WoodStory with PHP backend

// Check session on page load
function checkSession() {
    fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.isLoggedIn) {
                // User is logged in
                currentUser = data.user;
                updateUIOnAuth();
            }
        })
        .catch(error => console.error('Error checking session:', error));
}

// Register a new user
function registerUser(name, email, password) {
    return fetch('php/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session management
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error during registration:', error);
        return { success: false, message: 'An error occurred during registration' };
    });
}

// Authenticate a user
function loginUser(email, password) {
    return fetch('php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session management
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            updateUIOnAuth();
        }
        return data;
    })
    .catch(error => {
        console.error('Error during login:', error);
        return { success: false, message: 'An error occurred during login' };
    });
}

// Logout user
function logoutUser() {
    return fetch('php/logout.php', {
        method: 'POST',
        credentials: 'include' // Important for session management
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentUser = null;
                updateUIOnAuth();
            }
            return data;
        })
        .catch(error => {
            console.error('Error during logout:', error);
            return { success: false, message: 'An error occurred during logout' };
        });
}

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Check if current user is an admin
function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}

// Current user data
let currentUser = null;

// Update UI based on login status
function updateUIOnAuth() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn') || document.createElement('div');
    const userInfoElem = document.getElementById('user-info') || document.createElement('div');
    
    if (isLoggedIn()) {
        // Add logout button if not exists
        if (!document.getElementById('logout-btn')) {
            logoutBtn.id = 'logout-btn';
            logoutBtn.className = 'ri-logout-box-line';
            logoutBtn.title = 'Logout';
            logoutBtn.onclick = function() {
                logoutUser().then(() => {
                    window.location.reload();
                });
            };
            
            // Add to icons section
            document.querySelector('.icons').appendChild(logoutBtn);
        }
        
        // User info element
        if (!document.getElementById('user-info')) {
            userInfoElem.id = 'user-info';
            userInfoElem.className = 'user-info';
            
            const header = document.querySelector('.header');
            header.insertBefore(userInfoElem, document.querySelector('.icons'));
        }
        
        // Update user info content
        userInfoElem.innerHTML = `<span>Hello, ${currentUser.name}</span>`;
        
        // Add admin dashboard link if admin
        if (isAdmin()) {
            if (!document.getElementById('admin-btn')) {
                const adminBtn = document.createElement('div');
                adminBtn.id = 'admin-btn';
                adminBtn.className = 'ri-settings-line';
                adminBtn.title = 'Admin Dashboard';
                adminBtn.onclick = function() {
                    window.location.href = 'admin.html';
                };
                
                document.querySelector('.icons').appendChild(adminBtn);
            }
            
            // Add admin tag to user info
            userInfoElem.innerHTML += ' <small>(Admin)</small>';
        }
        
        // Hide login button
        if (loginBtn) loginBtn.style.display = 'none';
    } else {
        // Reset to login state
        if (loginBtn) loginBtn.style.display = 'block';
        
        // Remove logout button if exists
        if (document.getElementById('logout-btn')) {
            document.getElementById('logout-btn').remove();
        }
        
        // Remove admin button if exists
        if (document.getElementById('admin-btn')) {
            document.getElementById('admin-btn').remove();
        }
        
        // Remove user info
        if (document.getElementById('user-info')) {
            document.getElementById('user-info').remove();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
});