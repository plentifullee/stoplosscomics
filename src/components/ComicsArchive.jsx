import { useEffect, useRef, useState } from 'react';
import { comics, comicImage, featuredComics } from '../data/comics';
import BookLink from './BookLink';
import FinalCTA from './FinalCTA';
import { trackEvent } from '../lib/analytics';
import '../styles/archive.css';

const PAGE_SIZE = 12;
const featuredIds = new Set(featuredComics.map(comic => comic.id));
function readPreferences() {
  try { return JSON.parse(sessionStorage.getItem('comic-archive') || '{}') || {}; } catch { return {}; }
}
function PreviewImage({ comic, className = '', thumbnail = false }) {
  const [failed, setFailed] = useState(false);
  const featured = featuredComics.find(item => item.id === comic.id);
  const src = thumbnail && featured ? featured.thumbnail : comicImage(comic);
  return failed ? <span className="archive-image-error">Preview unavailable. Open the full reader to retry.</span> : <img className={className} src={src} width="1024" height="1536" alt={comic.title} loading={thumbnail ? 'lazy' : 'eager'} decoding="async" onError={() => setFailed(true)} />;
}
export default function ComicsArchive() {
  const [initial] = useState(readPreferences);
  const [query, setQuery] = useState(typeof initial.query === 'string' ? initial.query : '');
  const [sort, setSort] = useState(['newest', 'oldest', 'featured'].includes(initial.sort) ? initial.sort : 'newest');
  const [count, setCount] = useState(Number.isInteger(initial.count) ? Math.min(Math.max(initial.count, PAGE_SIZE), comics.length) : PAGE_SIZE);
  const [selectedId, setSelectedId] = useState(initial.selectedId || comics[0]?.id);
  const [shareStatus, setShareStatus] = useState('');
  const preview = useRef(null);
  const filtered = comics.filter(comic => (sort !== 'featured' || featuredIds.has(comic.id)) && `${comic.title} ${comic.id} ${comic.description || ''}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => sort === 'oldest' ? Number(a.id) - Number(b.id) : Number(b.id) - Number(a.id));
  const selected = filtered.find(comic => comic.id === selectedId) || filtered[0];
  const index = selected ? filtered.indexOf(selected) : -1;
  useEffect(() => {
    try { sessionStorage.setItem('comic-archive', JSON.stringify({ query, sort, count, selectedId })); } catch { /* Browsing still works when storage is unavailable. */ }
  }, [query, sort, count, selectedId]);
  const readerUrl = comic => `#comic/${comic.id}?from=archive`;
  const select = comic => { setSelectedId(comic.id); setShareStatus(''); trackEvent('comic_open', { comic_id: comic.id, location: 'archive_preview' }); };
  async function share() {
    const url = new URL(`#comic/${selected.id}`, window.location.href).href;
    try { await navigator.clipboard.writeText(url); setShareStatus('Comic link copied.'); } catch { setShareStatus(`Copy this link: ${url}`); }
  }
  return <main id="main-content" tabIndex="-1" className="comics-archive">
    <section className="archive-banner section-container" aria-labelledby="archive-title"><div><p className="eyebrow">Straight from the crypto frontlines</p><h1 id="archive-title" className="brush-heading">Comic archive</h1><p>Explore all the chaos, one comic at a time.</p></div><div className="archive-cast" aria-hidden="true">{['max', 'luna', 'chad', 'satoshi'].map(name => <img key={name} src={`/images/characters/${name}-280.webp`} width="280" height={name === 'satoshi' ? '420' : '280'} alt="" />)}<span>Same degens.<br />More comics.</span></div></section>
    <div className="section-container archive-content">
      <div className="archive-toolbar"><label className="archive-search"><span className="sr-only">Search comics by title or episode number</span><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setCount(PAGE_SIZE); setShareStatus(''); }} placeholder="Search comics by title or episode…" /></label><div className="archive-filters" role="group" aria-label="Sort and filter comics">{[['newest', 'Newest'], ['oldest', 'Oldest'], ['featured', 'Featured']].map(([value, label]) => <button key={value} aria-pressed={sort === value} onClick={() => { setSort(value); setSelectedId(null); setCount(PAGE_SIZE); setShareStatus(''); }}>{label}</button>)}</div><a className="archive-art-link" href="#art">Explore art ↗</a></div>
      <div className="archive-columns"><div className="archive-main-column">
        {selected ? <section ref={preview} className="archive-spotlight" aria-labelledby="spotlight-title"><div className="spotlight-heading"><span className="episode-badge">#{selected.id}</span><h2 id="spotlight-title">{selected.title}</h2><span className="spotlight-label">Selected comic</span></div><a className="spotlight-image" href={readerUrl(selected)} aria-label={`Read ${selected.title} in full`} onClick={() => trackEvent('comic_open', { comic_id: selected.id, location: 'archive_reader' })}><PreviewImage key={selected.id} comic={selected} /></a><div className="spotlight-controls"><button disabled={index <= 0} onClick={() => select(filtered[index - 1])}>← Prev</button><span>{index + 1} of {filtered.length}</span><a href={readerUrl(selected)} onClick={() => trackEvent('comic_open', { comic_id: selected.id, location: 'archive_reader' })}>Full reader ↗</a><button onClick={share}>Share</button><button className="next-comic" disabled={index >= filtered.length - 1} onClick={() => select(filtered[index + 1])}>Next →</button></div><p className="share-status" role="status">{shareStatus}</p></section> : <section className="archive-empty"><h2>No comics found</h2><p>Try another title or episode number.</p><button className="comic-button" onClick={() => { setQuery(''); setSort('newest'); setCount(PAGE_SIZE); }}>Show all comics</button></section>}
        <section className="archive-list" aria-labelledby="all-comics-title"><div className="section-heading-row"><h2 id="all-comics-title" className="section-title brush-heading">All comics</h2><p role="status">{filtered.length} {filtered.length === 1 ? 'comic' : 'comics'}{query || sort === 'featured' ? ' found' : ' and counting…'}</p></div><div className="archive-comic-grid">{filtered.slice(0, count).map(comic => <article key={comic.id} className={`archive-comic-card${selected?.id === comic.id ? ' is-selected' : ''}`}><a href={readerUrl(comic)} onClick={() => { setSelectedId(comic.id); trackEvent('comic_open', { comic_id: comic.id, location: 'archive_grid' }); }}><div className="archive-thumbnail"><PreviewImage comic={comic} thumbnail /></div><div className="archive-card-title"><span className="episode-badge">#{comic.id}</span><h3>{comic.title}</h3></div></a><button className="preview-comic-button" aria-label={`Preview ${comic.title}`} onClick={() => { select(comic); preview.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }}>Preview <span aria-hidden="true">↑</span></button></article>)}</div>{count < filtered.length && <button className="comic-button archive-load-more" onClick={() => setCount(value => value + PAGE_SIZE)}>Load more comics <span aria-hidden="true">↓</span></button>}</section>
      </div><aside className="archive-book-sidebar" aria-label="StopLoss Comics Volume 1"><div className="archive-book-promo"><h2>The full story.<br />In one book!</h2><img src="/images/volume-1-384.webp" srcSet="/images/volume-1-384.webp 384w, /images/volume-1-768.webp 768w" sizes="240px" width="384" height="576" loading="lazy" alt="StopLoss Comics Volume 1 cover" /><ul><li>70 original episodes</li><li>60 new comics</li><li>Bonus content</li><li>All the chaos in one place</li></ul><BookLink location="comic_archive" /></div><div className="archive-cat"><p>Good decisions<br />are boring.</p><img src="/images/characters/satoshi-280.webp" width="280" height="420" loading="lazy" alt="An unimpressed Satoshi" /></div></aside></div>
      <p className="archive-reading-guide"><a href="https://raw.githubusercontent.com/plentifullee/stoplosscomics-assets/main/comic/999.webp" target="_blank" rel="noopener noreferrer">How to read our comics ↗<span className="sr-only"> (opens in a new tab)</span></a></p>
    </div><FinalCTA />
  </main>;
}
