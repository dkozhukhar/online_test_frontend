const API_URL = "https://fastapi-shop-pfuh.onrender.com";

async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();

    const container = document.getElementById("products");
    container.innerHTML = products.map(p => `
        <div>
            <h2>${p.name}</h2>
            <p>Price: $${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join("");
}

async function addToCart(productId) {
    await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: 1 })
    });

    alert("Added to cart!");
}

fetchProducts();
