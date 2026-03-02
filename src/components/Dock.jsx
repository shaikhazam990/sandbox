import React, { useState, useRef } from 'react'
import './dock.scss'

const icons = [
  { key: 'cli',      cls: 'cli',      src: '/doc-icons/cli.png',        label: 'Terminal', action: 'window' },
  { key: 'github',   cls: 'github',   src: '/doc-icons/github.svg',     label: 'GitHub',   action: 'url', url: 'https://github.com/shaikhazam990' },
  { key: 'note',     cls: 'note',     src: '/doc-icons/note.png',       label: 'Notes',    action: 'window' },
  { key: 'resume',   cls: 'pdf',      src: '/doc-icons/pdf.svg',        label: 'Resume',   action: 'window' },
  { key: 'about',    cls: 'about',    src: '/doc-icons/about.png',      label: 'About Me', action: 'window' },
  { key: 'spotify',  cls: 'spotify',  src: '/doc-icons/spotify.svg',    label: 'Spotify',  action: 'window' },
  { key: 'contact',  cls: 'contact',  src: '/doc-icons/contact.png',    label: 'Contact',  action: 'window' },
  { key: 'finder',   cls: 'finder',   src: '/doc-icons/finder.png',     label: 'Finder',   action: 'window' },
  { key: 'settings', cls: 'settings', src: '/doc-icons/settings.png',   label: 'Settings', action: 'window' },
  { key: 'link',     cls: 'link',     src: '/doc-icons/link.png',       label: 'LinkedIn', action: 'url', url: 'https://www.linkedin.com/in/mohd-azam-4956a828a/' },
]

const BASE    = 56   
const MAX     = 90   
const SPREAD  = 2   

function getSize(i, hoveredIdx) {
  if (hoveredIdx === null) return BASE
  const d = Math.abs(i - hoveredIdx)
  if (d === 0) return MAX
  if (d === 1) return BASE + (MAX - BASE) * 0.55
  if (d === 2) return BASE + (MAX - BASE) * 0.2
  return BASE
}

const Dock = ({ windowsState, setWindowsState }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [activeIdx,  setActiveIdx]  = useState(null)

  const handleClick = (icon) => {
    if (icon.action === 'url') {
      window.open(icon.url, '_blank')
    } else {
      setWindowsState(state => ({ ...state, [icon.key]: true }))
    }
  }

  return (
    <footer className="dock" onMouseLeave={() => setHoveredIdx(null)}>
      {icons.map((icon, i) => {
        const size      = getSize(i, hoveredIdx)
        const isHovered = hoveredIdx === i
        const isActive  = activeIdx  === i
        const isOpen    = windowsState?.[icon.key]

        // translateY: lifted proportionally to size increase
        const lift = ((size - BASE) / (MAX - BASE)) * 22

        return (
          <div
            key={icon.key}
            className={`dock-item ${icon.cls}`}
            style={{
              width:     size,
              height:    size,
              transform: isActive
                ? `translateY(${-lift + 4}px) scale(0.92)`
                : `translateY(${-lift}px)`,
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseDown={() =>  setActiveIdx(i)}
            onMouseUp={() =>    setActiveIdx(null)}
            onClick={() => handleClick(icon)}
          >
            {/* Tooltip */}
            <div className={`dock-tooltip${isHovered ? ' visible' : ''}`}>
              {icon.label}
            </div>

            <img src={icon.src} alt={icon.label} draggable={false} />

            {isOpen && <span className="dock-dot" />}
          </div>
        )
      })}
    </footer>
  )
}

export default Dock