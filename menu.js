// Load products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

const menuContainer = document.getElementById("menuItems");

function displayMenu(filter = "all") {
    menuContainer.innerHTML = "";

    let filteredProducts = products;

    if (filter !== "all") {
        filteredProducts = products.filter(p => p.category === filter);
    }

    if (filteredProducts.length === 0) {
        menuContainer.innerHTML = "<p>No items in this category ☕</p>";
        return;
    }

    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.className = "menu-item";

        div.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/300'}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button 
                class="add-to-cart"
                data-name="${product.name}"
                data-price="${product.price}">
                Add to Cart
            </button>
        `;

        menuContainer.appendChild(div);
    });

    attachCartButtons();
}

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

displayMenu();
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        displayMenu(btn.dataset.category);
    });
});
