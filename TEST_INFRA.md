# E2E Test Infra: CROWN WATCH CO.

## Test Philosophy
- Opaque-box, requirement-driven testing. No dependency on implementation internal design.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.

## Feature Inventory & Tier Allocation (28 Features)

| # | Feature | Tier 1 (Coverage) | Tier 2 (Boundaries) | Tier 3 (Pairwise) | Tier 4 (Application) |
|---|---------|:-----------------:|:------------------:|:-----------------:|:--------------------:|
| F01 | Localization (EN/BN) | 5 tests | 5 tests | ✓ | ✓ |
| F02 | BDT Currency Formatter | 5 tests | 5 tests | ✓ | ✓ |
| F03 | Responsive Dark/Gold Theme | 5 tests | 5 tests | ✓ | ✓ |
| F04 | Product Filtering System | 5 tests | 5 tests | ✓ | ✓ |
| F05 | Search Engine | 5 tests | 5 tests | ✓ | ✓ |
| F06 | Product Sorting | 5 tests | 5 tests | ✓ | ✓ |
| F07 | Product Details PDP | 5 tests | 5 tests | ✓ | ✓ |
| F08 | Watch Engraving Option | 5 tests | 5 tests | ✓ | ✓ |
| F09 | Dynamic Cart Drawer | 5 tests | 5 tests | ✓ | ✓ |
| F10 | Coupon Code Validation | 5 tests | 5 tests | ✓ | ✓ |
| F11 | District Shipping Fee | 5 tests | 5 tests | ✓ | ✓ |
| F12 | Payment Gateway Options | 5 tests | 5 tests | ✓ | ✓ |
| F13 | Order Confirmation & Invoice | 5 tests | 5 tests | ✓ | ✓ |
| F14 | Repair Quote Calculator | 5 tests | 5 tests | ✓ | ✓ |
| F15 | Repair Ticket Booking Form | 5 tests | 5 tests | ✓ | ✓ |
| F16 | Repair Status Tracker | 5 tests | 5 tests | ✓ | ✓ |
| F17 | Admin Authentication | 5 tests | 5 tests | ✓ | ✓ |
| F18 | Product CRUD | 5 tests | 5 tests | ✓ | ✓ |
| F19 | Stock Alert & Management | 5 tests | 5 tests | ✓ | ✓ |
| F20 | Order Status Management | 5 tests | 5 tests | ✓ | ✓ |
| F21 | Repair Ticket Status Manager | 5 tests | 5 tests | ✓ | ✓ |
| F22 | Customer Review Moderation | 5 tests | 5 tests | ✓ | ✓ |
| F23 | 50-Year Heritage Page | 5 tests | 5 tests | ✓ | ✓ |
| F24 | Authenticity & Warranty Guide | 5 tests | 5 tests | ✓ | ✓ |
| F25 | Watch Finder Quiz | 5 tests | 5 tests | ✓ | ✓ |
| F26 | Watch Comparison Tool | 5 tests | 5 tests | ✓ | ✓ |
| F27 | Dynamic Schema.org JSON-LD | 5 tests | 5 tests | ✓ | ✓ |
| F28 | Order Status Lookup | 5 tests | 5 tests | ✓ | ✓ |

## Test Architecture & Runner Setup
- Test runner framework: Node.js standard assertions / Vitest / Playwright / Custom runner script (`npm test`).
- Test location: `tests/` directory.
- Execution command: `npm test` (must execute all suite tiers and return exit code 0).

## Minimum Test Case Thresholds
- **Tier 1 (Feature Coverage)**: 28 features × 5 = 140 test cases minimum.
- **Tier 2 (Boundary & Corner Cases)**: 28 features × 5 = 140 test cases minimum (e.g. empty queries, 0 stock, invalid phones, non-existent tickets, 64th district edge cases).
- **Tier 3 (Cross-Feature Combinations)**: 28 pairwise combination tests (e.g. EN/BN toggle + Checkout, Filter + Engraving + Cart, Repair Calculator + Ticket Booking + Admin Update).
- **Tier 4 (Real-World Application Scenarios)**: 14 end-to-end application scenarios (e.g. Full Customer Journey from Quiz -> PDP -> Engraving -> bKash Checkout -> Order Tracking -> Admin Order Verification).
- **Total Minimum Threshold**: 314 test cases.

## Real-World Application Scenarios (Tier 4)
1. **Scenario 1**: Eid Gift Shopper — Uses Watch Finder Quiz -> Selects Casio Couple Set -> Adds Engraving -> Checks out to Sylhet (Outside Dhaka ৳120 fee) via bKash with TrxID -> Receives Order ID -> Tracks Order.
2. **Scenario 2**: Mechanical Watch Repair Client — Uses Quote Calculator for Seiko Automatic Movement servicing -> Submits Repair Booking with Dropoff -> Gets Ticket `CROWN-REP-2026-8941` -> Admin updates status to "Servicing In Progress" -> Client views live progress timeline on tracking page.
3. **Scenario 3**: Student Calculator Buyer — Searches for Casio FX-991EX scientific calculator -> Filters by price (< ৳5,000) -> Switches UI to Bangla -> Verifies BDT formatting in Bangla -> Checks out via COD to Dhaka (৳60 fee).
4. **Scenario 4**: Store Admin Operations — Log in to `/admin` -> Add new Seiko Presage watch -> Verify stock alert flag -> Moderate 5 customer reviews -> Verify order TrxID -> Update repair ticket completion.
5. **Scenario 5**: Skeptical Counterfeit Checker — Visits Authenticity & Warranty guide -> Compares 3 watches side-by-side on `/compare` -> Checks Schema.org JSON-LD structured data -> Completes Nagad payment.
