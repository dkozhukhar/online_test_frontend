const API_URL = "https://fastapi-shop-pfuh.onrender.com";

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const products = await response.json();
        const container = document.getElementById("products");

        container.innerHTML = products.map(p => `
            <div>
                <h2>${p.name}</h2>
                <p>Price: $${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `).join("");
    } catch (error) {
        console.error("Failed to load products:", error);
        document.getElementById("products").innerHTML = `<p style="color:red;">Error loading products. Check console.</p>`;
    }
}

async function addToCart(productId) {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId, quantity: 1 })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        alert("Added to cart!");
    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart. Check console.");
    }
}

fetchProducts();
