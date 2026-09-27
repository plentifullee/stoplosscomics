# Homepage image optimization

The Volume 1 section retains its original cover-and-copy layout. The book-stack experiment was removed; all other responsive image optimizations remain. Source originals remain unchanged.

All homepage images use WebP, explicit dimensions, and responsive `srcSet`/`sizes`. The hero cover is eager and high-priority; all other images lazy-load. Asynchronous decoding is enabled throughout. The hero and sales section share cover variants for browser cache reuse. Full comic reader images are separate from homepage thumbnails and load only when a reader opens.

## Available widths

| Artwork | Widths (px) |
| --- | --- |
| Volume 1 cover | 384, 768, 1024 |
| Character portraits | 280, 560 |
| Featured comic thumbnails | 240, 400, 480, 800 |
| Frontlines panorama | 640, 960, 1280, 1920 |
| Satoshi collectibles | 200, 400 |
| Community token images | 240, 480 |

New variants were encoded from the local source originals using `cwebp -m 6`, quality 80–86 depending on image content. The panorama source is now named `Downloads/pano.png`. Existing larger versions and full comic-reader assets were retained. The unused historical team illustration is not referenced or downloaded by the homepage.

## Browser measurements

Historical measurements from the optimization pass, before removal of the book-stack illustration. Current image transfer is lower because that illustration no longer loads:

| Viewport | Device pixel ratio | Image payload |
| --- | --- | --- |
| 1440px | 1 | 685 KiB |
| 768px | 1 | 347 KiB |
| 390px | 1 | 310 KiB |
| 390px | 2 | 683 KiB |
| 320px | 2 | 598 KiB |

These are image-file byte totals, not total page transfer or loading-time claims; fonts, scripts, CSS, analytics, and transport overhead are excluded. Initial loading defers below-fold images according to the browser's lazy-load threshold.

The standard cover variant is about 36 KiB (previous default about 154 KiB); the higher-density 768px cover is about 85 KiB. The removed book-stack illustration accounted for about 23 KiB on standard screens or 61 KiB on high-density screens.

Build and lint pass. Chrome validation confirmed every homepage image decodes, only the hero is eager, responsive sources change with viewport/pixel density, and no horizontal overflow appears at the tested widths. Screenshots were inspected at desktop and mobile sizes. These optimizations ship with the comic archive redesign.
