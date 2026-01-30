    document.addEventListener("DOMContentLoaded", () => {

    // ===== FILTER (HARDCODED ITEMS) =====
    const filterButtons = document.querySelectorAll(".filter-btn");
    const hardcodedItems = document.querySelectorAll(".menu-items"); // all cards

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.category;

        hardcodedItems.forEach(item => {
            const category = item.dataset.category;
            item.style.display = (filter === "all" || category === filter) ? "block" : "none";
        });
        });
    });

    // ===== CART =====
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartModal = document.getElementById("cart-modal");
    const cartLink = document.getElementById("cart-link");
    const closeModal = document.querySelector(".close");
    const checkoutBtn = document.getElementById("checkout");

    function attachCartButtons() {
        document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);

            const existingItem = cart.find(i => i.name === name);
            if (existingItem) existingItem.quantity++;
            else cart.push({ name, price, quantity: 1 });

            updateCart();
        });
        });
    }

    function updateCart() {
        if (!cartCount || !cartItems || !cartTotal) return;

        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItems.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty ☕</p>";
        cartTotal.textContent = "0.00";
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
        }

        cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const li = document.createElement("li");
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
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItems?.addEventListener("click", e => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("qty-btn")) {
        const action = e.target.dataset.action;
        if (action === "increment") cart[index].quantity++;
        if (action === "decrement" && cart[index].quantity > 1) cart[index].quantity--;
        updateCart();
        }

        if (e.target.classList.contains("remove-btn")) {
        cart.splice(index, 1);
        updateCart();
        }
    });

    cartLink?.addEventListener("click", e => {
        e.preventDefault();
        cartModal.style.display = "block";
        updateCart();
    });

    closeModal?.addEventListener("click", () => cartModal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === cartModal) cartModal.style.display = "none"; });

    checkoutBtn?.addEventListener("click", () => {
        cart = [];
        updateCart();
        cartModal.style.display = "none";
    });

    // attach listeners to existing hardcoded buttons
    attachCartButtons();
    updateCart();
    });
