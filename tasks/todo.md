# 💎 $10,000 Enterprise + AI Search (GEO/AIO) Optimization Plan

## Tasks

### Phase 1: AI Search Optimization (GEO / AIO for ChatGPT, Perplexity, Claude)
- [ ] 1. Create `public/llms.txt`: Standardized AI crawler guide detailing Crown Watch Co. products, Dhaka showroom, pricing in BDT, and repair policies.
- [ ] 2. Create `public/llms-full.txt`: Full comprehensive catalog context for AI search bots.
- [ ] 3. Create `src/app/api/knowledge-graph/route.ts`: Structured JSON-LD knowledge graph endpoint for AI search crawlers.

### Phase 2: Google 2026 Merchant & E-commerce Structured Data
- [ ] 4. Update `src/components/seo/JsonLd.tsx`:
  - Add Google Merchant Return Policy (`MerchantReturnPolicy`) & Shipping Details (`OfferShippingDetails`).
  - Add `HowTo` & `Service` Schema for Repair Hub.
  - Add `FAQPage` Schema.

### Phase 3: Dynamic OpenGraph Image Engine & Multilingual Hreflang
- [ ] 5. Create `src/app/api/og/route.ts`: Dynamic SVG/Canvas OpenGraph image generator for social sharing.
- [ ] 6. Update `src/app/layout.tsx`: Add `hreflang` alternate language tags (`en-BD`, `bn-BD`) and performance preconnect headers.

### Phase 4: Verification & Build Confirmation
- [ ] 7. Write unit tests in `tests/unit/seo.test.ts`.
- [ ] 8. Run `npx tsc --noEmit` and `npm run build` to confirm 100% build success.
