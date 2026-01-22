// Load products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

const menuContainer = document.getElementById("menuItems");

function displayMenu() {
    menuContainer.innerHTML = "";

    if (products.length === 0) {
        menuContainer.innerHTML = "<p>No menu items yet</p>";
        return;
    }

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "menu-item";

        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button>Add to Cart</button>
        `;

        menuContainer.appendChild(div);
    });
}

// Run when page loads
displayMenu();
