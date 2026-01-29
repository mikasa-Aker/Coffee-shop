/* =====================
    DEFAULT PRODUCTS
===================== */
const defaultProducts = [
    { name: "Espresso", price: 3.50, image: "C:\Users\arshi\Documents\GitHub CLASS\Coffee-shop\photos\how-to-make-espresso.jpg", category: "hot" },
    { name: "Latte", price: 4.00, image: "photos/latte.jpg", category: "hot" },
    { name: "Cappuccino", price: 4.25, image: "photos/SH_cappuccino.jpg", category: "hot" },
    { name: "Americano", price: 3.75, image: "photos/What-Is-An-Americano-1024x683.jpg", category: "hot" },
    { name: "Mocha", price: 4.75, image: "photos/moch.jpg", category: "hot" },
    { name: "Iced Coffee", price: 4.00, image: "photos/icedcoffee.jpg", category: "cold" },
    { name: "Cold Brew", price: 4.50, image: "photos/cold brew.jpg", category: "cold" },
    { name: "Croissant", price: 3.25, image: "photos/crisson.jpg", category: "food" },
    { name: "Blueberry Muffin", price: 3.75, image: "photos/Blueberry-Muffins-1-of-1.jpg", category: "food" }
];
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;
        displayMenu(category);
    });
});

/* =====================
    LOAD PRODUCTS
===================== */
let products = JSON.parse(localStorage.getItem("products")) || [];
if (products.length === 0) {
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
}

/* =====================
    CART
===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =====================
    ELEMENTS
===================== */
const menuContainer = document.getElementById("menu-items");
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const cartLink = document.getElementById('cart-link');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout');
const filterButtons = document.querySelectorAll('.filter-btn');

/* =====================
    DISPLAY MENU
===================== */
function displayMenu(filter = "all") {
    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    const filteredProducts = filter === "all" 
        ? products 
        : products.filter(p => p.category === filter);

    if (filteredProducts.length === 0) {
        menuContainer.innerHTML = "<p>No items in this category ☕</p>";
        return;
    }

    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.className = "menu-Item";

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart"
                data-name="${product.name}"
                data-price="${product.price}">
                Add to Cart
            </button>
        `;

        menuContainer.appendChild(div);
    });

    attachCartButtons();
}

/* =====================
    ATTACH CART BUTTONS
===================== */
function attachCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
            showToast(`${name} added to cart`);
        });
    });
}

/* =====================
    UPDATE CART
===================== */
function updateCart() {
    if (!cartCount || !cartItems || !cartTotal) return;

    // Total items
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // List items
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty ☕</p>";
        cartTotal.textContent = "0.00";
        localStorage.setItem('cart', JSON.stringify(cart));
        return;
    }

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
                <span class="subtotal">$${subtotal.toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

/* =====================
    CART ACTIONS
===================== */
if (cartItems) {
    cartItems.addEventListener('click', e => {
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

/* =====================
    CART MODAL
===================== */
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

/* =====================
    CHECKOUT
===================== */
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality would integrate with Stripe.');
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });
}

/* =====================
    FILTER BUTTONS
===================== */
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayMenu(btn.dataset.category);
    });
});

/* =====================
    TOAST FUNCTION
===================== */
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
}

/* =====================
    NAV TOGGLE FOR MOBILE
===================== */
document.addEventListener("DOMContentLoaded", () => {
    displayMenu(); // Display products immediately

    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');
    const navItems = document.querySelectorAll('nav ul li a');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => navLinks.classList.toggle('show'));
    }

    navItems.forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('show'));
    });

    // Initial cart update
    updateCart();
});
