import { trackEvent } from '../lib/analytics';
import { extensions } from '../data/extensions';
import ExtensionLink from './ExtensionLink';
export default function Footer() {
  return <footer className="footer-shell"><div className="site-footer section-container footer-groups">
    <div className="footer-identity"><a className="footer-brand" href="#home">STOPLOSS COMICS</a><p>Good comics. Questionable decisions.</p><span>© {new Date().getFullYear()} Plentiful Lee</span></div>
    <nav aria-label="Read"><h2>Read</h2><a href="#comics" onClick={() => trackEvent('comic_archive_click', { location: 'footer' })}>Comics</a><a href="#book">Volume 1</a></nav>
    <nav aria-label="Universe"><h2>Universe</h2><a href="#characters" onClick={() => trackEvent('character_click', { location: 'footer' })}>Characters</a><a href="#about">About</a></nav>
    <nav aria-label="Elsewhere"><h2>Elsewhere</h2>{extensions.map(extension => <ExtensionLink key={extension.id} extension={extension} location="footer">{extension.footerLabel}</ExtensionLink>)}</nav>
  </div></footer>;
}
