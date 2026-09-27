import BookLink from './BookLink';
import { trackEvent } from '../lib/analytics';

const categories = [['₿', 'Crypto chaos'], ['↗', 'Startup dreams'], ['✳', 'AI hype'], ['⌁', 'Market madness']];

export default function Hero() {
  return <>
    <section className="hero section-container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span /> Straight from the crypto frontlines</p>
        <h1 id="hero-title">STOPLOSS<br /><span>COMICS</span><span className="title-spark" aria-hidden="true">✦</span></h1>
        <p className="hero-tagline brush-heading">Degens. Dreams. Disasters.</p>
        <p className="hero-description">Four idiots. One cat.<br />Infinite bad financial decisions.</p>
      </div>
      <div className="hero-art" aria-label="StopLoss Comics Volume 1">
        <div className="comic-rays" aria-hidden="true" />
        <span className="art-spark spark-one" aria-hidden="true">✧</span>
        <span className="art-spark spark-two" aria-hidden="true">✦</span>
        <span className="art-spark spark-three" aria-hidden="true">✧</span>
        <div className="speech-bubble">YOU COULD<br />JUST BUY IT.</div>
        <a className="hero-book" href="https://books2read.com/stoplosscomicsvolume1" onClick={() => trackEvent('book_cta_click', { location: 'hero_cover' })} aria-label="Get StopLoss Comics Volume 1">
          <img src="/images/volume-1.webp" srcSet="/images/volume-1-384.webp 384w, /images/volume-1-768.webp 768w, /images/volume-1.webp 1024w" sizes="(max-width: 650px) 215px, (max-width: 1100px) 31vw, 355px" width="1024" height="1536" decoding="async" loading="eager" alt="StopLoss Comics Volume 1 by Plentiful Lee, featuring Max, Luna, Chad, and Satoshi" fetchPriority="high" />
        </a>
        <div className="starburst"><strong>100%</strong><span>BAD IDEAS.<br />GOOD COMICS.</span></div>
        <p className="art-caption">THE GANG’S ALL HERE. <span aria-hidden="true">⤴</span></p>
      </div>
      <div className="hero-actions">
        <div className="button-row"><BookLink location="hero">Get the book</BookLink><a className="comic-button secondary" href="#comics" onClick={() => trackEvent('comic_archive_click', { location: 'hero' })}>Read free comics <span aria-hidden="true">→</span></a></div>
        <p className="hero-note">Real stories. Fake financial advice.</p>
        <ul className="category-list" aria-label="Comic topics">{categories.map(([icon, label]) => <li key={label}><span aria-hidden="true">{icon}</span>{label}</li>)}</ul>
      </div>
    </section>
    <div className="universe-strip" aria-label="Welcome to the StopLoss universe"><div className="section-container"><span>HIGH HOPES.</span><i aria-hidden="true">✦</i><span>LOW CONVICTION.</span><i aria-hidden="true">✦</i><span>GREAT STORIES.</span><i aria-hidden="true">✦</i><a href="#comics" onClick={() => trackEvent('comic_archive_click', { location: 'hero_strip' })}>ENTER THE CHAOS <span aria-hidden="true">→</span></a></div></div>
  </>;
}
