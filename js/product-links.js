// Product links and category filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    // Select all eye icons for view product
    const viewButtons = document.querySelectorAll('.ri-eye-line');
    
    viewButtons.forEach((button) => {
        // Remove any existing click event listeners to prevent multiple bindings
        button.removeEventListener('click', handleProductView);
        button.addEventListener('click', handleProductView);
    });

// Select all cart icons for add to cart
const cartButtons = document.querySelectorAll('.products .box .icons .ri-shopping-cart-line');
    
cartButtons.forEach((button) => {
    // Skip if button is the cart icon in header
    if (button.id === 'cart-btn') return;
    
    button.addEventListener('click', handleAddToCart);
});
    // Handle view product details
    function handleProductView(event) {
        // Prevent default link behavior
        event.preventDefault();
        event.stopPropagation();
    
        // Find the closest parent box
        const productBox = event.target.closest('.box');
        
        if (!productBox) {
            console.error('No product box found');
            return;
        }
    
        // Get the product ID from the data attribute
        const productId = productBox.dataset.productId;
        
        if (!productId) {
            console.error('No product ID found');
            return;
        }
        
        console.log('Navigating to product:', productId);
    
        // Navigate to product detail page
        window.location.href = `product-detail.html?product=${productId}`;
    }

    // Handle add to cart
    function handleAddToCart(event) {
        // Prevent default link behavior
        event.preventDefault();
        event.stopPropagation();
    
        // Find the closest parent box
        const productBox = event.target.closest('.box');
        
        if (!productBox) {
            console.error('No product box found');
            return;
        }
    
        // Get the product details
        const productId = productBox.dataset.productId;
        const productName = productBox.querySelector('.content h3').textContent;
        const productPrice = parseFloat(productBox.querySelector('.content .price').textContent.replace('$', ''));
        const productImage = productBox.querySelector('.image img').src;
        
        if (!productId || !productName || isNaN(productPrice)) {
            console.error('Invalid product data');
            return;
        }
        
        // Create product object
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        };
        
        console.log('Adding to cart:', product);
        
        // Add to cart using cart manager if available
        if (window.cartManager) {
            window.cartManager.addToCart(product, 1);
        } else {
            // Fallback to alert if cart manager not loaded
            alert(`Added ${productName} to cart`);
        }
    }

    // Category filtering functionality
    const categoryBoxes = document.querySelectorAll('.category .box-container .box');
    const productBoxes = document.querySelectorAll('.products .box-container .box');

    categoryBoxes.forEach(categoryBox => {
        categoryBox.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get the category text (sofa or chair)
            const categoryText = this.querySelector('h3').textContent.toLowerCase();

            // Filter products
            productBoxes.forEach(productBox => {
                const productName = productBox.querySelector('.content h3').textContent.toLowerCase();
                const categoryLowerText = categoryText.toLowerCase().replace('house ', '').trim();
                
                // More flexible matching
                const isMatch = productName.includes(categoryLowerText);
                
                // Show/hide products based on category
                if (isMatch) {
                    productBox.style.display = 'block';
                } else {
                    productBox.style.display = 'none';
                }
            });

            // Optional: Highlight selected category
            categoryBoxes.forEach(box => box.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add "Show All" functionality to reset filtering
    const showAllLink = document.querySelector('.products .title a');
    if (showAllLink) {
        showAllLink.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Show all products
            productBoxes.forEach(productBox => {
                productBox.style.display = 'block';
            });

            // Remove category highlights
            categoryBoxes.forEach(box => box.classList.remove('active'));
        });
    }
});