
//Load existing products or empty array
let products = JSON.parse(localStorage.getItem("products")) || [];

const form = document.getElementById("productForm");
const list = document.getElementById("productList");

// Show products on page
function displayProducts() {
    list.innerHTML = "";
    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        list.appendChild(li);
    });
}

// When form is submitted
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    products.push({ name, price });

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
    form.reset();
});

// Load products on page load
displayProducts();
