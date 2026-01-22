const ADMIN_PASSWORD = "coffee123"; // you can change this

// Load existing products or empty array
let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;


// Connect HTML elements
const form = document.getElementById("productForm");
const list = document.getElementById("productList");
const enteredPassword = prompt("Enter Admin Password:");
const category = document.getElementById("category").value;

if (enteredPassword !== ADMIN_PASSWORD) {
    alert("Access denied");
    window.location.href = "index.html"; // send user away
}

// Show products in admin panel
function displayProducts() {
    list.innerHTML = "";

    products.forEach((product, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/60'}" 
                width="60" style="vertical-align:middle;">
            ${product.name} - $${product.price}
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Remove</button>
        `;

        list.appendChild(li);
    });
}
function editProduct(index) {
    const product = products[index];

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("image").value = product.image || "";
    document.getElementById("category").value = product.category;

    editIndex = index;

    document.getElementById("submitBtn").textContent = "Update Product";
}

// Delete product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

// When form is submitted
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    if (editIndex !== null) {
        // UPDATE existing product
        products[editIndex] = { name, price, image,category };
        editIndex = null;
        document.getElementById("submitBtn").textContent = "Add Product";
    } else {
        // ADD new product
        products.push({ name, price, image });
    }

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    form.reset();
});


// Load products on page load
displayProducts();
