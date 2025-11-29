/* ------------------------------------------
   BUNKER CLOTHING – FULL WEBSITE JS FILE
------------------------------------------- */

/* -----------------------------
   MOBILE NAVIGATION
------------------------------ */
const mobileToggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

/* -----------------------------------
   SMOOTH SCROLL FOR MENU LINKS
------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute("href"));
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});

/* -----------------------------------
   PRODUCT LIST (ADD YOUR PRODUCTS HERE)
------------------------------------ */
const products = [
    {
        id: 1,
        name: "Bunker Hoodie",
        price: 65,
        img: "images/hoodie.png"
    },
    {
        id: 2,
        name: "Bunker T-Shirt",
        price: 30,
        img: "images/tshirt.png"
    },
    {
        id: 3,
        name: "Bunker Joggers",
        price: 55,
        img: "images/joggers.png"
    },
    {
        id: 4,
        name: "Bunker Cap",
        price: 25,
        img: "images/cap.png"
    }
];

/* -----------------------------------
   RENDER PRODUCTS TO SHOP SECTION
------------------------------------ */
const productList = document.getElementById("product-list");

if (productList) {
    products.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("product");

        item.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="add-btn" data-id="${p.id}">Add to Cart</button>
        `;

        productList.appendChild(item);
    });
}

/* -----------------------------------
   CART SYSTEM WITH LOCAL STORAGE
------------------------------------ */
let cart = JSON.parse(localStorage.getItem("bunkerCart")) || [];

function saveCart() {
    localStorage.setItem("bunkerCart", JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-row";

        row.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <span>$${(item.qty * item.price).toFixed(2)}</span>
        `;

        row.addEventListener("click", () => {
            if (item.qty > 1) {
                item.qty--;
            } else {
                cart = cart.filter(i => i.id !== item.id);
            }
            saveCart();
            updateCartDisplay();
        });

        cartItems.appendChild(row);
        total += item.qty * item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

/* -----------------------------------
   ADD TO CART ACTION
------------------------------------ */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
        const id = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === id);

        const existing = cart.find(i => i.id === id);

        if (existing) {
            existing.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        saveCart();
        updateCartDisplay();
    }
});

/* -----------------------------------
   CART MODAL CONTROL
------------------------------------ */
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

if (cartIcon && cartModal) {
    cartIcon.addEventListener("click", () => {
        cartModal.classList.add("open");
        updateCartDisplay();
    });
}

if (closeCart) {
    closeCart.addEventListener("click", () => {
        cartModal.classList.remove("open");
    });
}

window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove("open");
    }
});

/* -----------------------------------
   CHECKOUT BUTTON
------------------------------------ */
const checkoutBtn = document.getElementById("checkout");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        alert("Checkout system coming soon!");
    });
}

/* -----------------------------------
   LOGO FADE-IN ANIMATION
------------------------------------ */
const logo = document.querySelector(".main-logo");

if (logo) {
    window.addEventListener("load", () => {
        logo.classList.add("show");
    });
}