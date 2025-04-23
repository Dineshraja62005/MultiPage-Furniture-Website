// Product details data
const productData = {
    'spoon-chair': {
        name: 'Spoon Design Chair',
        price: 140.00,
        image: 'image/product-1.png', // Update this path to your spoon chair image
        category: 'chair',
        description: 'A minimalist chair inspired by spoon design. Perfect for modern homes and creative spaces.',
        rating: 5
    },
    'bunny-sofa': {
        name: 'Bunny Cushion Sofa',
        price: 140.00,
        image: 'image/product-2.png', // Update with bunny sofa image
        category: 'sofa',
        description: 'A cute and comfortable bunny-shaped cushion sofa, ideal for children\'s rooms and playful spaces.',
        rating: 5
    },
    'coconut-sofa': {
        name: 'Coconut Cushion Sofa',
        price: 140.00,
        image: 'image/product-3.png', // Update with coconut sofa image
        category: 'sofa',
        description: 'A natural-inspired coconut design sofa with white cushions, bringing a tropical feel to your living space.',
        rating: 5
    },
    'modern-chair': {
        name: 'Modern Wooden Chair',
        price: 140.00,
        image: 'image/product-4.png', // Update with modern chair image
        category: 'chair',
        description: 'A sleek modern chair with wooden frame. Elegant design meets comfort in this contemporary piece.',
        rating: 5
    },
    'bear-sofa': {
        name: 'Bear Cushion Sofa',
        price: 140.00, 
        image: 'image/product-5.png', // Update with bear sofa image
        category: 'sofa',
        description: 'A cozy bear-shaped cushion sofa that adds character and warmth to any room. Perfect for children and the young at heart.',
        rating: 5
    },
    'rainbow-chair': {
        name: 'Rainbow Rocking Chair',
        price: 140.00,
        image: 'image/product-6.png', // Update with rainbow chair image
        category: 'chair',
        description: 'A playful rainbow-themed rocking chair. Combines comfort with fun design for nurseries and playrooms.',
        rating: 5
    },
    't-handle-chair': {
        name: 'T-Handle Chair',
        price: 140.00,
        image: 'image/product-7.png', // Update with T-handle chair image
        category: 'chair',
        description: 'A unique chair with distinctive T-shaped handle. Combines functionality with elegant design.',
        rating: 5
    },
    'pouf-chair': {
        name: 'Modern Pouf Chair',
        price: 140.00,
        image: 'image/product-8.png', // Update with pouf chair image
        category: 'chair',
        description: 'A contemporary pouf chair with soft cushioning. Minimal design with maximum comfort for modern spaces.',
        rating: 5
    }
};

// Cart management
class CartManager {
    constructor() {
        // Initialize cart from localStorage or as empty array
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }

    // Add item to cart
    addToCart(product, quantity) {
        // Check if product already exists in cart
        const existingProductIndex = this.cart.findIndex(
            item => item.name === product.name
        );

        if (existingProductIndex > -1) {
            // If product exists, update quantity
            this.cart[existingProductIndex].quantity += quantity;
        } else {
            // If product is new, add to cart
            this.cart.push({
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
    }

    // Remove item from cart
    removeFromCart(productName) {
        this.cart = this.cart.filter(item => item.name !== productName);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Update cart display in the shopping cart section
    updateCartDisplay() {
        const cartContainer = document.querySelector('.shopping-cart');
        const cartTotalSpan = cartContainer.querySelector('.total span');
        const cartBoxContainer = cartContainer.querySelector('.box-container');

        // Clear existing cart items
        cartBoxContainer.innerHTML = '';

        // Calculate total
        let total = 0;

        // Populate cart items
        this.cart.forEach(item => {
            const cartBox = document.createElement('div');
            cartBox.classList.add('box');
            
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartBox.innerHTML = `
                <i class="ri-close-line close-icon" data-name="${item.name}"></i>
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="quantity">${item.quantity}</span>
                    <span class="multiply">x</span>
                    <span class="price">$${item.price.toFixed(2)}</span>
                </div>
            `;

            cartBoxContainer.appendChild(cartBox);
        });

        // Update total
        cartTotalSpan.textContent = `$${total.toFixed(2)}`;

        // Add event listeners to close icons
        cartBoxContainer.querySelectorAll('.close-icon').forEach(closeIcon => {
            closeIcon.addEventListener('click', (e) => {
                const productName = e.target.dataset.name;
                this.removeFromCart(productName);
            });
        });
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].toLowerCase());
}

// Function to populate product details
function populateProductDetails() {
    const productType = getUrlParameter('product');
    const product = productData[productType];

    if (!product) {
        alert('Product not found');
        window.location.href = 'shop.html';
        return;
    }

    // Update page elements
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-description').textContent = product.description;
    
    // Handle rating
    const ratingContainer = document.getElementById('product-stars');
    const ratingCountSpan = document.getElementById('rating-count');
    ratingCountSpan.textContent = `(50)`;

    // Handle quantity controls
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');

    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Add to cart functionality
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        
        // Add to cart
        cartManager.addToCart(product, quantity);

        // Show success message
        alert(`Added ${quantity} ${product.name}(s) to cart`);
    });

    // Add to wishlist functionality (placeholder)
    document.getElementById('add-to-wishlist').addEventListener('click', () => {
        alert(`Added ${product.name} to wishlist`);
    });
}

// Initial cart display on page load
document.addEventListener('DOMContentLoaded', () => {
    // Populate product details
    populateProductDetails();

    // Initialize cart display
    cartManager.updateCartDisplay();
});