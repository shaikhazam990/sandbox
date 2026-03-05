import React, { useState, useRef, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import './window.scss'

const MacWindow = ({
  children,
  width  = "50vw",
  height = "60vh",
  defaultX,
  defaultY,
  windowName,
  setWindowsState,
  title = "AzamShaikh — zsh"
}) => {
  const [minimized,  setMinimized]  = useState(false)
  const [maximized,  setMaximized]  = useState(false)
  const [closing,    setClosing]    = useState(false)
  const [hoverDots,  setHoverDots]  = useState(false)
  const [focused,    setFocused]    = useState(true)
  const [zIdx,       setZIdx]       = useState(200)

  const prevSize = useRef({ width, height, x: defaultX ?? 300, y: defaultY ?? 100 })
  const rndRef   = useRef(null)

  // ── Auto-focus (bring to front) on mount ──
  useEffect(() => {
    bringToFront()
  }, [])

  const bringToFront = () => {
    // Simple global z-index increment
    window.__topZ = (window.__topZ || 200) + 1
    setZIdx(window.__topZ)
    setFocused(true)
  }

  // ── Red: close with animation ──
  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      setWindowsState(state => ({ ...state, [windowName]: false }))
    }, 220)
  }

  // ── Yellow: collapse to title bar ──
  const handleMinimize = () => {
    setMinimized(v => !v)
    if (maximized) setMaximized(false)
  }

  // ── Green: fullscreen toggle ──
  const handleMaximize = () => {
    if (!maximized) {
      if (rndRef.current) {
        const el = rndRef.current.resizableElement.current
        prevSize.current = {
          width:  el.offsetWidth,
          height: el.offsetHeight,
          x: rndRef.current.draggable?.state?.x ?? 300,
          y: rndRef.current.draggable?.state?.y ?? 100,
        }
      }
      rndRef.current?.updatePosition({ x: 0, y: 0 })
      rndRef.current?.updateSize({ width: window.innerWidth, height: window.innerHeight })
    } else {
      rndRef.current?.updatePosition({ x: prevSize.current.x, y: prevSize.current.y })
      rndRef.current?.updateSize({ width: prevSize.current.width, height: prevSize.current.height })
    }
    setMaximized(v => !v)
    if (minimized) setMinimized(false)
  }

  // ── Compute default position: center if not provided ──
  const toPixels = (val, axis) => {
    if (typeof val === 'number') return val
    if (typeof val === 'string') {
      if (val.endsWith('vw'))  return (parseFloat(val) / 100) * window.innerWidth
      if (val.endsWith('vh'))  return (parseFloat(val) / 100) * window.innerHeight
      if (val.endsWith('px'))  return parseFloat(val)
      if (val.endsWith('%'))   return (parseFloat(val) / 100) * (axis === 'x' ? window.innerWidth : window.innerHeight)
    }
    return axis === 'x' ? window.innerWidth * 0.5 : window.innerHeight * 0.5
  }

  const wPx    = toPixels(width,  'x')
  const hPx    = toPixels(height, 'y')
  const startX = defaultX !== undefined ? defaultX : Math.max(0, Math.round((window.innerWidth  / 2) - (wPx / 2)))
  const startY = defaultY !== undefined ? defaultY : Math.max(0, Math.round((window.innerHeight / 2) - (hPx / 2)))

  return (
    <Rnd
      ref={rndRef}
      default={{ width, height, x: startX, y: startY }}
      minWidth={320}
      minHeight={minimized ? 44 : 200}
      disableDragging={maximized}
      enableResizing={!maximized && !minimized}
      dragHandleClassName="window-nav"
      bounds="window"
      style={{ zIndex: zIdx }}
      onMouseDown={bringToFront}
      onDragStop={() => setFocused(true)}
    >
      <div className={[
        'mac-window',
        closing   ? 'is-closing'   : '',
        minimized ? 'is-minimized' : '',
        maximized ? 'is-maximized' : '',
        focused   ? 'is-focused'   : 'is-blurred',
      ].filter(Boolean).join(' ')}>

        {/* ── Title bar ── */}
        <div
          className="window-nav"
          onMouseEnter={() => setHoverDots(true)}
          onMouseLeave={() => setHoverDots(false)}
          onDoubleClick={handleMaximize}
        >
          <div className="window-dots">
            <button className="dot dot-red"    onClick={handleClose}    title="Close">
              {hoverDots && <span className="dot-icon">✕</span>}
            </button>
            <button className="dot dot-yellow" onClick={handleMinimize} title="Minimize">
              {hoverDots && <span className="dot-icon">–</span>}
            </button>
            <button className="dot dot-green"  onClick={handleMaximize} title={maximized ? 'Restore' : 'Maximize'}>
              {hoverDots && <span className="dot-icon">{maximized ? '↙' : '↗'}</span>}
            </button>
          </div>

          <div className="window-title">{title}</div>
          <div className="window-title-spacer" />
        </div>

        {/* ── Body ── */}
        <div className="window-body">
          {children}
        </div>

        {/* ── Resize hint corners (visual only) ── */}
        {!maximized && !minimized && (
          <>
            <div className="resize-corner tl" />
            <div className="resize-corner tr" />
            <div className="resize-corner bl" />
            <div className="resize-corner br" />
          </>
        )}
      </div>
    </Rnd>
  )
}

export default MacWindow