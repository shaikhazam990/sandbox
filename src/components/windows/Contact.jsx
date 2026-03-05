import React, { useState } from 'react'
import MacWindow from './MacWindow'
import { Mail, Linkedin, Github, Code2, ChevronRight, Send, CheckCircle, Loader } from 'lucide-react'
import './contact.scss'

const LINKS = [
  { href: 'mailto:shaikhazam0990@gmail.com',                  icon: <Mail size={17}/>,    color: '#60a5fa', bg: 'rgba(59,130,246,0.15)',  label: 'Email',    val: 'shaikhazam0990@gmail.com',  badge: null },
  { href: 'https://www.linkedin.com/in/mohd-azam-4956a828a/', icon: <Linkedin size={17}/>,color: '#38bdf8', bg: 'rgba(14,165,233,0.15)',  label: 'LinkedIn', val: 'mohd-azam-4956a828a',        badge: null },
  { href: 'https://github.com/shaikhazam990',                 icon: <Github size={17}/>,  color: '#e2e8f0', bg: 'rgba(255,255,255,0.08)', label: 'GitHub',   val: 'shaikhazam990',              badge: null },
  { href: 'https://leetcode.com/u/Mohd_Azam0823/',            icon: <Code2 size={17}/>,   color: '#fbbf24', bg: 'rgba(245,158,11,0.15)',  label: 'LeetCode', val: 'Mohd_Azam0823',              badge: '200+ solved' },
]

const ContactContent = () => {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return

    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:shaikhazam0990@gmail.com?subject=${subject}&body=${body}`, '_blank')

    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <div className="ct-root">

      {/* ── Header ── */}
      <div className="ct-header">
        <div className="ct-header-dot" />
        <div>
          <h2 className="ct-title">Let's Connect</h2>
          <p className="ct-sub">Open to internships · Available for collab</p>
        </div>
      </div>

      {/* ── Links ── */}
      <div className="ct-links">
        {LINKS.map((item, i) => (
          <a key={i} href={item.href} target="_blank" rel="noreferrer" className="ct-link">
            <div className="ct-link-icon" style={{ background: item.bg, color: item.color }}>
              {item.icon}
            </div>
            <div className="ct-link-info">
              <span className="ct-link-label">{item.label}</span>
              <span className="ct-link-val">{item.val}</span>
            </div>
            {item.badge && <span className="ct-badge">{item.badge}</span>}
            <ChevronRight size={14} className="ct-arrow" />
          </a>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="ct-divider">
        <span />
        <p>or send a message</p>
        <span />
      </div>

      {/* ── Form ── */}
      <div className="ct-form">
        <div className="ct-row">
          <div className="ct-field">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="off"
            />
          </div>
          <div className="ct-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="ct-field">
          <label>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows={4}
          />
        </div>

        <button
          className={`ct-btn ct-btn--${status}`}
          onClick={handleSubmit}
          disabled={status === 'sending' || status === 'sent'}
        >
          {status === 'idle'    && <><Send size={15}/> Send Message</>}
          {status === 'sending' && <><Loader size={15} className="ct-spin"/> Sending...</>}
          {status === 'sent'    && <><CheckCircle size={15}/> Message Sent!</>}
          {status === 'error'   && <><Send size={15}/> Failed — Try Again</>}
        </button>

        {/* EmailJS setup hint */}

      </div>

    </div>
  )
}

const Contact = ({ windowName, setWindowsState }) => (
  <MacWindow
    width="560px"
    height="640px"
    windowName={windowName}
    setWindowsState={setWindowsState}
    title="Contact"
  >
    <ContactContent />
  </MacWindow>
)

export default Contact