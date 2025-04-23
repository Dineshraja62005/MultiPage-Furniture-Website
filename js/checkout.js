// checkout.js - Handles checkout page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get checkout form
    const checkoutForm = document.getElementById('checkout-form');
    
    // Get payment methods
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    // Add event listeners to payment methods
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            
            // Add active class to selected method
            this.classList.add('active');
        });
    });
    
    // Handle form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        if (!validateForm()) {
            return;
        }
        
        // Get selected payment method
        const selectedMethod = document.querySelector('.payment-method.active').dataset.method;
        
        // Simulate order processing
        showProcessingOverlay();
        
        // Simulate a delay for processing
        setTimeout(() => {
            // Hide processing overlay
            hideProcessingOverlay();
            
            // Show success message
            showSuccessMessage();
            
            // Clear cart and redirect after a delay
            setTimeout(() => {
                if (window.cartManager) {
                    window.cartManager.clearCart();
                }
                
                // Redirect to home page
                window.location.href = 'home.html';
            }, 3000);
        }, 2000);
    });
    
    // Form validation
    function validateForm() {
        // Get form fields
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');
        const city = document.getElementById('city');
        const state = document.getElementById('state');
        const zip = document.getElementById('zip');
        const country = document.getElementById('country');
        
        // Validate required fields
        const requiredFields = [firstName, lastName, email, phone, address, city, state, zip, country];
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                highlightField(field, true);
                isValid = false;
            } else {
                highlightField(field, false);
            }
        });
        
        // Email validation
        if (email.value && !isValidEmail(email.value)) {
            highlightField(email, true);
            isValid = false;
        }
        
        // Validate credit card fields if credit card is selected
        if (document.querySelector('.payment-method[data-method="creditCard"]').classList.contains('active')) {
            const cardName = document.getElementById('cardName');
            const cardNumber = document.getElementById('cardNumber');
            const expDate = document.getElementById('expDate');
            const cvv = document.getElementById('cvv');
            
            const cardFields = [cardName, cardNumber, expDate, cvv];
            
            cardFields.forEach(field => {
                if (!field.value.trim()) {
                    highlightField(field, true);
                    isValid = false;
                } else {
                    highlightField(field, false);
                }
            });
            
            // Basic card number validation
            if (cardNumber.value && !isValidCardNumber(cardNumber.value)) {
                highlightField(cardNumber, true);
                isValid = false;
            }
            
            // Basic expiration date validation
            if (expDate.value && !isValidExpDate(expDate.value)) {
                highlightField(expDate, true);
                isValid = false;
            }
            
            // Basic CVV validation
            if (cvv.value && !isValidCVV(cvv.value)) {
                highlightField(cvv, true);
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Highlight field with error
    function highlightField(field, isError) {
        if (isError) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Credit card validation
    function isValidCardNumber(cardNumber) {
        // Remove spaces and dashes
        const card = cardNumber.replace(/[\s-]/g, '');
        // Check if it contains only digits and has 13-19 digits
        return /^\d{13,19}$/.test(card);
    }
    
    // Expiration date validation (MM/YY format)
    function isValidExpDate(expDate) {
        const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!re.test(expDate)) return false;
        
        const [month, year] = expDate.split('/');
        const now = new Date();
        const currentYear = now.getFullYear() % 100; // Last two digits of current year
        const currentMonth = now.getMonth() + 1; // January is 0
        
        // Convert to numbers
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        // Check if the date is in the future
        return (yearNum > currentYear) || (yearNum === currentYear && monthNum >= currentMonth);
    }
    
    // CVV validation (3-4 digits)
    function isValidCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }
    
    // Show processing overlay
    function showProcessingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'processing-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        
        const content = document.createElement('div');
        content.style.backgroundColor = 'white';
        content.style.padding = '2rem';
        content.style.borderRadius = '1rem';
        content.style.textAlign = 'center';
        content.innerHTML = `
            <div class="loader" style="border: 4px solid #f3f3f3; border-top: 4px solid #5e473e; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="font-size: 1.8rem; color: #5e473e;">Processing your order...</p>
        `;
        
        // Add the spinning animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }
    
    // Hide processing overlay
    function hideProcessingOverlay() {
        const overlay = document.getElementById('processing-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    
    // Show success message
    function showSuccessMessage() {
        const overlay = document.createElement('div');
        overlay.id = 'success-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        
        const content = document.createElement('div');
        content.style.backgroundColor = 'white';
        content.style.padding = '3rem';
        content.style.borderRadius = '1rem';
        content.style.textAlign = 'center';
        content.innerHTML = `
            <i class="ri-checkbox-circle-fill" style="font-size: 5rem; color: #5e473e; margin-bottom: 1rem;"></i>
            <h3 style="font-size: 2.5rem; color: #5e473e; margin-bottom: 1rem;">Order Successful!</h3>
            <p style="font-size: 1.8rem; color: #b58d7e; margin-bottom: 0.5rem;">Thank you for shopping with WoodStory.</p>
            <p style="font-size: 1.6rem; color: #b58d7e;">You will be redirected to the home page...</p>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }
    
    // Populate order summary
    function populateOrderSummary() {
        if (!window.cartManager) return;
        
        const orderItems = document.getElementById('order-items');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutShipping = document.getElementById('checkout-shipping');
        const checkoutTax = document.getElementById('checkout-tax');
        const checkoutTotal = document.getElementById('checkout-total');
        
        // Clear order items
        orderItems.innerHTML = '';
        
        // Get cart data
        const cart = window.cartManager.cart;
        
        // Check if cart is empty
        if (cart.length === 0) {
            // Redirect to cart page
            window.location.href = 'cart.html';
            return;
        }
        
        // Add cart items to order summary
        cart.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            
            orderItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="order-item-quantity">${item.quantity}</div>
            `;
            
            orderItems.appendChild(orderItem);
        });
        
        // Calculate totals
        const subtotal = window.cartManager.getCartTotal();
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.07; // 7% tax
        const total = subtotal + shipping + tax;
        
        // Update summary
        checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        checkoutShipping.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        checkoutTax.textContent = `$${tax.toFixed(2)}`;
        checkoutTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Initialize
    populateOrderSummary();
});