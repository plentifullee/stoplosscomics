import { featuredComics } from '../data/comics';
import { trackEvent } from '../lib/analytics';

export default function FeaturedComics() {
  return <section id="featured" className="featured-section section-container page-section" aria-labelledby="featured-title">
    <div className="section-heading-row"><div><h2 id="featured-title" className="section-title brush-heading blue-brush">Start here</h2><p className="section-subtitle">Six featured comics to get you hooked.</p></div><a href="#comics" className="comic-button" onClick={() => trackEvent('comic_archive_click', { location: 'featured' })}>Read all comics <span aria-hidden="true">→</span></a></div>
    <div className="featured-grid">{featuredComics.map((comic, index) => <a href={`#comic/${comic.id}`} key={comic.id} className="featured-card" onClick={() => trackEvent('comic_open', { comic_id: comic.id, location: 'featured' })}>
      <div className="featured-image"><img src={comic.thumbnail} width="400" height="600" alt={`Preview of ${comic.title}`} loading="lazy" /><span className="read-sticker">Read comic <span aria-hidden="true">↗</span></span></div>
      <div className="featured-caption"><span>{String(index + 1).padStart(2, '0')}</span><h3>{comic.title}</h3><span aria-hidden="true">→</span></div>
    </a>)}</div>
  </section>;
}
