import BookLink from './BookLink';
import { trackEvent } from '../lib/analytics';

const stores = [
  ['Books2Read', 'books2read', 'https://books2read.com/stoplosscomicsvolume1'],
  ['Apple Books', 'apple_books', 'https://books.apple.com/us/book/stoploss-comics-volume-1/id6755047490'],
  ['More stores', 'more_stores', 'https://books2read.com/stoplosscomicsvolume1'],
];
export default function BookSection() {
  return <section id="book" className="book-section section-container page-section" aria-labelledby="book-title">
    <div className="book-showcase"><div className="comic-rays" aria-hidden="true" /><img className="sales-cover" src="/images/volume-1.webp" width="1024" height="1536" loading="lazy" alt="StopLoss Comics: Volume 1 — Degens, Dreams & Disasters from the Crypto Frontlines, by Plentiful Lee" /><div className="starburst sales-burst"><strong>130</strong><span>FULL-COLOR<br />PAGES</span></div><span className="book-spark" aria-hidden="true">✧</span><span className="bonus-sticker">BONUS<br />CONTENT ✦</span></div>
    <div className="book-copy"><p className="eyebrow">The first volume. The whole adventure.</p><h2 id="book-title" className="section-title brush-heading">Volume 1</h2><h3>All the chaos. In one book.</h3><p>Degens, Dreams &amp; Disasters from the Crypto Frontlines.</p><p>A collection of 70 original episodes, 60 new comics, and bonus content from the frontlines of crypto, startups, AI, and modern market madness.</p><dl className="book-stats"><div><dt>70</dt><dd>Original episodes</dd></div><div><dt>60</dt><dd>New comics</dd></div><div><dt>∞</dt><dd>Bad decisions</dd></div></dl><BookLink location="volume_section">Choose your bookstore</BookLink><div className="store-links" aria-label="Bookstores">{stores.map(([label, retailer, url]) => <a key={retailer} href={url} onClick={() => trackEvent('book_store_click', { retailer, location: 'volume_section' })}>{label}<span aria-hidden="true">↗</span></a>)}</div><p className="book-byline">Written with questionable conviction by Plentiful Lee.</p></div>
  </section>;
}
