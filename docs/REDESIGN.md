# StopLoss Comics homepage redesign

## Architecture and preservation

React 19 + Vite, with no new dependencies or backend. The original gallery lives in `src/Archive.jsx`, with its existing styling in `src/App.css`. Search, category selection, layouts, pagination, fullscreen viewing, and swipe navigation are retained. Gallery cards support keyboard opening and the search input has an accessible label.

All four catalogs remain unchanged in `public/`. The archive continues fetching their existing jsDelivr URLs, with original images hosted by `plentifullee/stoplosscomics-assets` on GitHub. The homepage and new individual reader derive titles and IDs directly from the bundled `public/comic.json` catalog through `src/data/comics.js`.

Google Analytics G-9630W1Y3FM and AdSense remain in `index.html`. `src/lib/analytics.js` handles book CTAs, retailer links, archive entry, character navigation, and comic entry/navigation. Social links were not present in the original site, so none were invented.

Deployment remains `npm run deploy` (build, then gh-pages publishing of dist). `public/CNAME` retains stoplosscomics.com and Vite retains base `/`. Published to the existing `gh-pages` branch with `npm run deploy` on September 27, 2026. The custom domain remains https://stoplosscomics.com. Source is maintained on `main`; built assets are published separately to `gh-pages`.

## Navigation

- `#home`: homepage.
- `#characters`, `#featured`, `#book`, `#about`: actual homepage sections, including when navigating from the archive or reader.
- `#comics`: original Comics / Art / NFT / Token archive.
- `#comic/76` (and other catalog IDs): shareable, full-size comic reader with older/newer navigation.
- Unknown comic IDs display a recovery link to the archive. Image failures in the new reader offer retry and the original image URL.

Hash navigation supports direct reload on GitHub Pages without server rewrites. Future clean URL routing will need an explicit fallback strategy. The package homepage field references the historical GitHub project URL; the custom domain and Vite base govern current production asset paths.

## Components and styling

`Header`, `Hero`, `CharacterSection`, `FeaturedComics`, `BookSection`, `FrontlinesSection`, `FinalCTA`, and `Footer` compose the homepage. `BookLink` centralizes primary bookstore CTAs. `ComicReader` handles dedicated comic pages while preserving the existing archive reader.

`src/styles/home.css` contains the shared design tokens and header/hero styling. `src/styles/sections.css` implements remaining sections and the new reader. Layouts recompose for phones and tablets. Native links provide keyboard navigation; visible focus styles and reduced-motion overrides are included. Below-fold images are lazy-loaded with dimensions or reserved image containers.

## Asset provenance

Existing artwork was optimized into WebP without changing original files. No generated character art was used.

| Local website asset | Original source under Downloads/stoplosscomics |
| --- | --- |
| `images/volume-1.webp` | `ebook/finalized/volume 1 cover.jpg` |
| `images/characters/{max,luna,chad,satoshi}.webp` | `characters/defaults/{name}.png` |
| `images/frontlines.webp`, `images/frontlines-960.webp` | Supplied `Downloads/ChatGPT Image Sep 27, 2026, 01_26_52 AM.png` (2172 × 724) |
| `images/comics/76.webp` | `volume 2/posted/comic76 - altcoin trading mirror.png` |
| `images/comics/149.webp` | `volume 2/posted/149 - max raises salaries.png` |
| `images/comics/106.webp` | `volume 2/posted/comic106 - grak.png` |
| `images/comics/128.webp` | `volume 2/posted/comic128 - hopium supply.png` |
| `images/comics/138.webp` | `volume 2/posted/138 - fully automated.png` |
| `images/comics/95.webp` | `volume 2/posted/comic95 - liquidation.png` |

Each featured comic has a separate 400 px thumbnail. Full images are loaded only in the reader; other comics retain the catalog's original remote URLs. The cover is 158 KB; four portraits total approximately 88 KB; six thumbnails total approximately 240 KB. The reference mockup is not shipped as a website asset.

## Validation

`npm run build` and `npm run lint` pass. The lint configuration excludes generated Android web bundles.

Headless Chrome checks passed at 320, 390, 768, 1024, and 1440 px: no horizontal overflow, all homepage images decoded, four character cards and six featured comics rendered. Reduced-motion mode was used for stable screenshots. No runtime errors were reported.

Browser validation covers responsive layouts, image decoding, section navigation, individual reader reloads, older/newer links, browser history, storefront event dispatch, missing comic recovery, image retry, and the preserved archive's search and fullscreen reader. Analytics/ad requests are blocked in browser tests; event payloads are checked locally rather than sent to production GA.

## Optional future artwork

The hero's `.hero-art` container can accept a bespoke transparent team illustration later. The present version uses the real book cover, including its canonical cast. Frontlines uses the supplied sunset panorama, served at 960 or 1920 px through responsive image sources. Its full 3:1 composition is preserved at every breakpoint, with the caption and section copy below the artwork. No newsletter service, invented social URLs, or commerce backend was added.


## Elsewhere extension update

The homepage now includes `ElsewhereSection` after Frontlines and before the final book CTA. Its two cards introduce the Satoshi collection and community tokens; they link directly to the supplied OpenSea collection and Pump.fun profile. The mockup remains a visual reference, not a shipped background. No marketplace APIs, trading features, or pricing data were added.

`src/data/extensions.js` centralizes maintained descriptions, stats, and external destinations. `ExtensionLink` supplies new-tab labels, safe link attributes, and `external_extension_click` events with destination and location. Locations are `homepage_elsewhere`, `header_more` (including mobile secondary links), and `footer`.

The desktop More disclosure opens on click or keyboard activation, closes on Escape/outside click/focus leaving, and restores trigger focus on Escape. Mobile navigation presents separate secondary links and a book CTA. Footer groups are Read, Universe, and Elsewhere. No real social accounts were configured in the original codebase, so no social group or URLs were invented.

NFT and Token were local state tabs in Archive, never independent path routes. Their tabs and fetch mappings have been removed; Comics and Art retain their functionality. `public/nft.json`, `public/token.json`, and all existing assets remain untouched. Defensive hash aliases `#nft`, `#token`, `#tokens` (also with a leading slash) resolve to `#elsewhere`. No historical clean-path routes existed, so no new Pages fallback infrastructure was introduced. CNAME, Vite base, analytics initialization, and deployment scripts remain intact.

Artwork: optimized 400px previews of local Satoshi collection items #0002, #0003, and #0024, plus four supplied community token images (`token/pumpfun/wagdonalds.png`, `lightning.png`, `grump.png`, and `hopium.png`), each optimized to a 480px WebP. The token artwork uses a 2×2 grid with uncropped images and the annotation below the tiles. Original source files are unchanged. Decoration is CSS; all added images lazy-load and have dimensions.

Validation: build and lint pass; Chrome checks passed at 320, 390, 768, 860, 1024, and 1440px with no horizontal overflow. Tested dropdown keyboard/Tab/Escape/outside click, mobile separation, both destinations at all three tracking locations, legacy hash aliases, and Comics/Art archive loading. No runtime errors. External navigation was intercepted for event tests rather than opening marketplaces or sending live analytics.


## Comic archive redesign

`#comics`, including the homepage’s Enter the chaos link, now renders `ComicsArchive`. The cream comic banner, selected-comic preview, Volume 1 sidebar, thumbnail grid, and final book CTA follow the supplied archive mockup. Portrait originals are shown intact in the preview rather than fabricated into horizontal strips.

The archive reads the existing catalog, displays 80 episodes, and preserves the instruction image as a separate reading-guide link. Actual catalog titles and IDs are used. Search matches title, episode number, and description when supplied; Newest/Oldest sort by episode number, and Featured uses the homepage’s curated IDs. Dates, popularity, and topical tags are not fabricated because the catalog has none. Twelve cards load at a time; offscreen thumbnails are lazy-loaded.

Preview has previous/next controls, a clipboard share action with a copyable URL fallback, and a Full reader link. Cards open the existing `ComicReader` at `#comic/ID?from=archive`; its archive return link and older/newer navigation preserve that context. Homepage reader links keep their existing return-to-featured behavior. Archive search, order, loaded count, and selection persist for the browser session, with graceful fallback if storage is unavailable. Empty search and failed preview states are handled.

Art remains available at `#art` through Explore art, using the existing gallery, category filters, search, and fullscreen viewer. The legacy viewer is now dedicated to Art. NFT/token catalogs remain untouched. Skip-to-content now focuses the current page without switching hash routes.

Validation: build/lint and Chrome checks at 320, 390, 768, 1024, and 1440 px; search, no-results reset, paging, sorting, featured filter, preview selection, reader reload/return state, clipboard sharing, Art loading, and older/newer reader continuity. No runtime errors in checks. Publish this archive update with the standard `npm run deploy` workflow after pushing source to `main`.
