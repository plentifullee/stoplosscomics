import { useEffect, useRef, useState } from 'react';
import BookLink from './BookLink';
import ExtensionLink from './ExtensionLink';
import { extensions } from '../data/extensions';
import { trackEvent } from '../lib/analytics';

export default function Header({ activePage }) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const update = () => setCompact(window.scrollY > 80);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const [visibleSection, setVisibleSection] = useState(null);
  const standalone = activePage === '#art' || activePage === '#comics' || activePage?.startsWith('#comic/');
  useEffect(() => {
    if (standalone) return;
    let frame;
    const update = () => {
      const sections = [...document.querySelectorAll('.home-main section')];
      const viewTop = 90;
      let best = null;
      let mostVisible = 0;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, viewTop));
        if (visible > mostVisible) { mostVisible = visible; best = section.id; }
      }
      const links = { book: '#book', characters: '#characters', about: '#about', featured: '#comics', elsewhere: '#elsewhere' };
      setVisibleSection(links[best] || null);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    const main = document.querySelector('.home-main');
    if (main) observer.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [activePage, standalone]);
  const selected = standalone ? (activePage.startsWith('#comic/') ? '#comics' : activePage) : visibleSection;
  const current = target => selected === target ? (standalone ? 'page' : 'location') : undefined;
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
  return <div className={`header-dock${compact ? ' is-compact' : ''}`}><header ref={header} className="site-header section-container">
    <a className="wordmark" href="#home" onClick={close} aria-label="StopLoss Comics home">STOPLOSS <span>COMICS</span><i aria-hidden="true">✦</i></a>
    <button ref={mobileButton} className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => { setOpen(!open); setMoreOpen(false); }} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? '✕' : '☰'}</button>
    <nav id="primary-nav" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation">
      <a href="#book" aria-current={current('#book')} onClick={close}>The book</a>
      <a href="#characters" aria-current={current('#characters')} onClick={() => { close(); trackEvent('character_click', { location: 'header' }); }}>Characters</a>
      <a href="#about" aria-current={current('#about')} onClick={close}>About</a>
      <a className="nav-section-start" href="#comics" aria-current={current('#comics')} onClick={() => { close(); trackEvent('comic_archive_click', { location: 'header' }); }}>Comics</a>
      <a href="#art" aria-current={current('#art')} onClick={close}>Arts</a>
      <div ref={more} className="header-more" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMoreOpen(false); }}>
        <button ref={moreButton} aria-current={current('#elsewhere')} aria-expanded={moreOpen} aria-controls="more-destinations" onClick={() => setMoreOpen(!moreOpen)}>More <span aria-hidden="true">▾</span></button>
        <div id="more-destinations" className="more-destinations" hidden={!moreOpen}>{extensions.map(extension => <ExtensionLink key={extension.id} extension={extension} location="header_more" onClick={close}><strong>{extension.navTitle}</strong><small>{extension.navDescription}</small></ExtensionLink>)}</div>
      </div>
      <div className="mobile-extensions" aria-label="Elsewhere in the universe">{extensions.map(extension => <ExtensionLink key={extension.id} extension={extension} location="header_more" onClick={close}>{extension.id === 'pumpfun' ? 'Pump.fun' : extension.navTitle}</ExtensionLink>)}</div>
      <div className="mobile-book-link" onClick={close}><BookLink location="mobile_menu" /></div>
    </nav>
    <BookLink location="header" className="header-cta" />
  </header></div>;
}
