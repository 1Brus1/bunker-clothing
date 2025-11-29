// PRODUCT DATA
const products = [
    { id: 1, name: "Bunker Hoodie", price: 65, img: "https://images.unsplash.com/photo-1600185365483-26d7a4f8d5c2" },
    { id: 2, name: "Urban Tee", price: 30, img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357" },
    { id: 3, name: "Comfy Joggers", price: 55, img: "https://images.unsplash.com/photo-1617137968427-85924d2e3d43" },
];

// RENDER PRODUCTS
const productList = document.getElementById("product-list");
products.forEach(p => {
    productList.innerHTML += `
        <div class="product-box">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})" class="btn">Add to Cart</button>
        </div>
    `;
});

// CART LOGIC
let cart = [];
const modal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

cartBtn.onclick = () => modal.style.display = "flex";
closeCart.onclick = () => modal.style.display = "none";

function addToCart(id) {
    let item = products.find(p => p.id === id);
    let exists = cart.find(c => c.id === id);

    if (exists) exists.qty++;
    else cart.push({ ...item, qty: 1 });

    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(c => {
        total += c.qty * c.price;
        cartItems.innerHTML += `
            <p>${c.name} x${c.qty} - $${c.qty * c.price}</p>
        `;
    });

    totalPrice.innerText = `Total: $${total}`;
}
