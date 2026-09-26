export default function FrontlinesSection() {
  return <section id="about" className="frontlines-section section-container page-section" aria-labelledby="about-title">
    <figure className="frontlines-art">
      <img src="/images/frontlines.webp" srcSet="/images/frontlines-960.webp 960w, /images/frontlines.webp 1920w" sizes="(max-width: 650px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 48px), (max-width: 1360px) calc(100vw - 80px), 1280px" width="1920" height="640" loading="lazy" decoding="async" alt="Max, Luna, Chad, and Satoshi sitting together on a hill, looking across the water toward a city skyline at sunset" />
      <figcaption>Somehow, still here. Together.</figcaption>
    </figure>
    <div className="frontlines-copy">
      <div className="frontlines-heading"><p className="eyebrow">A little humor. A little heart. A lot of hopium.</p><h2 id="about-title" className="section-title">Welcome to<br /><span className="brush-heading">the frontlines</span></h2></div>
      <div className="frontlines-story"><p>StopLoss Comics turns the chaos of crypto, startups, AI, and modern markets into humor, heart, and painfully relatable stories.</p><p>It’s about degens, dreamers, disasters — and somehow still being here.</p><ul className="topic-tags" aria-label="Our world"><li>₿ Crypto</li><li>↗ Startups</li><li>✳ AI</li><li>⌁ Markets</li><li>And everything in between</li></ul></div>
    </div>
  </section>;
}
