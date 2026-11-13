# Professional polish pass

Baseline: saved version 8. Preserve the existing logo artwork, homepage hero, blue/teal identity and page structure.

## Completed changes

- Replaced starter browser icons with a mark extracted from the original CCG-C logo.
- Added a branded 1200×630 sharing image, page-specific titles/descriptions, canonical URLs, Open Graph/Twitter metadata, sitemap, robots file and factual Organization metadata.
- Removed inconsistent published-price and phone claims, unconfirmed fixed delivery schedules/cut-off statistics, and unverified training/certification assertions.
- Expanded Services, Pricing, About and Safety content with distinct, useful explanations and FAQs.
- Replaced the decorative route dots with an attributed OpenStreetMap Ontario reference map and a delivery-inquiry checklist. The map explicitly does not claim a delivery boundary.
- Added neutral cylinder-format illustrations on gas pages and a separate forklift-cylinder close-up. These images are labelled illustrations, not photos of CCG-C stock.
- Split the cylinder guide into reference high-pressure capacities, a helium reference, and product-specific selection for acetylene, CO₂ and beer gas. Exact stock, grades, dimensions and capacities require business confirmation.
- Product quote links preselect the product on the contact form.

## Generated project assets and briefs

Created with the built-in image-generation tool, then optimised to WebP. No technical markings, capacity labels, certification marks or invented CCG-C branding were added.

| Final path | Generation brief |
| --- | --- |
| `public/images/high-pressure-cylinder.webp` | Neutral tall steel compressed-gas cylinder with protective cap, pale gray studio background, complete object visible. |
| `public/images/co2-cylinder.webp` | Generic compact beverage-cylinder format, silver metal and protected valve, pale gray studio background. |
| `public/images/acetylene-cylinder.webp` | Broad dark steel fuel-cylinder format with rounded shoulders, flat foot ring and screw-on protective cap, pale gray studio background. |
| `public/images/forklift-cylinder.webp` | Generic silver horizontal forklift LPG cylinder with protective collar, full cylinder visible, no labels or capacity claims. |

The initial fuel-cylinder variant was not selected; the final capped version was reviewed before use. Original logo and hero source files remain unchanged.

## Items requiring business information or a connected service

- No email service or form endpoint is configured in Sites. The quote form retains its explicit email-draft and copy fallback; direct server delivery is not claimed.
- Real product, premises and staff photography was not supplied. Illustrations are not presented as actual company photographs.
- Actual product specifications, availability, delivery coverage, exact address, phone and certifications were not invented.

## Verification

TypeScript checks pass. Local image paths and product-format references are checked. Production route generation/build run through Sites. Full interactive browser verification remains limited by unavailable preview infrastructure.
