let closer = document.querySelector('#closer');

closer.onclick = () => {
    closer.style.display = 'none';
    navbar.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    closer.style.display = "block";
    navbar.classList.toggle('active');
}

let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
    closer.style.display = "block";
    cart.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    closer.style.display = "block";
    loginForm.classList.toggle('active');
}

let searchForm = document.querySelector('.header .search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

// Search functionality for products
document.addEventListener('DOMContentLoaded', () => {
    // Get the search input and all product boxes
    const searchBox = document.getElementById('search-box');
    const productBoxes = document.querySelectorAll('.products .box-container .box');

    // Add event listener for input
    searchBox.addEventListener('input', function() {
        // Get the search term and convert to lowercase
        const searchTerm = this.value.toLowerCase().trim();

        // Loop through each product box
        productBoxes.forEach(box => {
            // Find the product name in the box
            const productName = box.querySelector('h3').textContent.toLowerCase();
            
            // Show or hide based on search match
            if (productName.includes(searchTerm)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});