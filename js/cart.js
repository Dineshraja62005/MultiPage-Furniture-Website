// cart.js - Shopping Cart Management System

class CartManager {
    constructor() {
        // Initialize cart from localStorage or as empty array
        this.cart = JSON.parse(localStorage.getItem('woodstory_cart')) || [];
        this.updateCartDisplay();
        this.setupEventListeners();
    }

    // Add item to cart
    addToCart(product, quantity = 1) {
        // Check if product already exists in cart
        const existingProductIndex = this.cart.findIndex(
            item => item.id === product.id
        );

        if (existingProductIndex > -1) {
            // If product exists, update quantity
            this.cart[existingProductIndex].quantity += quantity;
        } else {
            // If product is new, add to cart
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        // Save updated cart to localStorage
        this.saveCart();

        // Update cart display
        this.updateCartDisplay();
        
        // Show feedback to user
        this.showNotification(`Added ${quantity} ${product.name} to cart`);
        
        return true;
    }

    // Remove item from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification("Item removed from cart");
    }

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
            if (newQuantity < 1) {
                // Remove item if quantity is less than 1
                this.removeFromCart(productId);
            } else {
                // Update quantity
                this.cart[itemIndex].quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
                this.showNotification("Cart updated");
            }
        }
    }

    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification("Cart cleared");
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('woodstory_cart', JSON.stringify(this.cart));
    }

    // Get cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart count
    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Update cart display in the shopping cart section
    updateCartDisplay() {
        // Update cart badge/indicator
        this.updateCartIndicator();
        
        // Update cart sidebar
        const cartContainer = document.querySelector('.shopping-cart');
        if (!cartContainer) return;
        
        // Clear existing cart items
        while (cartContainer.querySelector('.box')) {
            cartContainer.querySelector('.box').remove();
        }

        // Get total element
        const cartTotalElement = cartContainer.querySelector('.total span');
        
        // Calculate total
        const total = this.getCartTotal();
        
        // If cart is empty, show message
        if (this.cart.length === 0) {
            const emptyCartMessage = document.createElement('div');
            emptyCartMessage.classList.add('empty-cart-message');
            emptyCartMessage.innerHTML = `
                <i class="ri-shopping-bag-line"></i>
                <p>Your cart is empty</p>
                <a href="shop.html" class="btn">Shop Now</a>
            `;
            cartContainer.insertBefore(emptyCartMessage, cartTotalElement.parentElement);
        } else {
            // Add cart items
            this.cart.forEach(item => {
                const cartBox = document.createElement('div');
                cartBox.classList.add('box');
                
                cartBox.innerHTML = `
                    <i class="ri-close-line close-icon" data-id="${item.id}"></i>
                    <img src="${item.image}" alt="${item.name}">
                    <div class="content">
                        <h3>${item.name}</h3>
                        <span class="quantity">${item.quantity}</span>
                        <span class="multiply">x</span>
                        <span class="price">$${item.price.toFixed(2)}</span>
                    </div>
                `;
                
                cartContainer.insertBefore(cartBox, cartTotalElement.parentElement);
            });
        }
        
        // Update total
        if (cartTotalElement) {
            cartTotalElement.textContent = `$${total.toFixed(2)}`;
        }
        
        // Add event listeners to close icons
        const closeIcons = cartContainer.querySelectorAll('.close-icon');
        closeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                this.removeFromCart(productId);
            });
        });
    }
    
    // Update cart indicator (badge showing number of items)
    updateCartIndicator() {
        const cartBtn = document.getElementById('cart-btn');
        if (!cartBtn) return;
        
        // Get existing badge or create a new one
        let badge = document.getElementById('cart-badge');
        const count = this.getCartCount();
        
        if (count > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.id = 'cart-badge';
                badge.classList.add('cart-badge');
                cartBtn.appendChild(badge);
            }
            badge.textContent = count;
        } else if (badge) {
            badge.remove();
        }
    }
    
    // Setup global event listeners
    setupEventListeners() {
        // Event delegation for add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productBox = e.target.closest('.box');
                if (productBox) {
                    const productId = productBox.dataset.productId;
                    const productName = productBox.querySelector('h3').textContent;
                    const productPrice = parseFloat(productBox.querySelector('.price').textContent.replace('$', ''));
                    const productImage = productBox.querySelector('.image img').src;
                    
                    const product = {
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage
                    };
                    
                    this.addToCart(product, 1);
                }
            }
        });
        
        // Checkout button
        const checkoutBtn = document.querySelector('.shopping-cart .btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', (e) => {
                if (this.cart.length === 0) {
                    e.preventDefault();
                    this.showNotification("Your cart is empty");
                } else {
                    window.location.href = 'cart.html';
                }
            });
        }
    }
    
    // Show notification to user
    showNotification(message) {
        // Check for existing notification
        let notification = document.querySelector('.cart-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('cart-notification');
            document.body.appendChild(notification);
        }
        
        // Set message and show notification
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide notification after a delay
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Export cart manager for use in other files
window.cartManager = cartManager;