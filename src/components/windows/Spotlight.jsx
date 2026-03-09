import React, { useState, useEffect, useRef } from 'react'
import {
  Terminal as TerminalIcon, FolderOpen, FileText,
  User, Music, StickyNote, Mail, Settings, Github, Search,
} from 'lucide-react'
import './spotlight.scss'

const APPS = [
  { id: 'cli',      label: 'Terminal',  subtitle: 'Open terminal',          icon: TerminalIcon, color: '#3f3f46' },
  { id: 'github',   label: 'Projects',  subtitle: 'View my work',           icon: Github,       color: '#3b82f6' },
  { id: 'resume',   label: 'Resume',    subtitle: 'Download / view CV',     icon: FileText,     color: '#ef4444' },
  { id: 'about',    label: 'About Me',  subtitle: 'Who am I?',              icon: User,         color: '#10b981' },
  { id: 'spotify',  label: 'Spotify',   subtitle: "What I'm listening to",  icon: Music,        color: '#22c55e' },
  { id: 'note',     label: 'Notes',     subtitle: 'Quick notes',            icon: StickyNote,   color: '#f59e0b' },
  { id: 'contact',  label: 'Contact',   subtitle: 'Get in touch',           icon: Mail,         color: '#60a5fa' },
  { id: 'settings', label: 'Settings',  subtitle: 'Preferences',            icon: Settings,     color: '#6b7280' },
  { id: 'finder',   label: 'Finder',    subtitle: 'Browse all apps',        icon: FolderOpen,   color: '#2563eb' },
]

const Spotlight = ({ setWindowsState }) => {
  const [open,   setOpen]   = useState(false)
  const [query,  setQuery]  = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef            = useRef(null)

  // Cmd+K to toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey && e.code === 'KeyK') {
        e.preventDefault()
        setOpen(v => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const filtered = query.trim() === ''
    ? APPS
    : APPS.filter(a =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(query.toLowerCase())
      )

  useEffect(() => { setCursor(0) }, [query])

  const openApp = (id) => {
    setWindowsState(s => ({ ...s, [id]: true }))
    setOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor(c => Math.min(c + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor(c => Math.max(c - 1, 0))
    } else if (e.key === 'Enter' && filtered[cursor]) {
      openApp(filtered[cursor].id)
    }
  }

  return (
    <>
      {/* ── Floating search button on desktop ── */}
      <button className="spotlight-fab" onClick={() => setOpen(true)} title="Search (⌘K)">
        <Search size={15} color="rgba(255,255,255,0.8)" />
        <span className="spotlight-fab-text">Search</span>
        <kbd className="spotlight-fab-kbd">⌘K</kbd>
      </button>

      {/* ── Modal ── */}
      {open && (
        <div className="spotlight-overlay" onClick={() => setOpen(false)}>
          <div className="spotlight-panel" onClick={e => e.stopPropagation()}>

            <div className="spotlight-input-row">
              <svg className="spotlight-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
              <input
                ref={inputRef}
                className="spotlight-input"
                placeholder="Search apps..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button className="spotlight-clear" onClick={() => setQuery('')}>✕</button>
              )}
            </div>

            {filtered.length > 0 && (
              <div className="spotlight-results">
                {query === '' && <div className="spotlight-section-label">Applications</div>}
                {filtered.map((app, i) => {
                  const Icon = app.icon
                  return (
                    <button
                      key={app.id}
                      className={`spotlight-result-item ${i === cursor ? 'spotlight-result-item--active' : ''}`}
                      onClick={() => openApp(app.id)}
                      onMouseEnter={() => setCursor(i)}
                    >
                      <div className="spotlight-result-icon" style={{ background: app.color }}>
                        <Icon size={16} color="#fff" />
                      </div>
                      <div className="spotlight-result-text">
                        <span className="spotlight-result-label">{app.label}</span>
                        <span className="spotlight-result-sub">{app.subtitle}</span>
                      </div>
                      {i === cursor && <span className="spotlight-result-enter">↵</span>}
                    </button>
                  )
                })}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="spotlight-empty">No results for "{query}"</div>
            )}

            <div className="spotlight-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Spotlight