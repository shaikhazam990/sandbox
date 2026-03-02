import React, { useState, useEffect } from 'react'
import Dock      from './components/Dock'
import Nav       from './components/Nav'
import Spotlight from './components/windows/Spotlight'

// existing windows
import Github  from './components/windows/Github'
import Note    from './components/Note'
import Resume  from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli     from './components/windows/Cli'

// new windows
import Finder   from './components/windows/Finder'
import Settings from './components/windows/Setting'
import About    from './components/windows/About'
import Contact  from './components/windows/Contact'

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1920',
]

const App = () => {
  const [windowsState, setWindowsState] = useState({
    github:   false,
    note:     false,
    resume:   false,
    spotify:  false,
    cli:      false,
    finder:   false,
    settings: false,
    about:    false,
    contact:  false,
  })

  const [wallpaper,    setWallpaper]    = useState(WALLPAPERS[0])
  const [wallpaperIdx, setWallpaperIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWallpaperIdx(i => {
        const next = (i + 1) % WALLPAPERS.length
        setWallpaper(WALLPAPERS[next])
        return next
      })
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Spotlight — always mounted, Cmd+k toggles it */}
      <Spotlight setWindowsState={setWindowsState} />

      <main
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Nav />
        <Dock windowsState={windowsState} setWindowsState={setWindowsState} />

        {windowsState.github   && <Github   windowName="github"   setWindowsState={setWindowsState} />}
        {windowsState.note     && <Note     windowName="note"     setWindowsState={setWindowsState} />}
        {windowsState.resume   && <Resume   windowName="resume"   setWindowsState={setWindowsState} />}
        {windowsState.spotify  && <Spotify  windowName="spotify"  setWindowsState={setWindowsState} />}
        {windowsState.cli      && <Cli      windowName="cli"      setWindowsState={setWindowsState} />}
        {windowsState.about    && <About    windowName="about"    setWindowsState={setWindowsState} />}
        {windowsState.contact  && <Contact  windowName="contact"  setWindowsState={setWindowsState} />}
        {windowsState.finder   && <Finder   windowName="finder"   setWindowsState={setWindowsState} />}
        {windowsState.settings && <Settings windowName="settings" setWindowsState={setWindowsState} wallpaper={wallpaper} setWallpaper={setWallpaper} />}
      </main>
    </>
  )
}

export default App