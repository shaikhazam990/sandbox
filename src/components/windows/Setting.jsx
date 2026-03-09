import React, { useState } from 'react'
import MacWindow from './MacWindow'
import './setting.scss'

const WALLPAPERS = [
  // 🏔️ Nature
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=90&w=1920', name: 'Alpine Peak',     category: 'Nature' },
  { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=90&w=1920', name: 'Mountain Fog',    category: 'Nature' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=90&w=1920', name: 'Green Valley',    category: 'Nature' },
  { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=90&w=1920', name: 'Sun Rays Forest', category: 'Nature' },
  { url: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&q=90&w=1920', name: 'Desert Dunes',    category: 'Nature' },

  // 🌌 Space
  { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=90&w=1920', name: 'Galaxy Core',    category: 'Space' },
  { url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=90&w=1920', name: 'Nebula',         category: 'Space' },
  { url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=90&w=1920', name: 'Milky Way',      category: 'Space' },

  // 🌊 Ocean
  { url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=90&w=1920', name: 'Ocean Sunset',   category: 'Ocean' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=90&w=1920', name: 'Crystal Beach',  category: 'Ocean' },
  { url: 'https://images.unsplash.com/photo-1504598318550-17eba1008a68?auto=format&fit=crop&q=90&w=1920', name: 'Lake Reflection',category: 'Ocean' },

  // 🌆 City
  { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=90&w=1920', name: 'City Lights',    category: 'City' },
  { url: 'https://images.unsplash.com/photo-1514565131-fce0801e6402?auto=format&fit=crop&q=90&w=1920', name: 'Neon Night',      category: 'City' },
  { url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=90&w=1920', name: 'Rainy Streets',  category: 'City' },

  // 🌅 Sky
  { url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=90&w=1920', name: 'Fire Sunset',    category: 'Sky' },
  { url: 'https://images.unsplash.com/photo-1502790671504-542ad42d5189?auto=format&fit=crop&q=90&w=1920', name: 'Pink Clouds',    category: 'Sky' },
  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=90&w=1920', name: 'Starry Night',   category: 'Sky' },
  { url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=90&w=1920', name: 'Aurora Borealis',category: 'Sky' },
]

const CATEGORIES = ['All', 'Nature', 'Space', 'Ocean', 'City', 'Sky']

const NAV = [
  { id: 'about',     icon: '👤', label: 'About Me' },
  { id: 'wallpaper', icon: '🖼️', label: 'Wallpaper' },
  { id: 'general',   icon: '⚙️', label: 'General' },
]

const SKILLS = [
  { name: 'React',      level: 90, color: '#61dafb' },
  { name: 'Node.js',    level: 82, color: '#68d391' },
  { name: 'MongoDB',    level: 75, color: '#48bb78' },
  { name: 'JavaScript', level: 88, color: '#f6e05e' },
  { name: 'CSS/SCSS',   level: 85, color: '#f687b3' },
]

const SettingsContent = ({ wallpaper, setWallpaper }) => {
  const [active, setActive] = useState('about')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? WALLPAPERS
    : WALLPAPERS.filter(w => w.category === activeCategory)

  return (
    <div className="sp-root">
      <nav className="sp-sidebar">
        <div className="sp-avatar">
          <div className="sp-avatar-ring">
            <div className="sp-avatar-inner">MA</div>
          </div>
          <p className="sp-avatar-name">Mohd Azam</p>
          <p className="sp-avatar-role">Full-Stack Developer</p>
        </div>
        <ul className="sp-nav">
          {NAV.map(n => (
            <li key={n.id} className={`sp-nav-item${active === n.id ? ' active' : ''}`} onClick={() => setActive(n.id)}>
              <span className="sp-nav-icon">{n.icon}</span>
              <span>{n.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <main className="sp-content">

        {active === 'about' && (
          <div className="sp-panel">
            <h2 className="sp-panel-title">About Me</h2>
            <div className="sp-info-card">
              <div className="sp-info-row"><span className="sp-key">Name</span><span className="sp-val">Mohd Azam</span></div>
              <div className="sp-info-row"><span className="sp-key">Role</span><span className="sp-val">Full-Stack Developer</span></div>
              <div className="sp-info-row"><span className="sp-key">Stack</span><span className="sp-val">React · Node.js · MongoDB</span></div>
              <div className="sp-info-row"><span className="sp-key">LeetCode</span><span className="sp-val">200+ solved</span></div>
              <div className="sp-info-row"><span className="sp-key">Email</span><span className="sp-val sp-link">shaikhazam0990@gmail.com</span></div>
              <div className="sp-info-row"><span className="sp-key">Status</span><span className="sp-val sp-green">● Open to Internships</span></div>
            </div>
            <h3 className="sp-sub-title">Skills</h3>
            <div className="sp-skills">
              {SKILLS.map(s => (
                <div key={s.name} className="sp-skill">
                  <div className="sp-skill-header">
                    <span className="sp-skill-name">{s.name}</span>
                    <span className="sp-skill-pct">{s.level}%</span>
                  </div>
                  <div className="sp-skill-track">
                    <div className="sp-skill-fill" style={{ width: `${s.level}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'wallpaper' && (
          <div className="sp-panel">
            <h2 className="sp-panel-title">Desktop Wallpaper</h2>

            <div className="sp-wp-preview">
              <img src={wallpaper} alt="current" />
              <div className="sp-wp-preview-overlay">
                <span className="sp-wp-badge">✓ Active Wallpaper</span>
              </div>
            </div>

            <div className="sp-wp-categories">
              {CATEGORIES.map(cat => (
                <button key={cat} className={`sp-cat-pill${activeCategory === cat ? ' active' : ''}`} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="sp-wp-grid">
              {filtered.map((w, i) => (
                <div key={i} className={`sp-wp-item${wallpaper === w.url ? ' active' : ''}`} onClick={() => setWallpaper(w.url)}>
                  <img src={w.url} alt={w.name} loading="lazy" />
                  <div className="sp-wp-info">
                    <span className="sp-wp-name">{w.name}</span>
                    <span className="sp-wp-cat">{w.category}</span>
                  </div>
                  {wallpaper === w.url && <div className="sp-wp-check">✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'general' && (
          <div className="sp-panel">
            <h2 className="sp-panel-title">General</h2>
            <div className="sp-info-card">
              <div className="sp-info-row"><span className="sp-key">OS</span><span className="sp-val">macOS Portfolio</span></div>
              <div className="sp-info-row"><span className="sp-key">Version</span><span className="sp-val">1.0.0</span></div>
              <div className="sp-info-row"><span className="sp-key">Built with</span><span className="sp-val">React + Vite</span></div>
              <div className="sp-info-row"><span className="sp-key">Designed by</span><span className="sp-val">Mohd Azam</span></div>
            </div>
            <h3 className="sp-sub-title">Connect</h3>
            <div className="sp-links">
              <a href="https://github.com/shaikhazam990" target="_blank" rel="noreferrer" className="sp-link-btn sp-github"><span>🐙</span> GitHub</a>
              <a href="https://www.linkedin.com/in/mohd-azam-4956a828a/" target="_blank" rel="noreferrer" className="sp-link-btn sp-linkedin"><span>💼</span> LinkedIn</a>
              <a href="mailto:shaikhazam0990@gmail.com" className="sp-link-btn sp-mail"><span>✉️</span> Email Me</a>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

const Settings = ({ windowName, setWindowsState, wallpaper, setWallpaper }) => (
  <MacWindow
    width="760px"
    height="560px"
    windowName={windowName}
    setWindowsState={setWindowsState}
    title="System Preferences"
  >
    <SettingsContent wallpaper={wallpaper} setWallpaper={setWallpaper} />
  </MacWindow>
)

export default Settings