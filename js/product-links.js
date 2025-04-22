// Product links functionality
document.addEventListener('DOMContentLoaded', () => {
    // Select all eye icons
    const viewButtons = document.querySelectorAll('.ri-eye-line');
    
    viewButtons.forEach((button) => {
        // Remove any existing click event listeners to prevent multiple bindings
        button.removeEventListener('click', handleProductView);
        button.addEventListener('click', handleProductView);
    });

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

        // Find the product name in the h3 element within the product box
        const productNameEl = productBox.querySelector('.content h3');
        
        if (!productNameEl) {
            console.error('No product name found');
            return;
        }

        // Convert product name to URL-friendly format
        const productName = productNameEl.textContent.toLowerCase().replace(/\s+/g, '-');
        
        console.log('Navigating to product:', productName);

        // Navigate to product detail page
        window.location.href = `product-detail.html?product=${productName}`;
    }
});