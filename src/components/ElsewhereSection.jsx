import { extensions } from '../data/extensions';
import ExtensionLink from './ExtensionLink';

function ExtensionCard({ extension }) {
  const isCollection = extension.id === 'opensea';
  return <article className={`extension-card extension-${extension.id}`}>
    <div className="extension-art">
      {isCollection ? <div className="collectible-fan">
        <img src="/images/extensions/satoshi-0003.webp" width="400" height="400" loading="lazy" alt="Satoshi collectible wearing a black suit and glasses" />
        <img src="/images/extensions/satoshi-0024.webp" width="400" height="400" loading="lazy" alt="Satoshi collectible in futuristic orange armor" />
        <img src="/images/extensions/satoshi-0002.webp" width="400" height="400" loading="lazy" alt="Satoshi collectible in sunglasses and a striped shirt" />
      </div> : <div className="token-art-grid">{extension.images.map(image => <img key={image.name} src={`/images/extensions/${image.name}.webp`} width="480" height="480" loading="lazy" decoding="async" alt={image.alt} />)}</div>}
      <p className="extension-annotation">{extension.annotation}</p>
    </div>
    <div className="extension-copy"><h3 className={`brush-heading ${isCollection ? '' : 'blue-brush'}`}>{extension.title}</h3><p>{extension.description}</p><ul className="extension-stats">{extension.stats.map(stat => <li key={stat}>{stat}</li>)}</ul><ExtensionLink extension={extension} location="homepage_elsewhere" className="comic-button">{extension.cta}</ExtensionLink></div>
  </article>;
}
export default function ElsewhereSection() {
  return <section id="elsewhere" className="elsewhere-section section-container page-section" aria-labelledby="elsewhere-title">
    <div className="section-heading-row"><div><h2 id="elsewhere-title" className="section-title brush-heading">Elsewhere in the chaos</h2><p className="section-subtitle">More from the StopLoss Comics universe.</p></div><p className="margin-note">Extensions<br />of the universe. <span aria-hidden="true">↙</span></p></div>
    <div className="extension-grid">{extensions.map(extension => <ExtensionCard key={extension.id} extension={extension} />)}</div>
    <p className="elsewhere-footnote">OpenSea and Pump.fun handle the live marketplace activity —<br />StopLoss Comics tells the story.</p>
  </section>;
}
