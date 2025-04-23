// Product details data
const productData = {
    'spoon-chair': {
        id: 'spoon-chair',
        name: 'Spoon Design Chair',
        price: 140.00,
        image: 'image/product-1.png', // Update this path to your spoon chair image
        category: 'chair',
        description: 'A minimalist chair inspired by spoon design. Perfect for modern homes and creative spaces.',
        rating: 5
    },
    'bunny-sofa': {
        id: 'bunny-sofa',
        name: 'Bunny Cushion Sofa',
        price: 140.00,
        image: 'image/product-2.png', // Update with bunny sofa image
        category: 'sofa',
        description: 'A cute and comfortable bunny-shaped cushion sofa, ideal for children\'s rooms and playful spaces.',
        rating: 5
    },
    'coconut-sofa': {
        id: 'coconut-sofa',
        name: 'Coconut Cushion Sofa',
        price: 140.00,
        image: 'image/product-3.png', // Update with coconut sofa image
        category: 'sofa',
        description: 'A natural-inspired coconut design sofa with white cushions, bringing a tropical feel to your living space.',
        rating: 5
    },
    'modern-chair': {
        id: 'modern-chair',
        name: 'Modern Wooden Chair',
        price: 140.00,
        image: 'image/product-4.png', // Update with modern chair image
        category: 'chair',
        description: 'A sleek modern chair with wooden frame. Elegant design meets comfort in this contemporary piece.',
        rating: 5
    },
    'bear-sofa': {
        id: 'bear-sofa',
        name: 'Bear Cushion Sofa',
        price: 140.00, 
        image: 'image/product-5.png', // Update with bear sofa image
        category: 'sofa',
        description: 'A cozy bear-shaped cushion sofa that adds character and warmth to any room. Perfect for children and the young at heart.',
        rating: 5
    },
    'rainbow-chair': {
        id: 'rainbow-chair',
        name: 'Rainbow Rocking Chair',
        price: 140.00,
        image: 'image/product-6.png', // Update with rainbow chair image
        category: 'chair',
        description: 'A playful rainbow-themed rocking chair. Combines comfort with fun design for nurseries and playrooms.',
        rating: 5
    },
    't-handle-chair': {
        id: 't-handle-chair',
        name: 'T-Handle Chair',
        price: 140.00,
        image: 'image/product-7.png', // Update with T-handle chair image
        category: 'chair',
        description: 'A unique chair with distinctive T-shaped handle. Combines functionality with elegant design.',
        rating: 5
    },
    'pouf-chair': {
        id: 'pouf-chair',
        name: 'Modern Pouf Chair',
        price: 140.00,
        image: 'image/product-8.png', // Update with pouf chair image
        category: 'chair',
        description: 'A contemporary pouf chair with soft cushioning. Minimal design with maximum comfort for modern spaces.',
        rating: 5
    }
};

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
        
        // Use new cart manager if available
        if (window.cartManager) {
            window.cartManager.addToCart(product, quantity);
        } else {
            // Fallback to alert if cart manager not loaded
            alert(`Added ${quantity} ${product.name}(s) to cart`);
        }
    });

    // Add to wishlist functionality (placeholder)
    document.getElementById('add-to-wishlist').addEventListener('click', () => {
        alert(`Added ${product.name} to wishlist`);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Populate product details
    populateProductDetails();
});