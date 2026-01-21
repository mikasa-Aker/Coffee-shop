let cart = JSON.parse(localStorage.getItem('cart')) || [];

cart = cart.map(item => ({
    name: item.name,
    price: Number(item.price),
    quantity: item.quantity ? Number(item.quantity) : 1
}));

const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const cartLink = document.getElementById('cart-link');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout');

function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (!cartItems) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>

                <div class="quantity-controls">
                    <button class="qty-btn" data-action="decrement" data-index="${index}">-</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="qty-btn" data-action="increment" data-index="${index}">+</button>
                </div>

                <span class="item-price">$${item.price.toFixed(2)} each</span>
                <span class="subtotal">Subtotal: $${subtotal.toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

updateCart();

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
        alert(`${name} added to cart!`);
    });
});

if (cartItems) {
    cartItems.addEventListener('click', (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains('qty-btn')) {
            const action = e.target.dataset.action;

            if (action === 'increment') cart[index].quantity++;
            if (action === 'decrement' && cart[index].quantity > 1) cart[index].quantity--;

            updateCart();
        }

        if (e.target.classList.contains('remove-btn')) {
            cart.splice(index, 1);
            updateCart();
        }
    });
}

if (cartLink) {
    cartLink.addEventListener('click', e => {
        e.preventDefault();
        cartModal.style.display = 'block';
        updateCart();
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

window.addEventListener('click', e => {
    if (e.target === cartModal) cartModal.style.display = 'none';
});

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality would integrate with Stripe.');
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });
}
