# 🚀 DigiTools Platform — Next.js Enterprise Edition

Empowering creators, engineers, and digital agencies with premium digital solutions. DigiTools is a modern, high-performance web platform built to provide instant access to a curated suite of digital assets, AI writing assistants, automation blueprints, and professional design templates.

---

## 🛠️ Architecture & Tech Stack

Built with a focus on speed, developer experience, and modern UI/UX standards:

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components, Turbopack)
- **Runtime**: React 19
- **Styling**: Modern Tailwind CSS & PostCSS
- **State Management**: React Context (`ThemeContext`, `CartContext`, `WishlistContext`) with LocalStorage synchronization
- **Icons**: React Icons (Lucide, Feather, FontAwesome, Ionicons)
- **Deployment**: Zero-config static & edge routing ready

---

## ✨ Key Capabilities

1. **Intelligent Tool Discovery & Catalog**
   - Live search, category filtering (AI Tools, Design Assets, Automation, Productivity, Career), and price/rating sorting.
   - Quick View inspection modal with instant cart and wishlist actions.

2. **Dynamic Tool Detail Pages (`/tools/[id]`)**
   - Individual product pages featuring technical specifications, capability lists, high-res previews, and related recommendations.

3. **Interactive Tool Playground (`/playground`)**
   - **AI Content Generator**: Live simulated prompt synthesis with tone and speed selectors.
   - **Palette Studio**: Dynamic hex scheme generator with one-click copy.
   - **Markdown Lab**: Real-time split-pane markdown renderer.
   - **Rate Calculator**: Client quote estimator with self-employment tax contingency buffers.

4. **Cart Drawer & Simulated Checkout**
   - Slide-over drawer with item quantity modifiers and promo discount coupon engine (`DIGI20` for 20% off).
   - Multi-step simulated checkout with instant order generation and asset bundle dispatch.

5. **Tiered Pricing & Specification Matrix**
   - Starter ($0), Pro ($29/mo or $23/mo billed annually), and Enterprise ($99/mo).
   - Side-by-side technical capability comparison table across assets, quotas, and licensing rights.

6. **Light & Dark Theme Switcher**
   - Universal theme provider with smooth transitions and system preference detection.

7. **Customer Reviews & Testimonials**
   - Verified creator feedback with live interactive review submission dialog.

8. **Categorized FAQ Accordion**
   - Searchable, collapsible Q&A covering licensing, file formats, and commercial rights.

9. **Dedicated Contact & Support Route (`/contact`)**
   - Multi-channel inquiry dispatch form and enterprise support info.

---

## 💻 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+

### Installation & Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to explore the DigiTools platform.

---

## 📄 License
Commercial Safe — DigiTools Platform. All rights reserved.