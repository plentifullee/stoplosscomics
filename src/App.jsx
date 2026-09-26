import { useEffect, useState } from 'react';
import Archive from './Archive';
import Header from './components/Header';
import Hero from './components/Hero';
import CharacterSection from './components/CharacterSection';
import FeaturedComics from './components/FeaturedComics';
import BookSection from './components/BookSection';
import FrontlinesSection from './components/FrontlinesSection';
import ElsewhereSection from './components/ElsewhereSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ComicReader from './components/ComicReader';
import './styles/home.css';
import './styles/sections.css';
import './styles/extensions.css';

export default function App() {
  const [hash, setHash] = useState(/^#\/?(nft|token|tokens)\/?$/i.test(window.location.hash) ? '#elsewhere' : window.location.hash);
  useEffect(() => {
    const onHash = () => {
      if (/^#\/?(nft|token|tokens)\/?$/i.test(window.location.hash)) {
        window.history.replaceState(null, '', '#elsewhere');
      }
      setHash(window.location.hash);
    };
    if (/^#\/?(nft|token|tokens)\/?$/i.test(window.location.hash)) window.history.replaceState(null, '', '#elsewhere');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    const section = document.getElementById(hash.slice(1));
    if (section) section.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
    if (hash === '#main-content') section?.focus({ preventScroll: true });
    document.title = hash.startsWith('#comic/') ? 'Read a comic — StopLoss Comics' : hash === '#comics' ? 'Free comics — StopLoss Comics' : 'StopLoss Comics — Degens. Dreams. Disasters.';
  }, [hash]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    {hash === '#comics' ? <div id="main-content" tabIndex="-1" className="archive-page"><a className="back-home" href="#home">← Back to the chaos</a><Archive /></div> : hash.startsWith('#comic/') ? <ComicReader key={hash} id={hash.slice(7)} /> : <main id="main-content" tabIndex="-1" className="home-main"><Hero /><CharacterSection /><FeaturedComics /><BookSection /><FrontlinesSection /><ElsewhereSection /><FinalCTA /></main>}
    <Footer />
  </>;
}
