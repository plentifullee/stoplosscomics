import { useEffect, useState } from 'react';
import ConnectPage from './components/ConnectPage';
import ArtsPage from './components/ArtsPage';
import './App.css';
import ComicsArchive from './components/ComicsArchive';
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
import './styles/header.css';

function currentRoute() {
  if (window.location.hash === '#connect' || (/^\/connect\/?$/.test(window.location.pathname) && !window.location.hash)) {
    window.history.replaceState(null, '', `/connect/${window.location.search}`);
    return '#connect';
  }
  if (/^#\/?(nft|token|tokens)\/?$/i.test(window.location.hash)) {
    window.history.replaceState(null, '', '/#elsewhere');
  }
  return window.location.hash;
}

export default function App() {
  const [hash, setHash] = useState(currentRoute);
  useEffect(() => {
    const onRoute = () => setHash(currentRoute());
    window.addEventListener('hashchange', onRoute);
    window.addEventListener('popstate', onRoute);
    return () => {
      window.removeEventListener('hashchange', onRoute);
      window.removeEventListener('popstate', onRoute);
    };
  }, []);
  useEffect(() => {
    const section = document.getElementById(hash.slice(1));
    if (section) section.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
    if (hash === '#main-content') section?.focus({ preventScroll: true });
    document.title = hash === '#connect' ? 'Connect — StopLoss Comics' : hash.startsWith('#comic/') ? 'Read a comic — StopLoss Comics' : hash === '#art' ? 'Arts — StopLoss Comics' : hash === '#comics' ? 'Free comics — StopLoss Comics' : 'StopLoss Comics — Degens. Dreams. Disasters.';
  }, [hash]);
  return <>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); const main = document.getElementById("main-content"); main?.focus({ preventScroll: true }); main?.scrollIntoView({ block: "start" }); }}>Skip to content</a>
    <Header activePage={hash} />
    {hash === '#connect' ? <ConnectPage /> : hash === '#comics' ? <ComicsArchive /> : hash === '#art' ? <ArtsPage /> : hash.startsWith('#comic/') ? <ComicReader key={hash} id={hash.slice(7).split('?')[0]} fromArchive={new URLSearchParams(hash.split('?')[1] || '').get('from') === 'archive'} /> : <main id="main-content" tabIndex="-1" className="home-main"><Hero /><CharacterSection /><FeaturedComics /><BookSection /><FrontlinesSection /><ElsewhereSection /><FinalCTA /></main>}
    <Footer />
  </>;
}
