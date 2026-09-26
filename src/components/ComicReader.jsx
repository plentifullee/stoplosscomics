import { useState } from 'react';
import { comicImage, comics } from '../data/comics';
import { trackEvent } from '../lib/analytics';

export default function ComicReader({ id }) {
  const [failed, setFailed] = useState(false);
  const index = comics.findIndex((comic) => comic.id === id);
  const comic = comics[index];
  if (!comic) return <main id="main-content" tabIndex="-1" className="reader-page section-container"><h1>Comic not found</h1><p>This comic may have moved. There’s plenty more chaos in the archive.</p><a href="#comics" className="comic-button">Browse all comics →</a></main>;
  const navigate = (next) => { trackEvent('comic_open', { comic_id: next.id, location: 'reader' }); };
  return <main id="main-content" tabIndex="-1" className="reader-page section-container"><a className="reader-back" href="#featured">← Back to featured comics</a><div className="reader-heading"><p className="eyebrow">StopLoss Comics · Episode {comic.id}</p><h1>{comic.title}</h1></div>{failed ? <div className="reader-error" role="alert"><p>The comic image couldn’t load.</p><button className="comic-button" onClick={() => setFailed(false)}>Try again</button><a href={comic.imageUrl}>Open original image ↗</a></div> : <img className="reader-image" src={comicImage(comic)} width="1024" height="1536" alt={comic.title} onError={() => setFailed(true)} />}
    <nav className="reader-nav" aria-label="Comic navigation">{index < comics.length - 1 ? <a href={`#comic/${comics[index + 1].id}`} onClick={() => navigate(comics[index + 1])}>← Older comic</a> : <span />}<a href="#comics">All comics</a>{index > 0 ? <a href={`#comic/${comics[index - 1].id}`} onClick={() => navigate(comics[index - 1])}>Newer comic →</a> : <span />}</nav>
  </main>;
}
