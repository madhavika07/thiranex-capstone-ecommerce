# Full-Stack Deployment & Project Architecture: E-Commerce Capstone

A high-performance, single-page application (SPA) E-Commerce Product Catalog built to demonstrate modular frontend architecture, custom client-side routing, asset optimization, and professional cloud hosting deployment.

## 🛠️ Core Engineering Features

- *Custom Client-Side Router:* Handles instantaneous transitions between the "Product Grid View" and "Product Detail View" using location hash routing (`#product/:id`), eliminating complete browser reloads.
- *Interactive Live Shopping Cart State:* Features a production-ready cart engine powered by browser `localStorage` to persistently handle item additions, real-time quantity scaling, and automatic price calculations across user sessions.
- *Dynamic Context Drawer UI:* Implemented an overlay slide-out shopping cart drawer component with seamless CSS transition parameters, providing immediate visual feedback upon item interaction.
- *Simulated Checkout Protocol:* Integrates a sandbox execution method to simulate secure data handshakes, mimicking enterprise checkout gateways like the Stripe API.

## 📂 Project Structure

- index.html: Global viewport mounting hub
- style.css: Adaptive grid and fluid card layouts
- script.js: SPA router and core state controller
- README.md: Technical architecture blueprints
