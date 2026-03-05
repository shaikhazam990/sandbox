import React, { useState } from 'react'
import MacWindow from './MacWindow'
import {
  Terminal as TerminalIcon, FolderOpen, FileText,
  User, Music, StickyNote, Mail, Settings,
} from 'lucide-react'
import './finder.scss'

// ── Keys MUST match windowsState in App.jsx ──────────────────────────────────
const APP_CONFIG = {
  cli:      { label: 'Terminal', color: '#3f3f46', icon: TerminalIcon },
  github:   { label: 'Projects', color: '#3b82f6', icon: FolderOpen   },
  resume:   { label: 'Resume',   color: '#ef4444', icon: FileText      },
  about:    { label: 'About Me', color: '#10b981', icon: User          },
  spotify:  { label: 'Spotify',  color: '#22c55e', icon: Music         },
  note:     { label: 'Notes',    color: '#f59e0b', icon: StickyNote    },
  contact:  { label: 'Contact',  color: '#60a5fa', icon: Mail          },
  settings: { label: 'Settings', color: '#6b7280', icon: Settings      },
}

const FAVORITES    = ['about', 'github', 'resume']
const APPLICATIONS = ['cli', 'spotify', 'note', 'contact']

// ─────────────────────────────────────────────────────────────────────────────

const FinderContent = ({ onOpenApp }) => {
  const [activeItem, setActiveItem] = useState(null)

  const handleClick = (id) => {
    setActiveItem(id)
    onOpenApp(id)
  }

  return (
    <div className="finder-root">

      {/* ── Sidebar ── */}
      <div className="finder-sidebar">

        <div className="finder-sidebar-section-label">Favorites</div>
        {FAVORITES.map(id => {
          const cfg  = APP_CONFIG[id]
          const Icon = cfg.icon
          return (
            <button
              key={id}
              className={`finder-sidebar-item ${activeItem === id ? 'finder-sidebar-item--active' : ''}`}
              onClick={() => handleClick(id)}
            >
              <Icon size={14} style={{ color: cfg.color, flexShrink: 0 }} />
              {cfg.label}
            </button>
          )
        })}

        <div
          className="finder-sidebar-section-label"
          style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          Applications
        </div>
        {APPLICATIONS.map(id => {
          const cfg  = APP_CONFIG[id]
          const Icon = cfg.icon
          return (
            <button
              key={id}
              className={`finder-sidebar-item ${activeItem === id ? 'finder-sidebar-item--active' : ''}`}
              onClick={() => handleClick(id)}
            >
              <Icon size={14} style={{ color: cfg.color, flexShrink: 0 }} />
              {cfg.label}
            </button>
          )
        })}
      </div>

      {/* ── Icon grid ── */}
      <div className="finder-grid">
        {Object.entries(APP_CONFIG).map(([id, cfg]) => {
          const Icon = cfg.icon
          return (
            <button
              key={id}
              className={`finder-app-item ${activeItem === id ? 'finder-app-item--selected' : ''}`}
              onClick={() => handleClick(id)}
            >
              <div className="finder-app-icon" style={{ background: cfg.color }}>
                <Icon size={26} color="#fff" />
              </div>
              <span className="finder-app-label">{cfg.label}</span>
            </button>
          )
        })}
      </div>

    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const Finder = ({ windowName, setWindowsState }) => {
  const handleOpenApp = (id) => {
    setWindowsState(state => ({ ...state, [id]: true }))
  }

  return (
    <MacWindow
      width="780px"
      height="520px"
      windowName={windowName}
      setWindowsState={setWindowsState}
      title="Finder"
    >
      <FinderContent onOpenApp={handleOpenApp} />
    </MacWindow>
  )
}

export default Finder