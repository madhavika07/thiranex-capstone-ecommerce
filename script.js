// --- PRODUCT DATABASE MATRICES (State Core) ---
const products = [
    { id: "1", name: "Pro Wireless Headphones", price: "$299", desc: "Experience pure audio immersion with industry-leading active noise cancellation architecture, 40-hour deep battery lifespans, and premium high-fidelity acoustic audio engineering components built for high performance.", tech: "Bluetooth 5.2 • ANC • 40hr Battery" },
    { id: "2", name: "Mechanical Gaming Keyboard", price: "$149", desc: "Engineered specifically for hyper-responsive performance. Features ultra-durable tactile mechanical switches, structural aircraft-grade anodized aluminum frame plates, and beautiful per-key localized custom backlighting profiles.", tech: "Hot-swappable • RGB • Linear Switches" },
    { id: "3", name: "UltraWide Productivity Monitor", price: "$499", desc: "Maximize your screen real estate. This breathtaking 34-inch panoramic display features razor-sharp high pixel densities, flawless structural IPS color consistency ranges, and fluid high refresh capabilities optimized for split-window workflows.", tech: "34\" IPS • 144Hz • 21:9 Aspect Ratio" }
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
