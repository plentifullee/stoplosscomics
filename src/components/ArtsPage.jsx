import { useEffect, useRef, useState } from 'react';
import catalog from '../../public/art.json';
import BookLink from './BookLink';
import '../styles/arts.css';

const categories = { all: 'All', team: 'Team art', gm: 'Good mornings', stoploss: 'StopLoss extras' };
const artworks = [...catalog].sort((a, b) => ['team', 'gm', 'stoploss'].indexOf(a.category) - ['team', 'gm', 'stoploss'].indexOf(b.category));
function Preview({ art, eager = false }) {
  return <img src={`/images/art/${art.id}-640.webp`} srcSet={`/images/art/${art.id}-320.webp 320w, /images/art/${art.id}-640.webp 640w`} sizes="(max-width: 650px) 46vw, (max-width: 1000px) 30vw, 300px" alt={art.title} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}
function ArtViewer({ items, initial, onClose }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(initial);
  const [failed, setFailed] = useState(false);
  const art = items[index];
  useEffect(() => {
    const element = dialog.current;
    const previous = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  const move = direction => { setIndex(value => Math.max(0, Math.min(items.length - 1, value + direction))); setFailed(false); };
  return <dialog ref={dialog} className="arts-viewer" aria-labelledby="art-viewer-title" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
    <div className="arts-viewer-top"><div><p>{categories[art.category]}</p><h2 id="art-viewer-title">{art.title}</h2></div><button type="button" onClick={onClose} aria-label="Close artwork">✕</button></div>
    <div className="arts-viewer-image">{failed ? <p>Couldn’t load this artwork. <a href={art.imageUrl} target="_blank" rel="noopener noreferrer">Open original ↗</a></p> : <img key={art.id} src={art.imageUrl} alt={art.title} onError={() => setFailed(true)} />}</div>
    <div className="arts-viewer-controls"><button disabled={index === 0} onClick={() => move(-1)}>← Previous</button><span aria-live="polite">{index + 1} / {items.length}</span><button disabled={index === items.length - 1} onClick={() => move(1)}>Next →</button></div>
  </dialog>;
}
export default function ArtsPage() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState(null);
  const filtered = artworks.filter(art => (category === 'all' || art.category === category) && `${art.title} ${categories[art.category]}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <main id="main-content" tabIndex="-1" className="arts-page">
    <section className="arts-hero section-container" aria-labelledby="arts-title">
      <div className="arts-intro"><p className="eyebrow">The StopLoss sketchbook</p><h1 id="arts-title">ARTS</h1><h2>Behind the panels <br />and beyond.</h2><p>A collection of illustrations, character artworks and special pieces from the StopLoss Comics universe.</p><a href="#arts-gallery" onClick={event => { event.preventDefault(); document.getElementById('arts-gallery').scrollIntoView({ behavior: 'smooth' }); }}>Explore the gallery ↓</a></div>
      <div className="arts-studio" aria-label="A selection from the StopLoss art collection"><div className="arts-studio-rays" /><figure className="arts-poster arts-poster-back"><Preview art={{ id: 'inside-the-ape-mind', title: 'Inside the Ape Mind' }} eager /><figcaption>Same degens. New dimensions.</figcaption></figure><figure className="arts-poster arts-poster-front"><Preview art={{ id: 'level-up', title: 'Level Up' }} eager /><figcaption>A little art. A lot of chaos.</figcaption></figure><span className="arts-studio-bubble">Good arts.<br />Bad ideas.</span><span className="arts-pencil" aria-hidden="true" /></div>
    </section>
    <section id="arts-gallery" className="arts-gallery section-container" aria-label="Artwork gallery">
      <div className="arts-toolbar"><div className="arts-filters" aria-label="Art categories">{Object.entries(categories).map(([key, label]) => <button key={key} aria-pressed={category === key} onClick={() => { setCategory(key); setLimit(12); }}>{label}</button>)}</div><label className="arts-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(12); }} aria-label="Search artworks" placeholder="Search arts…" /></label></div>
      <p className="arts-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'artwork' : 'artworks'}{category === 'all' && !query ? '. Same universe. A different perspective.' : ' found.'}</p>
      <div className="arts-grid">{filtered.slice(0, limit).map((art, index) => <button className="arts-card" key={art.id} onClick={() => setSelected(index)} aria-label={`View ${art.title}`}><div className="arts-card-image"><Preview art={art} /><span aria-hidden="true">View artwork ↗</span></div><h3>{art.title}</h3><p>{categories[art.category]}</p></button>)}</div>
      {filtered.length === 0 && <div className="arts-empty"><h2>No art in this corner of the chaos.</h2><p>Try another title or category.</p><button className="comic-button secondary" onClick={() => { setQuery(''); setCategory('all'); setLimit(12); }}>Show all arts</button></div>}
      {limit < filtered.length && <div className="arts-load"><button className="comic-button secondary" onClick={() => setLimit(value => value + 12)}>Load more arts <span aria-hidden="true">↓</span></button></div>}
    </section>
    <section className="arts-outro"><div className="section-container"><img src="/images/characters/satoshi-280.webp" width="280" height="420" alt="Satoshi, our unimpressed orange cat" loading="lazy" /><div><p className="eyebrow">Good art. Questionable decisions.</p><h2>The stories behind<br />the chaos.</h2><p>Meet the same degens in the pages of Volume 1.</p></div><BookLink location="arts_footer" /></div></section>
    {selected !== null && <ArtViewer items={filtered} initial={selected} onClose={() => setSelected(null)} />}
  </main>;
}
