import React, { useState } from "react";
import MacWindow from "./MacWindow";
import "./spotify.scss";

const PLAYLISTS = [
  {
    id: "37i9dQZF1DXbVhgADFy3im",
    name: "Trending India",
    desc: "Top hits right now",
    color: "#1db954",
  },
  {
    id: "37i9dQZF1DX0XUsuxWHRQd",
    name: "RapCaviar",
    desc: "Hip-Hop essentials",
    color: "#ff6b6b",
  },
  {
    id: "37i9dQZF1DXcBWIGoYBM5M",
    name: "Today's Top Hits",
    desc: "The biggest songs",
    color: "#a891ff",
  },
  {
    id: "37i9dQZF1DX4dyzvuaRJ0n",
    name: "mint",
    desc: "Fresh new music",
    color: "#4fffb0",
  },
];

const Spotify = ({ windowName, setWindowsState }) => {
  const [active, setActive] = useState(0);

  return (
    <MacWindow
      width="700px"
      height="520px"
      defaultX={Math.max(0, window.innerWidth / 2 - 350)}
      defaultY={Math.max(0, window.innerHeight / 2 - 260)}
      windowName={windowName}
      setWindowsState={setWindowsState}
      title="Spotify"
    >
      <div className="sp-root">

        {/* ── Sidebar tabs ── */}
        <div className="sp-sidebar">
          <div className="sp-sidebar-logo">
            {/* Spotify icon */}
            <svg viewBox="0 0 24 24" fill="#1db954" width="22" height="22">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span>Music</span>
          </div>

          <div className="sp-sidebar-label">Playlists</div>
          {PLAYLISTS.map((p, i) => (
            <button
              key={p.id}
              className={`sp-tab${active === i ? " active" : ""}`}
              style={{ "--accent": p.color }}
              onClick={() => setActive(i)}
            >
              <span className="sp-tab-dot" style={{ background: p.color }} />
              <div className="sp-tab-info">
                <span className="sp-tab-name">{p.name}</span>
                <span className="sp-tab-desc">{p.desc}</span>
              </div>
            </button>
          ))}

          <div className="sp-sidebar-footer">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noreferrer"
              className="sp-open-link"
            >
              Open Spotify ↗
            </a>
          </div>
        </div>

        {/* ── Player ── */}
        <div className="sp-player">
          <iframe
            key={PLAYLISTS[active].id}
            src={`https://open.spotify.com/embed/playlist/${PLAYLISTS[active].id}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            allowFullScreen
            style={{ border: "none", display: "block" }}
          />
        </div>

      </div>
    </MacWindow>
  );
};

export default Spotify;