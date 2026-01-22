// 🔥 One-time product reset (NO console needed)
if (!localStorage.getItem("products_v2")) {
    localStorage.removeItem("products"); // delete old broken data
    localStorage.setItem("products_v2", "true"); // mark as done
}


const ADMIN_PASSWORD = "coffee123";

// Ask password FIRST
const enteredPassword = prompt("Enter Admin Password:");
if (enteredPassword !== ADMIN_PASSWORD) {
    alert("Access denied");
    window.location.href = "index.html";
}

// Load products
let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

// Connect HTML elements
const form = document.getElementById("productForm");
const list = document.getElementById("productList");

// Show products
function displayProducts() {
    list.innerHTML = "";

    products.forEach((product, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
    <img src="${product.image || 'https://via.placeholder.com/60'}">

    <span class="product-text">
        <strong>${product.name}</strong><br>
        $${product.price} — ${product.category || "no category"}
    </span>

    <button onclick="editProduct(${index})">Edit</button>
    <button onclick="deleteProduct(${index})">Remove</button>
`;

        list.appendChild(li);
    });
}

// Edit product
function editProduct(index) {
    const product = products[index];

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("image").value = product.image || "";
    document.getElementById("category").value = product.category || "";

    editIndex = index;
    document.getElementById("submitBtn").textContent = "Update Product";
}

// Delete product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

// Submit form (ADD + UPDATE)
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value.toLowerCase();

    if (!category) {
        alert("Please select a category");
        return;
    }

    if (editIndex !== null) {
        products[editIndex] = { name, price, image, category };
        editIndex = null;
        document.getElementById("submitBtn").textContent = "Add Product";
    } else {
        products.push({ name, price, image, category });
    }

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    form.reset();
});

// Load on start
displayProducts();
