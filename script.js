// --- PRODUCT DATABASE MATRICES (State Core) ---
const products = [
    { id: 1, name: "Pro Wireless Headphones", price: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", desc: "Studio-grade sound isolation with a 40-hour dynamic battery life." },
    { id: 2, name: "Mechanical Gaming Keyboard", price: 149, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", desc: "Ultra-responsive tactile switches featuring customizable per-key RGB backlighting." },
    { id: 3, name: "UltraWide Curved Monitor", price: 599, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", desc: "Immersive 34-inch panoramic screen featuring a rapid 144Hz refresh rate." },
    { id: 4, name: "Ergonomic Wireless Mouse", price: 89, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80", desc: "High-precision 26K DPI optical sensor designed for all-day comfort." },
    { id: 5, name: "4K Pro Streaming Webcam", price: 199, image: "https://images.unsplash.com/photo-1603162586341-a021508a446a?w=500&q=80", desc: "Crystal clear Ultra HD video capture with integrated dual noise-canceling mics." },
    { id: 6, name: "Studio Condenser Microphone", price: 249, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80", desc: "Professional cardoid recording patterns perfect for streaming and podcasting." }
];
// --- APP ROUTING COMPONENT ENGINE ---
const appRoot = document.getElementById('app-root');

function router() {
    const hash = window.location.hash;
    
    // Router Routing Parameter Evaluator Loop
    if (!hash || hash === '#') {
        renderCatalogView();
    } else if (hash.startsWith('#/product/')) {
        const productId = hash.split('#/product/')[1];
        renderProductDetailView(productId);
    } else {
        appRoot.innerHTML = `<h2 class="view-title">404 - View Interface Not Found</h2><a href="#" class="btn-back">Return to Home Catalog</a>`;
    }
}

// View 1: Product Grid Catalog Component
function renderCatalogView() {
    let htmlContent = `<h2 class="view-title">Our Premium Hardware Catalog</h2>`;
    htmlContent += `<div class="products-grid">`;

    products.forEach(product => {
        htmlContent += `
            <article class="product-card">
                <div class="image-placeholder">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <a href="#/product/${product.id}" class="btn-view">View Specifications</a>
                </div>
            </article>
        `;
    });

    htmlContent += `</div>`;
    appRoot.innerHTML = htmlContent;
}

// View 2: Detailed Single Product Page Component
function renderProductDetailView(id) {
    const product = products.find(p => p.id === id);

    if (!product) {
        appRoot.innerHTML = `<h2 class="view-title">Product Variant Specified Does Not Exist</h2><a href="#" class="btn-back">← Back to Catalog</a>`;
        return;
    }

    appRoot.innerHTML = `
        <a href="#" class="btn-back">← Back to Catalog</a>
        <div class="detail-container">
            <div class="image-placeholder" style="height: 100%; min-height: 300px;">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.25"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div class="detail-info">
                <h2 class="view-title" style="margin-bottom:0.5rem;">${product.name}</h2>
                <p class="product-price" style="font-size:1.5rem;">${product.price}</p>
                <p class="detail-desc">${product.desc}</p>
                <div style="background:#f1f5f9; padding:1rem; border-radius:8px; font-weight:500; font-size:0.9rem; color:#475569;">
                    💡 Architecture Meta Specs: ${product.tech}
                </div>
            </div>
        </div>
    `;
}

// --- APP INITIALIZATION BOOTSTRAP CHANNELS ---
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
