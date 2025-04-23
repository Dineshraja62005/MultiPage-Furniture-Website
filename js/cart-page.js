// cart-page.js - Handles cart page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if cartManager exists (loaded from cart.js)
    if (!window.cartManager) {
        console.error('Cart manager not found');
        return;
    }
    
    // References to DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart');
    
    // Render cart items
    function renderCartItems() {
        const cart = window.cartManager.cart;
        
        // Clear container
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            // Show empty cart message
            emptyCartMessage.style.display = 'flex';
            checkoutBtn.classList.add('disabled');
            updateCartSummary(0);
            return;
        }
        
        // Hide empty cart message
        emptyCartMessage.style.display = 'none';
        checkoutBtn.classList.remove('disabled');
        
        // Create table for cart items
        const cartTable = document.createElement('table');
        cartTable.classList.add('cart-table');
        
        // Create table header
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr>
                <th class="product-col">Product</th>
                <th class="price-col">Price</th>
                <th class="quantity-col">Quantity</th>
                <th class="total-col">Total</th>
                <th class="action-col"></th>
            </tr>
        `;
        cartTable.appendChild(tableHeader);
        
        // Create table body
        const tableBody = document.createElement('tbody');
        
        // Add cart items to table
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const row = document.createElement('tr');
            row.dataset.productId = item.id;
            
            row.innerHTML = `
                <td class="product-col">
                    <div class="product-info">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h4>${item.name}</h4>
                        </div>
                    </div>
                </td>
                <td class="price-col">$${item.price.toFixed(2)}</td>
                <td class="quantity-col">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="quantity-btn increase">+</button>
                    </div>
                </td>
                <td class="total-col">$${itemTotal.toFixed(2)}</td>
                <td class="action-col">
                    <button class="remove-item"><i class="ri-delete-bin-line"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        cartTable.appendChild(tableBody);
        cartItemsContainer.appendChild(cartTable);
        
        // Calculate and update cart summary
        updateCartSummary(subtotal);
        
        // Add event listeners to quantity buttons and remove buttons
        setupCartItemControls();
    }
    
    // Update cart summary (subtotal, shipping, total)
    function updateCartSummary(subtotal) {
        // Display subtotal
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        
        // Calculate shipping (free over $100, otherwise $10)
        const shippingCost = subtotal > 100 ? 0 : 10;
        cartShipping.textContent = shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`;
        
        // Calculate total
        const total = subtotal + shippingCost;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Setup event listeners for cart item controls
    function setupCartItemControls() {
        // Quantity decrease buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.dataset.productId;
                const quantityInput = row.querySelector('.quantity-input');
                const currentQuantity = parseInt(quantityInput.value);
                
                if (currentQuantity > 1) {
                    // Update quantity in UI
                    quantityInput.value = currentQuantity - 1;
                    
                    // Update cart
                    window.cartManager.updateQuantity(productId, currentQuantity - 1);
                    
                    // Re-render cart items
                    renderCartItems();
                }
            });
        });
        
        // Quantity increase buttons
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.dataset.productId;
                const quantityInput = row.querySelector('.quantity-input');
                const currentQuantity = parseInt(quantityInput.value);
                
                // Update quantity in UI
                quantityInput.value = currentQuantity + 1;
                
                // Update cart
                window.cartManager.updateQuantity(productId, currentQuantity + 1);
                
                // Re-render cart items
                renderCartItems();
            });
        });
        
        // Quantity input changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const row = this.closest('tr');
                const productId = row.dataset.productId;
                let newQuantity = parseInt(this.value);
                
                // Ensure quantity is at least 1
                if (newQuantity < 1 || isNaN(newQuantity)) {
                    newQuantity = 1;
                    this.value = 1;
                }
                
                // Update cart
                window.cartManager.updateQuantity(productId, newQuantity);
                
                // Re-render cart items
                renderCartItems();
            });
        });
        
        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.dataset.productId;
                
                // Remove item from cart
                window.cartManager.removeFromCart(productId);
                
                // Re-render cart items
                renderCartItems();
            });
        });
    }
    
    // Clear cart button
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                window.cartManager.clearCart();
                renderCartItems();
            }
        });
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            if (window.cartManager.cart.length === 0) {
                e.preventDefault();
                alert('Your cart is empty');
            }
            // Otherwise proceed to checkout page
        });
    }
    
    // Initial render
    renderCartItems();
});