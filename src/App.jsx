// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

const PAGE_SIZE = 12;

// JSON sources per category
const DATA_SOURCES = {
  comic:
    "https://raw.githubusercontent.com/plentifullee/stoplosscomics/refs/heads/main/comic.json",
  art:
    "https://raw.githubusercontent.com/plentifullee/stoplosscomics/refs/heads/main/art.json",
  nft:
    "https://raw.githubusercontent.com/plentifullee/stoplosscomics/refs/heads/main/nft.json",
  token:
    "https://raw.githubusercontent.com/plentifullee/stoplosscomics/refs/heads/main/token.json",
};

const TABS = [
  { id: "comic", label: "Comic" },
  { id: "art", label: "Art" },
  { id: "nft", label: "NFT" },
  { id: "token", label: "Token" },
];

const LAYOUTS = [
  { id: "compact", label: "Compact" },
  { id: "grid", label: "Grid" },
  { id: "single", label: "Single" },
];

const SWIPE_THRESHOLD = 50; // pixels

// Convert URLs inside plain text into React clickable links
function linkify(text) {
  if (!text) return text;

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="description-link"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function App() {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("comic");
  const [searchQuery, setSearchQuery] = useState("");

  const [fullscreenIndex, setFullscreenIndex] = useState(null); // index in filteredItems
  const [dragStart, setDragStart] = useState(null); // for swipe/drag

  const [layout, setLayout] = useState("grid"); // compact | grid | single

  // Load JSON for the active tab
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const url = DATA_SOURCES[activeTab];
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load data");

        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Could not load data for this category.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [activeTab]);

  // Reset paging and fullscreen when tab/search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setFullscreenIndex(null);
  }, [activeTab, searchQuery]);

  // Keyboard navigation in fullscreen
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setFullscreenIndex(null);
      } else if (e.key === "ArrowRight") {
        setFullscreenIndex((idx) =>
          idx === null || idx >= filteredItems.length - 1 ? idx : idx + 1
        );
      } else if (e.key === "ArrowLeft") {
        setFullscreenIndex((idx) => (idx === null || idx <= 0 ? idx : idx - 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Filtering
  const query = searchQuery.toLowerCase().trim();

  const filteredItems = items.filter((item) => {
    if (!query) return true;
    const title = (item.title || "").toLowerCase();
    const description = (item.description || "").toLowerCase();
    return title.includes(query) || description.includes(query);
  });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const isSquare = activeTab === "nft" || activeTab === "token";

  // Open fullscreen for clicked card
  const handleCardClick = (id) => {
    const index = filteredItems.findIndex((item) => item.id === id);
    if (index !== -1) setFullscreenIndex(index);
  };

  const closeFullscreen = () => setFullscreenIndex(null);

  const showPrev = () => {
    setFullscreenIndex((idx) => (idx !== null && idx > 0 ? idx - 1 : idx));
  };

  const showNext = () => {
    setFullscreenIndex((idx) =>
      idx !== null && idx < filteredItems.length - 1 ? idx + 1 : idx
    );
  };

  const currentItem =
    fullscreenIndex !== null ? filteredItems[fullscreenIndex] : null;

  // Pointer-based swipe / drag handlers (mouse + touch)
  const handlePointerDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e) => {
    if (!dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    // Only treat as swipe if mostly horizontal and above threshold
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) {
        // dragged left -> go next
        showNext();
      } else {
        // dragged right -> go prev
        showPrev();
      }
    }
    setDragStart(null);
  };

  const handlePointerCancel = () => {
    setDragStart(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="StopLossComics"
            className="app-logo"
          />
        </div>

        <div className="app-subtitle">COMICS &amp; ART VIEWER</div>
      </header>


      {/* Tabs + search + layout switcher */}
      <div className="tabs-container">
        {/* First row: tabs + search */}
        <div className="tabs-row">
          <div className="tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={
                  "tab-button" + (activeTab === tab.id ? " tab-button-active" : "")
                }
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Second row: layout controls (hidden on mobile via CSS) */}
        <div className="layout-row">
          <div className="layout-wrapper">
            <div className="layout-label">View:</div>
            <div className="layout-switcher">
              {LAYOUTS.map((opt) => (
                <button
                  key={opt.id}
                  className={
                    "layout-button" +
                    (layout === opt.id ? " layout-button-active" : "")
                  }
                  onClick={() => setLayout(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Loading / error */}
      {loading && (
        <div style={{ textAlign: "center", padding: 20 }}>Loading…</div>
      )}
      {error && (
        <div style={{ textAlign: "center", padding: 20, color: "red" }}>
          {error}
        </div>
      )}

      {/* Gallery */}
      {!loading && !error && (
        <>
          <main className={`gallery gallery-${layout}`}>
            {visibleItems.map((item) => (
              <article
                key={item.id}
                className={`card ${isSquare ? "card-square" : "card-portrait"}`}
                onClick={() => handleCardClick(item.id)}
              >
                <div className="card-image-wrapper">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="card-image"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </main>

          {!visibleItems.length && (
            <p style={{ textAlign: "center", padding: 20 }}>
              No items found in this category.
            </p>
          )}

          {hasMore && (
            <div style={{ textAlign: "center", padding: "16px" }}>
              <button
                onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
                className="load-more-button"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}

      {/* Fullscreen viewer */}
      {currentItem && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="fullscreen-close" onClick={closeFullscreen}>
              ✕
            </button>

            <div
              className="fullscreen-image-wrapper"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="fullscreen-image"
              />
            </div>

            <div className="fullscreen-nav">
              <button
                className="fullscreen-nav-button"
                onClick={showPrev}
                disabled={fullscreenIndex === 0}
              >
                ← Prev
              </button>
              <button
                className="fullscreen-nav-button"
                onClick={showNext}
                disabled={fullscreenIndex === filteredItems.length - 1}
              >
                Next →
              </button>
            </div>

            <div className="fullscreen-meta">
              <h2 className="fullscreen-title">{currentItem.title}</h2>
              {currentItem.description && (
                <p className="fullscreen-description">
                  {linkify(currentItem.description)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
