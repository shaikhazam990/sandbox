import React, { useState, useEffect, useRef } from 'react'
import MacWindow from './MacWindow'
import './cli.scss'

const BOOT_SEQUENCE = [
  { type: 'system', text: 'Initializing portfolio terminal...' },
  { type: 'system', text: 'Loading profile data..................... OK' },
  { type: 'system', text: 'Mounting file system..................... OK' },
  { type: 'system', text: 'Starting shell session................... OK' },
  { type: 'spacer' },
  { type: 'banner-line', text: '┌─────────────────────────────────────────────┐' },
  { type: 'banner-line', text: '│   Mohd Azam · Full-Stack Developer          │' },
  { type: 'banner-line', text: '│   Portfolio Terminal  ·  v3.0               │' },
  { type: 'banner-line', text: '│   Type  help  to explore                    │' },
  { type: 'banner-line', text: '└─────────────────────────────────────────────┘' },
  { type: 'spacer' },
  { type: 'status-row', items: [
    { label: 'STATUS',   value: '● Available for hire', color: 'green' },
    { label: 'LOCATION', value: 'India',                color: 'blue' },
    { label: 'LEETCODE', value: '200+ solved',          color: 'yellow' },
  ]},
  { type: 'spacer' },
]

const COMMANDS = {
  help: {
    desc: 'List all commands',
    fn: () => [
      { type: 'section', text: 'COMMANDS' },
      { type: 'cmd-row', cmd: 'whoami',     desc: 'Display current user info' },
      { type: 'cmd-row', cmd: 'about',      desc: 'Who I am & my story' },
      { type: 'cmd-row', cmd: 'skills',     desc: 'Technical skill stack' },
      { type: 'cmd-row', cmd: 'projects',   desc: 'Projects I have built' },
      { type: 'cmd-row', cmd: 'experience', desc: 'My learning journey' },
      { type: 'cmd-row', cmd: 'contact',    desc: 'How to reach me' },
      { type: 'cmd-row', cmd: 'social',     desc: 'All social profiles' },
      { type: 'cmd-row', cmd: 'open',       desc: 'open github|linkedin|leetcode' },
      { type: 'cmd-row', cmd: 'date',       desc: 'Show current date & time' },
      { type: 'cmd-row', cmd: 'ls',         desc: 'List available sections' },
      { type: 'cmd-row', cmd: 'neofetch',   desc: 'System info (portfolio style)' },
      { type: 'cmd-row', cmd: 'cat',        desc: 'cat readme.md' },
      { type: 'cmd-row', cmd: 'clear',      desc: 'Clear terminal screen' },
      { type: 'cmd-row', cmd: 'echo',       desc: 'echo <text>' },
      { type: 'spacer' },
      { type: 'dim', text: '  Use ↑↓ to navigate history · Tab to autocomplete' },
    ]
  },

  whoami: {
    desc: 'Display current user',
    fn: () => [
      { type: 'kv', key: 'user',   value: 'mohd-azam' },
      { type: 'kv', key: 'role',   value: 'Full-Stack Developer' },
      { type: 'kv', key: 'shell',  value: 'portfolio-sh 3.0' },
      { type: 'kv', key: 'host',   value: 'azam-macbook.local' },
      { type: 'kv', key: 'uptime', value: 'final year CSE student' },
      { type: 'kv', key: 'status', value: '● open to internships', color: 'green' },
    ]
  },

  about: {
    desc: 'About me',
    fn: () => [
      { type: 'section', text: 'ABOUT' },
      { type: 'para', text: 'Passionate Full-Stack Developer who loves turning ideas into real, scalable products. Started with curiosity about how the web works — became obsessed with building clean, performant applications.' },
      { type: 'spacer' },
      { type: 'bullet', icon: '▸', color: 'green',  text: 'MERN stack specialist — React, Node.js, MongoDB' },
      { type: 'bullet', icon: '▸', color: 'blue',   text: 'Currently building Moodify — AI music recommender' },
      { type: 'bullet', icon: '▸', color: 'yellow', text: '200+ LeetCode problems · strong DSA foundation' },
      { type: 'bullet', icon: '▸', color: 'purple', text: 'Final year CSE student · India' },
    ]
  },

  skills: {
    desc: 'Technical skills',
    fn: () => [
      { type: 'section', text: 'SKILLS' },
      { type: 'skill-bar', label: 'React / Next.js',   pct: 90, color: 'blue'   },
      { type: 'skill-bar', label: 'JavaScript / TS',   pct: 88, color: 'yellow' },
      { type: 'skill-bar', label: 'CSS / Sass',        pct: 85, color: 'pink'   },
      { type: 'skill-bar', label: 'Node.js / Express', pct: 82, color: 'green'  },
      { type: 'skill-bar', label: 'MongoDB / Redis',   pct: 75, color: 'green'  },
      { type: 'skill-bar', label: 'System Design',     pct: 65, color: 'purple' },
      { type: 'spacer' },
      { type: 'tag-group', label: 'Tools  ', tags: ['Git', 'GitHub', 'Docker', 'Postman', 'Vite', 'VS Code'] },
    ]
  },

  projects: {
    desc: 'My projects',
    fn: () => [
      { type: 'section', text: 'PROJECTS' },
      { type: 'project', num: '01', name: 'Moodify',          badge: 'AI · WIP', color: 'purple', tech: 'React · Node.js · MongoDB · Gen AI',  desc: 'Emotion-driven music recommendation using AI to detect user mood.' },
      { type: 'spacer' },
      { type: 'project', num: '02', name: 'Portfolio OS',     badge: 'Live',     color: 'green',  tech: 'React · Vite · SCSS',                  desc: 'macOS-inspired interactive portfolio with windows, dock & terminal.' },
      { type: 'spacer' },
      { type: 'project', num: '03', name: 'REST API Service', badge: 'Backend',  color: 'blue',   tech: 'Node.js · Express · MongoDB · Redis',  desc: 'Scalable RESTful API with JWT auth, rate limiting & clean architecture.' },
      { type: 'spacer' },
      { type: 'dim', text: "  → run 'open github' to see all projects" },
    ]
  },

  experience: {
    desc: 'My journey',
    fn: () => [
      { type: 'section', text: 'EXPERIENCE' },
      { type: 'timeline', year: '2025 →', text: 'Building Moodify · Exploring Gen AI · DevOps' },
      { type: 'timeline', year: '2024',   text: 'Full-stack MERN projects · DSA grind 200+ problems' },
      { type: 'timeline', year: '2023',   text: 'Mastered React + Node.js + MongoDB stack' },
      { type: 'timeline', year: '2022',   text: 'Started CSE · HTML, CSS, JS fundamentals' },
      { type: 'spacer' },
      { type: 'kv', key: 'degree',  value: 'B.Tech Computer Science & Engineering' },
      { type: 'kv', key: 'year',    value: 'Final Year (2025)' },
      { type: 'kv', key: 'looking', value: '● Actively seeking internships', color: 'green' },
    ]
  },

  contact: {
    desc: 'Contact info',
    fn: () => [
      { type: 'section', text: 'CONTACT' },
      { type: 'contact-row', icon: '✉', label: 'email   ', value: 'shaikhazam0990@gmail.com' },
      { type: 'contact-row', icon: '⬡', label: 'linkedin', value: '/in/mohd-azam-4956a828a' },
      { type: 'contact-row', icon: '◈', label: 'github  ', value: 'github.com/shaikhazam990' },
      { type: 'contact-row', icon: '◎', label: 'leetcode', value: 'Mohd_Azam0823 · 200+' },
      { type: 'spacer' },
      { type: 'success', text: '  Response within 24h. Always up for a chat 🚀' },
    ]
  },

  social: {
    desc: 'Social links',
    fn: () => [
      { type: 'section', text: 'SOCIAL' },
      { type: 'link-row', label: 'GitHub   ', url: 'https://github.com/shaikhazam990' },
      { type: 'link-row', label: 'LinkedIn ', url: 'https://www.linkedin.com/in/mohd-azam-4956a828a/' },
      { type: 'link-row', label: 'LeetCode ', url: 'https://leetcode.com/u/Mohd_Azam0823/' },
      { type: 'link-row', label: 'Email    ', url: 'mailto:shaikhazam0990@gmail.com' },
    ]
  },

  open: {
    desc: 'open github|linkedin|leetcode',
    fn: (target) => {
      const urls = {
        github:   'https://github.com/shaikhazam990',
        linkedin: 'https://www.linkedin.com/in/mohd-azam-4956a828a/',
        leetcode: 'https://leetcode.com/u/Mohd_Azam0823/',
      }
      if (!target || !urls[target]) return [{ type: 'error', text: '  Usage: open github|linkedin|leetcode' }]
      window.open(urls[target], '_blank')
      return [{ type: 'success', text: `  ✓ Opening ${target} in new tab...` }]
    }
  },

  date: {
    desc: 'Show date/time',
    fn: () => {
      const now = new Date()
      return [
        { type: 'kv', key: 'date', value: now.toDateString() },
        { type: 'kv', key: 'time', value: now.toLocaleTimeString() },
        { type: 'kv', key: 'zone', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
      ]
    }
  },

  ls: {
    desc: 'List sections',
    fn: () => [
      { type: 'ls-grid', items: ['about/', 'skills/', 'projects/', 'experience/', 'contact/', 'social/', 'readme.md', 'resume.pdf'] },
    ]
  },

  neofetch: {
    desc: 'System info',
    fn: () => [{ type: 'neo' }]
  },

  cat: {
    desc: 'cat readme.md',
    fn: (file) => {
      if (file !== 'readme.md') return [{ type: 'error', text: `  cat: ${file}: No such file — try 'cat readme.md'` }]
      return [
        { type: 'section', text: 'README.md' },
        { type: 'para', text: '# Mohd Azam — Portfolio' },
        { type: 'spacer' },
        { type: 'para', text: 'Interactive macOS-style portfolio built with React + Vite. Navigate using the dock or the terminal.' },
        { type: 'spacer' },
        { type: 'bullet', icon: '•', color: 'green',  text: 'React + Vite + SCSS — zero UI library' },
        { type: 'bullet', icon: '•', color: 'blue',   text: 'Draggable windows, animated dock, working terminal' },
        { type: 'bullet', icon: '•', color: 'yellow', text: 'Wallpaper switcher, Spotify window, Notes, Resume' },
        { type: 'spacer' },
        { type: 'dim', text: '  github.com/shaikhazam990 · MIT License' },
      ]
    }
  },

  echo: {
    desc: 'echo <text>',
    fn: (...args) => [{ type: 'text', text: '  ' + args.join(' ') }]
  },
}

// ── Neofetch ──
function NeoFetch() {
  const info = [
    ['OS',     'Portfolio OS 3.0'],
    ['Host',   'azam-macbook.local'],
    ['Shell',  'portfolio-sh 3.0'],
    ['Stack',  'React · Node.js · MongoDB'],
    ['DE',     'macOS UI Clone'],
    ['Theme',  'Hacker Dark'],
    ['Font',   'JetBrains Mono'],
    ['Status', '● Open to Internships'],
  ]
  return (
    <div className="cli-neo">
      <div className="cli-neo-logo">
        {['◆◆◆◆◆◆', '◆      ◆', '◆  MA  ◆', '◆      ◆', '◆◆◆◆◆◆'].map((l, i) => (
          <div key={i} className="cli-neo-logo-line">{l}</div>
        ))}
      </div>
      <div className="cli-neo-info">
        <div className="cli-neo-user">mohd-azam@portfolio</div>
        <div className="cli-neo-sep">{'─'.repeat(22)}</div>
        {info.map(([k, v], i) => (
          <div key={i} className="cli-neo-row">
            <span className="cli-neo-key">{k}</span>
            <span className="cli-neo-colon">: </span>
            <span className={`cli-neo-val${k === 'Status' ? ' green' : ''}`}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Skill bar ──
function SkillBar({ label, pct, color }) {
  const filled = Math.round(pct / 5)
  const empty  = 20 - filled
  return (
    <div className="cli-skill-bar">
      <span className="cli-skill-label">{label.padEnd(20)}</span>
      <span className={`cli-skill-filled cli-c-${color}`}>{'█'.repeat(filled)}</span>
      <span className="cli-skill-empty">{'░'.repeat(empty)}</span>
      <span className="cli-skill-pct"> {pct}%</span>
    </div>
  )
}

// ── Output block renderer ──
function OutputBlock({ block }) {
  switch (block.type) {
    case 'section':
      return (
        <div className="cli-section">
          <span className="cli-sec-prefix">┌─</span>
          <span className="cli-sec-text">{block.text}</span>
          <span className="cli-sec-suffix">{'─'.repeat(Math.max(2, 34 - block.text.length))}</span>
        </div>
      )
    case 'kv':
      return (
        <div className="cli-kv">
          <span className="cli-kv-key">{block.key}</span>
          <span className="cli-kv-eq"> = </span>
          <span className={`cli-kv-val${block.color ? ' cli-c-' + block.color : ''}`}>{block.value}</span>
        </div>
      )
    case 'bullet':
      return (
        <div className="cli-bullet">
          <span className={`cli-bullet-icon cli-c-${block.color}`}>{block.icon}</span>
          <span className="cli-bullet-text">{block.text}</span>
        </div>
      )
    case 'skill-bar':
      return <SkillBar label={block.label} pct={block.pct} color={block.color} />
    case 'tag-group':
      return (
        <div className="cli-tag-group">
          <span className="cli-tag-label">{block.label}</span>
          {block.tags.map((t, i) => <span key={i} className="cli-tag">{t}</span>)}
        </div>
      )
    case 'project':
      return (
        <div className="cli-project">
          <div className="cli-project-header">
            <span className="cli-project-num">{block.num}</span>
            <span className="cli-project-name">{block.name}</span>
            <span className={`cli-project-badge cli-badge-${block.color}`}>{block.badge}</span>
          </div>
          <div className="cli-project-tech">{block.tech}</div>
          <div className="cli-project-desc">{block.desc}</div>
        </div>
      )
    case 'timeline':
      return (
        <div className="cli-timeline">
          <span className="cli-tl-year">{block.year}</span>
          <span className="cli-tl-pipe">│</span>
          <span className="cli-tl-text">{block.text}</span>
        </div>
      )
    case 'contact-row':
      return (
        <div className="cli-contact-row">
          <span className="cli-cr-icon">{block.icon}</span>
          <span className="cli-cr-label">{block.label}</span>
          <span className="cli-cr-value">{block.value}</span>
        </div>
      )
    case 'link-row':
      return (
        <div className="cli-link-row">
          <span className="cli-lr-label">{block.label}</span>
          <span className="cli-lr-url">{block.url}</span>
        </div>
      )
    case 'cmd-row':
      return (
        <div className="cli-cmd-row">
          <span className="cli-cr2-cmd">{block.cmd}</span>
          <span className="cli-cr2-dots">{'·'.repeat(Math.max(2, 16 - block.cmd.length))}</span>
          <span className="cli-cr2-desc">{block.desc}</span>
        </div>
      )
    case 'ls-grid':
      return (
        <div className="cli-ls-grid">
          {block.items.map((item, i) => (
            <span key={i} className={`cli-ls-item${item.endsWith('/') ? ' dir' : ''}`}>{item}</span>
          ))}
        </div>
      )
    case 'status-row':
      return (
        <div className="cli-status-row">
          {block.items.map((item, i) => (
            <span key={i} className="cli-status-item">
              <span className="cli-status-label">{item.label}</span>
              <span className={`cli-status-val cli-c-${item.color}`}>{item.value}</span>
            </span>
          ))}
        </div>
      )
    case 'neo':         return <NeoFetch />
    case 'banner-line': return <div className="cli-banner">{block.text}</div>
    case 'para':        return <div className="cli-para">{block.text}</div>
    case 'system':      return <div className="cli-system">{block.text}</div>
    case 'success':     return <div className="cli-success">{block.text}</div>
    case 'warn':        return <div className="cli-warn">{block.text}</div>
    case 'error':       return <div className="cli-error">{block.text}</div>
    case 'dim':         return <div className="cli-dim">{block.text}</div>
    case 'text':        return <div className="cli-text">{block.text}</div>
    case 'spacer':      return <div style={{ height: 6 }} />
    default:            return null
  }
}

// ── Main ──
const Cli = ({ windowName, setWindowsState }) => {
  const [history, setHistory]       = useState([{ blocks: BOOT_SEQUENCE, isWelcome: true }])
  const [input, setInput]           = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const runCommand = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return
    const [cmd, ...args] = trimmed.split(/\s+/)
    const cmdLower = cmd.toLowerCase()

    setCmdHistory(prev => [trimmed, ...prev])
    setHistoryIdx(-1)

    if (cmdLower === 'clear') { setHistory([]); return }

    const entry = { cmd: trimmed, blocks: [] }
    if (COMMANDS[cmdLower]) {
      const result = COMMANDS[cmdLower].fn(...args)
      entry.blocks = Array.isArray(result) ? result : [{ type: 'text', text: String(result) }]
    } else {
      entry.blocks = [
        { type: 'error', text: `  bash: ${cmdLower}: command not found` },
        { type: 'dim',   text: "  Type 'help' to see available commands." },
      ]
    }
    setHistory(prev => [...prev, entry])
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(input); setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next); setInput(cmdHistory[next] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next); setInput(next === -1 ? '' : cmdHistory[next])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(COMMANDS).find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
      <div className="cli-root" onClick={() => inputRef.current?.focus()}>
        <div className="cli-body">
          {history.map((entry, i) => (
            <div key={i} className="cli-entry">
              {entry.cmd && (
                <div className="cli-prompt-line">
                  <span className="cli-p-user">azam</span>
                  <span className="cli-p-at">@</span>
                  <span className="cli-p-host">portfolio</span>
                  <span className="cli-p-sep"> % </span>
                  <span className="cli-p-cmd">{entry.cmd}</span>
                </div>
              )}
              <div className="cli-output">
                {entry.blocks.map((block, j) => <OutputBlock key={j} block={block} />)}
              </div>
            </div>
          ))}

          <div className="cli-input-line">
            <span className="cli-p-user">azam</span>
            <span className="cli-p-at">@</span>
            <span className="cli-p-host">portfolio</span>
            <span className="cli-p-sep"> % </span>
            <input
              ref={inputRef}
              className="cli-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </MacWindow>
  )
}

export default Cli