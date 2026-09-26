import { useEffect, useRef, useState } from 'react';
import BookLink from './BookLink';
import ExtensionLink from './ExtensionLink';
import { extensions } from '../data/extensions';
import { trackEvent } from '../lib/analytics';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const header = useRef(null);
  const more = useRef(null);
  const moreButton = useRef(null);
  const mobileButton = useRef(null);
  const close = () => { setOpen(false); setMoreOpen(false); };
  useEffect(() => {
    const outside = (event) => {
      if (!header.current?.contains(event.target)) { setOpen(false); setMoreOpen(false); }
      else if (!more.current?.contains(event.target)) setMoreOpen(false);
    };
    const escape = (event) => {
      if (event.key !== 'Escape') return;
      if (moreOpen) { setMoreOpen(false); moreButton.current?.focus(); }
      else if (open) { setOpen(false); mobileButton.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [moreOpen, open]);
  return <header ref={header} className="site-header section-container">
    <a className="wordmark" href="#home" onClick={close} aria-label="StopLoss Comics home">STOPLOSS <span>COMICS</span><i aria-hidden="true">✦</i></a>
    <button ref={mobileButton} className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => { setOpen(!open); setMoreOpen(false); }} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? '✕' : '☰'}</button>
    <nav id="primary-nav" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation">
      <a href="#comics" onClick={() => { close(); trackEvent('comic_archive_click', { location: 'header' }); }}>Comics</a>
      <a href="#book" onClick={close}>The book</a>
      <a href="#characters" onClick={() => { close(); trackEvent('character_click', { location: 'header' }); }}>Characters</a>
      <a href="#about" onClick={close}>About</a>
      <div ref={more} className="header-more" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMoreOpen(false); }}>
        <button ref={moreButton} aria-expanded={moreOpen} aria-controls="more-destinations" onClick={() => setMoreOpen(!moreOpen)}>More <span aria-hidden="true">▾</span></button>
        <div id="more-destinations" className="more-destinations" hidden={!moreOpen}>{extensions.map(extension => <ExtensionLink key={extension.id} extension={extension} location="header_more" onClick={close}><strong>{extension.navTitle}</strong><small>{extension.navDescription}</small></ExtensionLink>)}</div>
      </div>
      <div className="mobile-extensions" aria-label="Elsewhere in the universe">{extensions.map(extension => <ExtensionLink key={extension.id} extension={extension} location="header_more" onClick={close}>{extension.id === 'pumpfun' ? 'Pump.fun' : extension.navTitle}</ExtensionLink>)}</div>
      <div className="mobile-book-link" onClick={close}><BookLink location="mobile_menu" /></div>
    </nav>
    <BookLink location="header" className="header-cta" />
  </header>;
}
