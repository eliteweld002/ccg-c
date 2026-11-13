# Version 8 enhancement pass

Preserved the original logo artwork and homepage hero composition. Original PNG sources remain in the repository. Pages now serve optimised WebP derivatives, with smaller thumbnails for cards. The compact logo removes surrounding whitespace without replacing its design.

## Layout and interaction

- Removed repeated hero/body photographs on all gas and industry pages.
- Removed generic repeated photos from text-led index, pricing and contact introductions.
- Homepage introduction uses a delivery scene; fabrication and independent-welder cards have distinct welding images.
- Homepage industry cards now open their respective detail pages.
- Reduced header height, exposed desktop navigation from 1024px, added Escape handling and keyboard focus management for the mobile menu.
- Added distinct gas identifiers and application-specific inquiry notes without inventing purity or stock specifications.
- Removed placeholder phone/address text. Existing orders email remains the contact destination.
- Quote form validates entries, prepares a reviewable email and provides a copy fallback. It does not claim server delivery. A connected transactional email service would be required for direct web submission.
- Safety links request the current gas-specific SDS by email. No unverified SDS PDFs were invented.
- Pricing cards now link to a quote request.

## New generated application assets

Generated with the built-in image-generation tool, using landscape photographic-style briefs without branding or promotional text. These are illustrative application scenes, not photographs of CCG-C staff or facilities.

| Saved project image | Generation brief |
| --- | --- |
| `public/images/argon-tig.webp` | Professional TIG welding of a stainless-steel tube assembly, proper helmet, gloves, filler rod and torch; clean industrial workshop. |
| `public/images/oxygen-cutting.webp` | Professional oxy-fuel cutting of steel plate, protective clothing and eyewear, controlled sparks beneath the cut. |
| `public/images/acetylene-brazing.webp` | Copper pipe brazing using a torch and filler rod; protected technician, realistic workshop. |
| `public/images/helium-leak-testing.webp` | Technician checking a vacuum chamber joint with a helium leak detector in a clean testing laboratory. |
| `public/images/co2-food-packaging.webp` | Modified-atmosphere food tray packaging line in a hygienic production area. |

## Image optimisation result

Full-size photo PNG sources: 33,237,709 bytes. Full-size optimised WebP counterparts: 2,098,444 bytes, approximately 94% smaller. This compares image files, not measured page-load time. Cards use separate 640px thumbnails. Source PNGs are retained for recovery and future editing.

## Verification

TypeScript check and asset-reference checks pass. Production build and static route export run through Sites. Interactive browser QA is limited by the unavailable local preview supervisor.
