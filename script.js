// --- 1. PRODUCT ENGINE ACCELERATOR (DATA LAYER) ---
const products = [
    { id: 1, name: "Pro Wireless Headphones", price: 299, desc: "Studio-grade sound isolation with a 40-hour dynamic battery life.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { id: 2, name: "Mechanical Gaming Keyboard", price: 149, desc: "Tactile switches with vibrant, customizable per-key RGB backlighting parameters.", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80" },
    { id: 3, name: "UltraWide 4K Monitor", price: 599, desc: "Immersive panoramic workspace display with HDR400 color precision matrix coloring.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" },
    { id: 4, name: "Ergonomic Wireless Mouse", price: 89, desc: "Precision tracking tracking optical sensors with dynamic macro thumb controls.", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80" },
    { id: 5, name: "4K Pro Streaming Webcam", price: 199, desc: "High-fidelity, automated auto-focus optimization arrays tailored for digital streamers.", image: "https://images.unsplash.com/photo-1612436300185-304671fc0f06?w=500&q=80" },
    { id: 6, name: "Studio Condenser Microphone", price: 249, desc: "Professional cardioid polar pickup arrays containing internal pop filters.", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80" }
];

// --- 2. INTERACTIVE LIVE SHOPPING CART STATE ---
let cart = JSON.parse(localStorage.getItem('store_cart')) || [];

function toggleCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer.style.right === '0px') {
        drawer.style.right = '-400px';
    } else {
        drawer.style.right = '0px';
        renderCartDrawer();
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartState();
    // Provide visual feedback by automatically opening the cart
    const drawer = document.getElementById('cart-drawer');
    drawer.style.right = '0px';
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    updateCartState();
}

function updateCartState() {
    localStorage.setItem('store_cart', JSON.stringify(cart));
    
    // Calculate global cart badge counts
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;
    
    renderCartDrawer();
}

function renderCartDrawer() {
    const container = document.getElementById('cart-drawer-items');
    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #64748b; text-align: center; margin-top: 2rem;">Your cart is empty.</p>';
        document.getElementById('cart-total').innerText = '$0.00';
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem;">
                <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 0.9rem; color: #1e293b;">${item.name}</h4>
                    <p style="margin: 0; font-size: 0.8rem; color: #64748b;">$${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer;">✕</button>
            </div>
        `;
    }).join('');
    
    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}

function triggerSimulatedCheckout() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }
    alert("🔒 Checkout Processing Hub Initialized Successfully!\n\nIn an production system, this connects directly to secure payment protocols (e.g. Stripe API gateway setup) to securely transition your balance sheets.");
    cart = [];
    updateCartState();
    toggleCartDrawer();
}

// --- 3. MODULAR VIEWS AND CLIENT ROUTING ---
function renderProductGridView() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2 style="font-size: 1.75rem; color: #1e293b; margin-bottom: 1.5rem; text-align: center;">Premium Hardware Catalog</h2>
        <div class="product-grid">
            ${products.map(p => `
                <div class="product-card">
                    <img src="${p.image}" alt="${p.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-price">$${p.price}</p>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                            <button onclick="window.location.hash = 'product/${p.id}'" class="btn btn-secondary" style="width: 100%;">View Specifications</button>
                            <button onclick="addToCart(${p.id})" style="width: 100%; background: #2563eb; color: white; border: none; padding: 0.5rem; border-radius: 6px; font-weight: 600; cursor: pointer;">Add to Cart 🛒</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderProductDetailView(id) {
    const product = products.find(p => p.id == id);
    const app = document.getElementById('app');
    
    if (!product) {
        app.innerHTML = `<div class="error-container"><h3>Product Variant Specified Does Not Exist</h3><button onclick="window.location.hash = ''" class="btn">Return to Grid Dashboard</button></div>`;
        return;
    }
    
    app.innerHTML = `
        <button onclick="window.location.hash = ''" class="btn btn-secondary" style="margin-bottom: 1.5rem;">← Back to Main Grid Catalog</button>
        <div class="detail-container">
            <div class="image-container" style="height: 100%; min-height: 300px; display: flex; align-items: center; justify-content: center;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 350px; object-fit: cover; border-radius: 8px;">
            </div>
            <div class="detail-info">
                <h2 class="detail-title">${product.name}</h2>
                <p class="detail-price">$${product.price}</p>
                <p class="detail-desc">${product.desc}</p>
                
                <div style="margin: 1.5rem 0; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <span style="background: #e2e8f0; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 500; color: #475569;">🛡️ 2-Year Warranty</span>
                    <span style="background: #e0f2fe; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 500; color: #0369a1;">🚚 Free Express Shipping</span>
                    <span style="background: #fef3c7; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 500; color: #92400e;">⭐ Top Rated Asset</span>
                </div>

                <button onclick="addToCart(${product.id})" style="background: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem;">
                    Add to Shopping Cart 🛒
                </button>
            </div>
        </div>
    `;
}

// --- 4. APP INITIALIZATION CONTROLLER ROUTER ---
function appRouter() {
    const hash = window.location.hash;
    if (hash.startsWith('#product/')) {
        const id = hash.split('/')[1];
        renderProductDetailView(id);
    } else {
        renderProductGridView();
    }
}

window.addEventListener('hashchange', appRouter);
window.addEventListener('DOMContentLoaded', () => {
    appRouter();
    updateCartState(); // Boot up existing cart state configurations
});
