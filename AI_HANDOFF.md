# CROWN WATCH CO. — AI HANDOFF DOCUMENT
**Updated:** 2026-08-07 | **Session:** 3 | **Build Agent:** Antigravity

---

## ✅ MILESTONES COMPLETED

### M1 — Foundation (✅ DONE)
- Next.js 15 / App Router / Tailwind CSS
- `LanguageContext` (EN/BN), `CartContext` (localStorage), `ClientProviders`
- Data layer: `initialProducts`, `initialOrders`, `initialRepairs`, `initialReviews`
- Database class (`db.ts`) with full CRUD: products, orders, repairs, reviews
- Type system (`src/types/index.ts`) — Product, Order, RepairTicket, Review, CartItem, Coupon
- Utilities: `formatBDT()` (Bengali number formatting), `convertDigitsToBangla()`
- Global CSS: design tokens (`--gold-metallic`, `--bg-obsidian`), `.text-gold-gradient`, gold scrollbar
- Root layout with Inter + Noto Sans Bengali fonts

### M2 — Storefront Catalog (✅ DONE)
- `src/app/shop/page.tsx` — Full catalog with filter/search/sort, active filter pills, loading skeletons, empty state
- `src/app/shop/[slug]/page.tsx` — Product Detail Page (PDP) with image gallery, engraving, qty picker, related products
- `src/components/storefront/ProductCard.tsx` — Card with badges, rating, BDT price, cart button
- `src/components/storefront/FilterSidebar.tsx` — Desktop sidebar + mobile drawer
- `src/components/storefront/SearchBar.tsx` — With focus glow and clear button
- `src/components/storefront/ShopCategoryPage.tsx` — Reusable brand/category page
- `src/app/shop/casio/page.tsx`, `/seiko`, `/citizen`, `/smartwatches`, `/calculators`, `/affordable`
- `src/app/api/products/route.ts` — REST API with full filter support

### M3 — Cart, Checkout, Order Tracking (✅ DONE)
- `src/app/cart/page.tsx` — Full cart with quantity management and order summary
- `src/app/checkout/page.tsx` — Full checkout: 64-district shipping, bKash/Nagad/Rocket/COD, coupon codes, validation
- `src/app/checkout/success/page.tsx` — Order confirmation with order details
- `src/app/track-order/page.tsx` — Order tracker with step progress bar

### M4 — Watch Repair Hub (✅ DONE)
- `src/app/repair/page.tsx` — Hub landing with service cards and trust signals
- `src/app/repair/calculator/page.tsx` — Interactive quote calculator
- `src/app/repair/book/page.tsx` — Full booking form with success/ticket state
- `src/app/repair/track/page.tsx` — Repair ticket tracker with visual timeline

### M5 — Admin Dashboard (✅ DONE)
- `src/app/admin/page.tsx` — Overview dashboard with live stat cards and alerts
- `src/app/admin/products/page.tsx` — Full CRUD: table, modal form, inline stock controls, delete confirmation
- `src/app/admin/orders/page.tsx` — Expandable order rows, status/payment update controls, TrxID display
- `src/app/admin/repairs/page.tsx` — Ticket manager with status progression and final cost setter
- `src/app/admin/reviews/page.tsx` — Review moderation: approve/reject with filter tabs and counts

### M6 — Heritage, Discovery & Static Pages (✅ DONE)
- `src/app/heritage/page.tsx` — 50-year timeline (1974–2024) with alternating layout
- `src/app/quiz/page.tsx` — 5-step Watch Finder Quiz with scoring algorithm and results
- `src/app/compare/page.tsx` — 3-way watch comparison tool with live spec table
- `src/app/authenticity/page.tsx` — Authenticity guarantee with legal disclaimer
- `src/app/faq/page.tsx` — 12 questions across 5 categories, accordion UI
- `src/app/contact/page.tsx` — Contact form with subject, hours, WhatsApp link
- `src/app/shipping/page.tsx` — Delivery zones, fees, courier partners
- `src/app/returns/page.tsx` — 7-day return policy details
- `src/app/warranty/page.tsx` — Brand warranty table + repair warranty

---

## 🔧 REMAINING WORK

### M7 — Polish & Production-Ready
- [ ] Navigation: add dropdown mega-menu for Shop categories (optional enhancement)
- [ ] Homepage: update to use real ProductCard components for featured/bestseller sections
- [ ] SEO: add `metadata` exports on each page (title, description, OG tags)
- [ ] `sitemap.ts` — Dynamic sitemap for all product slugs + static pages
- [ ] `robots.txt` — Allow crawlers
- [ ] `not-found.tsx` — Styled 404 page
- [ ] Add `CartDrawer` slide-out panel component (triggered by header cart icon)
- [ ] Review section on `/shop/[slug]` — Show approved reviews, add review form
- [ ] Wishlist feature (localStorage-based)
- [ ] About page `/about`
- [ ] Bangladeshi districts autocomplete on checkout/repair forms
- [ ] Image optimization: add real product images (currently placeholder paths)
- [ ] `next.config.js` — Add image domains, strict mode

---

## 🏗️ ARCHITECTURE

```
src/
├── app/
│   ├── layout.tsx              # Root layout, Inter + Noto Sans Bengali
│   ├── globals.css             # Design tokens, gold gradient text
│   ├── ClientProviders.tsx     # LanguageContext + CartContext wrapper
│   ├── page.tsx                # Homepage
│   ├── shop/
│   │   ├── page.tsx            # Catalog with filters
│   │   ├── [slug]/page.tsx     # Product Detail Page
│   │   ├── casio/, seiko/, citizen/, smartwatches/, calculators/, affordable/
│   ├── cart/page.tsx
│   ├── checkout/page.tsx, success/page.tsx
│   ├── track-order/page.tsx
│   ├── repair/page.tsx, calculator/, book/, track/
│   ├── admin/page.tsx, products/, orders/, repairs/, reviews/
│   ├── heritage/, quiz/, compare/, authenticity/
│   ├── faq/, contact/, shipping/, returns/, warranty/
│   └── api/products/, api/orders/, api/repairs/
├── components/
│   ├── layout/ Header.tsx, Footer.tsx, Navigation.tsx
│   └── storefront/ ProductCard.tsx, FilterSidebar.tsx, SearchBar.tsx, ShopCategoryPage.tsx
├── context/
│   ├── LanguageContext.tsx     # EN/BN + t() function
│   └── CartContext.tsx         # addItem, removeItem, updateQuantity, clearCart, applyCoupon
├── data/
│   ├── products.ts, orders.ts, repairs.ts, reviews.ts
├── lib/
│   ├── db.ts                   # Database class (singleton export: db)
│   ├── formatters.ts           # formatBDT(amount, lang), convertDigitsToBangla()
│   └── validators.ts           # BD phone, TrxID validators
└── types/index.ts              # Product, Order, RepairTicket, Review, CartItem, Coupon
```

---

## 📋 CRITICAL RULES FOR NEXT AI

1. **BDT Formatting**: Always use `formatBDT(amount, language)` from `@/lib/formatters`
2. **Language**: Always use `const { language } = useLanguage()` and render `product.title[language]`
3. **Cart**: Use `addItem(product, quantity, engravingText?, engravingFee?)` — NOT addToCart
4. **DB Access**: Always use `db.getProducts()`, `db.getOrders()` etc. from `@/lib/db`
5. **Authenticity Disclaimer**: Crown Watch Co. is a RESELLER, not manufacturer/authorized dealer
6. **Design**: Dark Obsidian `#0B0F19`, Gold `#D4AF37`, Surface `#111827`, use `.text-gold-gradient` for headings
7. **Types**: `Product.category` values are lowercase (e.g. `'watches'`), not `'Watches'`

---

## 🚀 DEV SERVER

Running at **http://localhost:3000** (started with `cmd /c "npm run dev"`)

Admin panel: **http://localhost:3000/admin**

---

*Crown Watch Co. — 50 Years of Heritage, Precision & Trust | Dhaka, Bangladesh*
