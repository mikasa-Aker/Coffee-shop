// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Load cart from storage or start empty
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const cartLink = document.getElementById('cart-link');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout');

// Update cart display
function updateCart() {
    cartCount.textContent = cart.length;  // Update nav count
    if (cartItems) {  // Only update if on a page with cart list (e.g., menu/contact)
        cartItems.innerHTML = '';  // Clear list
        let total = 0;
        cart.forEach(item => {  // Loop through cart items
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
            total += parseFloat(item.price);  // Calculate total
        });
        cartTotal.textContent = total.toFixed(2);  // Format to 2 decimals
    }
    localStorage.setItem('cart', JSON.stringify(cart));  // Save to browser storage
}

// Initialize cart count on page load
updateCart();

// Add to cart (only on menu page)
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;  // Get item name from button
        const price = btn.dataset.price;  // Get price
        cart.push({ name, price });  // Add to cart array
        updateCart();  // Refresh display
        alert(`${name} added to cart!`);  // User feedback
    });
});

// Modal controls
if (cartLink) {
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent page jump
        cartModal.style.display = 'block';  // Show modal
        updateCart();  // Ensure latest cart
    });
}
if (closeModal) {
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';  // Hide modal
    });
}
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {  // Click outside to close
        cartModal.style.display = 'none';
    }
});

// Checkout (placeholder)
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality would integrate with a payment API like Stripe.');  // Placeholder
        cart = [];  // Clear cart
        updateCart();
        cartModal.style.display = 'none';
    });
}

// Contact form (only on contact page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Stop default form submit
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        if (name && email && message) {  // Basic validation
            alert('Thank you for your message!');  // Success feedback
            // In real app: Send to server with fetch()
        } else {
            alert('Please fill all fields.');  // Error feedback
        }
    });
}