# Project: CROWN WATCH CO. Storefront, Repair Hub & Admin Platform

## Architecture
CROWN WATCH CO. is built using Next.js (App Router with API routes), React, and Tailwind CSS configured for a Modern Dark & Gold Luxury Aesthetic.
- **Frontend Architecture**: Client & Server components rendering responsive views (320px to 1440px+).
- **State & Context Layer**:
  - `LanguageContext`: React context for EN/BN toggle, instant UI translation, and Bangla typography.
  - `CartContext` / State: React context / state with local storage persistence for cart items, quantity controls, and dynamic shipping calculations.
- **Data Storage Layer**: In-memory / file-backed JSON database store with pre-seeded products, repair tickets, orders, and customer reviews.
- **API Contracts**: Next.js route handlers (`/api/products`, `/api/orders`, `/api/repairs`, `/api/admin/*`, `/api/quiz`, `/api/reviews`).
- **SEO & Schema Layer**: Schema.org JSON-LD scripts (`Product`, `LocalBusiness`, `RepairService`, `Offer`, `BreadcrumbList`), OpenGraph metadata, dynamic `sitemap.xml`, and `robots.txt`.

---

## Feature Inventory

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F01 | Localization (EN/BN) | Switch UI copy, labels, and specs dynamically between English and Bangla. | M1 | Survey / Blueprint Pt VI |
| F02 | BDT Currency Formatter | Format all prices in BDT with `৳` symbol and local comma grouping (e.g. `৳ 12,500`). | M1 | Survey / Blueprint Pt I |
| F03 | Responsive Dark/Gold Theme | Mobile-first dark obsidian theme (`#0B0F19`) with metallic gold accents (`#D4AF37`). | M1 | Survey / Blueprint Pt VII |
| F04 | Product Filtering System | Filter catalog by Brand, Category, Price Range, Movement, and Stock. | M2 | Survey / Blueprint Pt III |
| F05 | Search Engine | Instant keyword search across title, brand, category, and Bangla tags. | M2 | Survey / Blueprint Pt III |
| F06 | Product Sorting | Sort products by Price Low-High, Price High-Low, Rating, and Newest. | M2 | Survey / Blueprint Pt III |
| F07 | Product Details PDP | Detail page with image gallery, specs, warranty info, stock status, buy buttons. | M2 | Survey / Blueprint Pt III |
| F08 | Watch Engraving Option | Custom text entry for watch backplate engraving add-on during purchase. | M2 | Survey / Blueprint Pt II |
| F09 | Dynamic Cart Drawer | Slide-over cart drawer with quantity adjustments, subtotal, and checkout CTA. | M3 | Survey / Blueprint Pt II |
| F10 | Coupon Code Validation | Apply discount coupon codes at cart/checkout for promotional savings. | M3 | Survey / Blueprint Pt II |
| F11 | District Shipping Fee | Dynamic delivery fee calculation (Dhaka ৳60 vs Outside Dhaka ৳120). | M3 | Survey / Blueprint Pt VI |
| F12 | Payment Gateway Options | Payment selection (bKash, Nagad, Rocket with TrxID validation, COD). | M3 | Survey / Blueprint Pt VI |
| F13 | Order Confirmation & Invoice | Order summary generation, unique Order ID, and digital invoice receipt. | M3 | Survey / Blueprint Pt III |
| F14 | Repair Quote Calculator | Instant estimated cost and turnaround time calculation for repairs. | M4 | Survey / Blueprint Pt III |
| F15 | Repair Ticket Booking Form | Submit watch repair booking request with drop-off or courier pickup. | M4 | Survey / Blueprint Pt III |
| F16 | Repair Status Tracker | Real-time lookup of watch repair progress timeline using Ticket ID / Phone. | M4 | Survey / Blueprint Pt III |
| F17 | Admin Authentication | Admin login interface for managing store operations and inventory. | M5 | Survey / Blueprint Pt II |
| F18 | Product CRUD | Add, edit, delete, and view product listings and inventory stock counts. | M5 | Survey / Blueprint Pt II |
| F19 | Stock Alert & Management | View inventory levels and low-stock alerts (< 5 units). | M5 | Survey / Blueprint Pt II |
| F20 | Order Status Management | Review customer orders, verify MFS TrxIDs, update order statuses. | M5 | Survey / Blueprint Pt II |
| F21 | Repair Ticket Status Manager | Admin interface to update repair progress, technician notes, final cost. | M5 | Survey / Blueprint Pt II |
| F22 | Customer Review Moderation | Approve or reject customer reviews before publishing to product pages. | M5 | Survey / Blueprint Pt IV |
| F23 | 50-Year Heritage Page | Dedicated brand history page with 1974-present milestone timeline. | M6 | Survey / Blueprint Pt I |
| F24 | Authenticity & Warranty Guide | Counterfeit prevention checklist, seller vs official warranty explanation. | M6 | Survey / Blueprint Pt VIII |
| F25 | Watch Finder Quiz | 5-question wizard guiding customers to ideal watch using weighted scoring. | M6 | Survey / Blueprint Pt IV |
| F26 | Watch Comparison Tool | Side-by-side technical comparison table of up to 4 selected watches. | M6 | Survey / Blueprint Pt III |
| F27 | Dynamic Schema.org JSON-LD | Embedded JSON-LD structured data for products, business, and repair services. | M6 | Survey / Blueprint Pt XI |
| F28 | Order Status Lookup | Public lookup tool for customer order delivery progress. | M3 | Survey / Blueprint Pt III |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation, Types, State & Data Layer | Next.js setup, Tailwind theme (`#0B0F19`/`#D4AF37`), Type definitions, Seed database, `LanguageContext` (EN/BN), `CartContext`, BDT formatter (`formatBDT`), validation helpers. | none | PLANNED |
| M2 | Navigation, Storefront Catalog & Product Detail | Header, Footer, Shop Catalog (`/shop`), Filters (Brand, Category, Price, Sort), Search, Dedicated Brand pages (Casio, Seiko, Citizen, Smartwatches, Calculators), Product Detail Page (`/shop/[slug]`), Watch Engraving option. | M1 | PLANNED |
| M3 | Cart, Dynamic Checkout & Order Tracking | Cart Drawer/Page (`/cart`), Coupon codes, Checkout (`/checkout`) with district shipping (Dhaka ৳60 / Nationwide ৳120), MFS (bKash, Nagad, Rocket TrxID validation), COD, Order Confirmation, Order Tracking (`/track-order`). | M1, M2 | PLANNED |
| M4 | Watch Repair Service Hub & Tracking | Repair Landing Page (`/repair`), Repair Quote Calculator (`/repair/calculator`), Booking Form (`/repair/book`) with Ticket ID generation (`CROWN-REP-XXXX`), Status Lookup Page (`/repair/track`) with visual progress timeline. | M1 | PLANNED |
| M5 | Admin Dashboard & Inventory Management | Admin Portal (`/admin`), Product CRUD modal (`/admin/products`), Stock level alerts, Order management & MFS TrxID verification (`/admin/orders`), Repair ticket manager (`/admin/repairs`), Customer review moderation (`/admin/reviews`). | M1, M2, M3, M4 | PLANNED |
| M6 | Heritage, Showcase, Interactive Tools & SEO | 50-Year Heritage Page (`/heritage`), Authenticity & Warranty Guide (`/authenticity`), Watch Finder Quiz (`/quiz`), Watch Comparison Tool (`/compare`), Static pages (About, Physical Store, Contact, FAQ, Terms, Shipping, Privacy), Schema.org JSON-LD & dynamic sitemap. | M1, M2 | PLANNED |
| M7 | Final E2E Integration & Verification | Pass 100% of E2E Test Suite (Tiers 1-4), Tier 5 Adversarial Coverage Hardening, final audit signoff. | M1-M6 | PLANNED |

---

## Interface Contracts

### Data Schemas & Models
- `Product`: `{ id, sku, title: {en, bn}, slug, brand, category, subcategory?, price, salePrice?, stockQuantity, isAuthentic, warrantyInfo, images, description: {en, bn}, specifications, rating, reviewCount, allowEngraving, engravingFeeBDT? }`
- `Order`: `{ id, orderNumber, customerInfo: {fullName, phone, address, district}, items: OrderItem[], subtotal, shippingFee, discount, totalAmount, paymentMethod, paymentDetails: {senderPhone?, trxId?}, paymentStatus, orderStatus, createdAt }`
- `RepairTicket`: `{ id, ticketNumber, customerName, customerPhone, district, watchBrand, watchModel, watchType, serviceRequested, problemDescription, estimatedCostRange: {min, max}, finalCost?, estimatedTurnaround, status, timeline: TimelineEntry[], createdAt }`
- `Review`: `{ id, productId, customerName, rating, comment, isVerifiedPurchase, status, createdAt }`

### API Contracts
- `GET /api/products?category=...&brand=...&search=...&minPrice=...&maxPrice=...&sort=...` -> `{ success: true, products: Product[], total: number }`
- `POST /api/orders` -> `{ success: true, order: Order }`
- `POST /api/repairs/booking` -> `{ success: true, ticket: RepairTicket }`
- `GET /api/repairs/[ticketId]` -> `{ success: true, ticket: RepairTicket }`
- `GET /api/admin/orders` -> `{ success: true, orders: Order[] }`
- `PATCH /api/admin/orders/[id]` -> `{ success: true, order: Order }`
- `POST /api/quiz/recommend` -> `{ success: true, matches: QuizMatchResult[] }`

---

## Code Layout

```
C:\Users\Nahian\teamwork_projects\crown_watch_co\
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Homepage
│   │   ├── shop/
│   │   │   ├── page.tsx                # Catalog / Shop All
│   │   │   ├── [slug]/page.tsx         # Product Detail Page (PDP)
│   │   │   ├── casio/page.tsx          # Dedicated Casio Collection
│   │   │   ├── seiko/page.tsx          # Dedicated Seiko Collection
│   │   │   ├── citizen/page.tsx        # Dedicated Citizen Collection
│   │   │   ├── smartwatches/page.tsx   # Smartwatches
│   │   │   ├── calculators/page.tsx   # Calculators
│   │   │   └── affordable/page.tsx    # Budget timepieces (< ৳5,000)
│   │   ├── cart/page.tsx               # Cart view
│   │   ├── checkout/
│   │   │   ├── page.tsx                # Dynamic Bangladesh Checkout
│   │   │   └── success/page.tsx        # Order Confirmation Receipt
│   │   ├── track-order/page.tsx        # Public Order Tracking
│   │   ├── repair/
│   │   │   ├── page.tsx                # Watch Repair Hub
│   │   │   ├── calculator/page.tsx     # Instant Quote Calculator
│   │   │   ├── book/page.tsx           # Interactive Repair Booking
│   │   │   └── track/page.tsx          # Real-time Repair Status Lookup
│   │   ├── admin/
│   │   │   ├── page.tsx                # Admin Dashboard Overview
│   │   │   ├── products/page.tsx       # Product CRUD & Stock
│   │   │   ├── orders/page.tsx         # Order Management & TrxID Verification
│   │   │   ├── repairs/page.tsx        # Repair Ticket Management
│   │   │   └── reviews/page.tsx        # Customer Review Moderation
│   │   ├── heritage/page.tsx           # 50-Year Heritage Showcase
│   │   ├── authenticity/page.tsx       # Authenticity & Warranty Guide
│   │   ├── quiz/page.tsx               # Interactive Watch Finder Quiz
│   │   ├── compare/page.tsx            # Watch Comparison Tool
│   │   ├── about/page.tsx              # About Us & Dhaka Store
│   │   ├── contact/page.tsx            # Contact & Support
│   │   ├── faq/page.tsx                # Frequently Asked Questions
│   │   ├── shipping/page.tsx           # Shipping Policy
│   │   ├── returns/page.tsx            # Returns & Exchange Policy
│   │   ├── warranty/page.tsx           # Warranty Policy
│   │   ├── sitemap.ts                  # Dynamic Sitemap XML Generator
│   │   ├── robots.ts                   # Robots.txt Generator
│   │   └── api/                        # Next.js API Routes
│   │       ├── products/route.ts
│   │       ├── orders/route.ts
│   │       ├── repairs/route.ts
│   │       ├── admin/route.ts
│   │       ├── quiz/route.ts
│   │       └── reviews/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── storefront/
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── EngravingOption.tsx
│   │   ├── repair/
│   │   │   ├── QuoteCalculator.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   └── StatusTimeline.tsx
│   │   ├── admin/
│   │   │   ├── ProductModal.tsx
│   │   │   ├── OrderStatusTable.tsx
│   │   │   └── RepairManager.tsx
│   │   ├── showcase/
│   │   │   ├── Timeline1974.tsx
│   │   │   ├── QuizWizard.tsx
│   │   │   └── ComparisonMatrix.tsx
│   │   └── seo/
│   │       └── JsonLd.tsx
│   ├── context/
│   │   ├── LanguageContext.tsx
│   │   └── CartContext.tsx
│   ├── data/
│   │   ├── products.ts
│   │   ├── repairs.ts
│   │   ├── orders.ts
│   │   └── reviews.ts
│   ├── lib/
│   │   ├── formatters.ts               # BDT formatBDT helper
│   │   ├── validators.ts               # Phone & MFS TrxID regex
│   │   ├── db.ts                       # In-memory / file JSON storage helper
│   │   └── quizEngine.ts               # Watch Finder Quiz scoring engine
│   └── types/
│       └── index.ts                    # TypeScript interfaces
```
