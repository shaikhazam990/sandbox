import React, { useEffect, useRef } from 'react'
import MacWindow from './MacWindow'
import { Code2, Cpu, Globe, Mail, MapPin, ExternalLink, Zap, BookOpen, Coffee, Github, Linkedin } from 'lucide-react'
import './about.scss'

const AboutContent = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="ab-root">

      {/* ── HERO ── */}
      <section className="ab-hero" ref={heroRef}>
        <div className="ab-hero-glow" />
        <div className="ab-hero-noise" />

        <div className="ab-hero-left">
          <div className="ab-avatar">
            <div className="ab-avatar-ring" />
            <div className="ab-avatar-inner">MA</div>
          </div>
        </div>

        <div className="ab-hero-right">
          <div className="ab-tag">
            <span className="ab-tag-dot" />
            Open to Internships
          </div>
          <h1 className="ab-name">Mohd Azam</h1>
          <p className="ab-role">
            <span className="ab-role-prefix">$ </span>Full-Stack Developer
          </p>
          <div className="ab-meta">
            <span><MapPin size={11} /> India</span>
            <span><Mail size={11} /> shaikhazam0990@gmail.com</span>
          </div>
          <div className="ab-stat-row">
            <div className="ab-stat">
              <span className="ab-stat-num">200+</span>
              <span className="ab-stat-lbl">LeetCode</span>
            </div>
            <div className="ab-stat-divider" />
            <div className="ab-stat">
              <span className="ab-stat-num">3+</span>
              <span className="ab-stat-lbl">Projects</span>
            </div>
            <div className="ab-stat-divider" />
            <div className="ab-stat">
              <span className="ab-stat-num">CSE</span>
              <span className="ab-stat-lbl">Final Year</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-line" />
          <span className="ab-section-label">story</span>
        </div>
        <p className="ab-story">
          Passionate about turning ideas into real, scalable products. My journey started with curiosity
          about how the web works — and quickly became an obsession with building clean, performant
          applications. Currently building{' '}
          <span className="ab-highlight">Moodify</span> — an AI-powered emotion-driven music recommendation platform.
        </p>
      </section>

      {/* ── SKILLS ── */}
      <section className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-line" />
          <span className="ab-section-label">skills</span>
        </div>
        <div className="ab-skill-grid">

          <div className="ab-skill-card ab-card-blue">
            <div className="ab-skill-card-glow" />
            <div className="ab-skill-icon"><Code2 size={20} /></div>
            <h4>Frontend</h4>
            <ul>
              <li>React / Next.js</li>
              <li>JavaScript / TypeScript</li>
              <li>Tailwind / Sass</li>
              <li>HTML5 / CSS3</li>
            </ul>
          </div>

          <div className="ab-skill-card ab-card-purple">
            <div className="ab-skill-card-glow" />
            <div className="ab-skill-icon"><Cpu size={20} /></div>
            <h4>Backend</h4>
            <ul>
              <li>Node.js / Express</li>
              <li>MongoDB / Redis</li>
              <li>REST APIs / JWT</li>
              <li>System Design</li>
            </ul>
          </div>

          <div className="ab-skill-card ab-card-green">
            <div className="ab-skill-card-glow" />
            <div className="ab-skill-icon"><Globe size={20} /></div>
            <h4>Tools</h4>
            <ul>
              <li>Git / GitHub</li>
              <li>Docker (basics)</li>
              <li>Postman / Vite</li>
              <li>CI/CD (learning)</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── CURRENTLY ── */}
      <section className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-line" />
          <span className="ab-section-label">currently</span>
        </div>
        <div className="ab-now-list">

          <div className="ab-now-item">
            <div className="ab-now-icon amber"><Zap size={14} /></div>
            <div className="ab-now-body">
              <span className="ab-now-type">Building</span>
              <span className="ab-now-val">Moodify — AI Music Recommender</span>
            </div>
            <div className="ab-now-pulse amber" />
          </div>

          <div className="ab-now-item">
            <div className="ab-now-icon blue"><BookOpen size={14} /></div>
            <div className="ab-now-body">
              <span className="ab-now-type">Learning</span>
              <span className="ab-now-val">Generative AI · DevOps · System Design</span>
            </div>
            <div className="ab-now-pulse blue" />
          </div>

          <div className="ab-now-item">
            <div className="ab-now-icon green"><Coffee size={14} /></div>
            <div className="ab-now-body">
              <span className="ab-now-type">Grinding</span>
              <span className="ab-now-val">DSA on LeetCode — 200+ problems solved</span>
            </div>
            <div className="ab-now-pulse green" />
          </div>

        </div>
      </section>

      {/* ── LINKS ── */}
      <section className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-line" />
          <span className="ab-section-label">find me</span>
        </div>
        <div className="ab-links">
          <a href="https://github.com/shaikhazam990" target="_blank" rel="noreferrer" className="ab-link ab-link-gh">
            <Github size={15} /> GitHub <ExternalLink size={11} className="ab-link-ext" />
          </a>
          <a href="https://www.linkedin.com/in/mohd-azam-4956a828a/" target="_blank" rel="noreferrer" className="ab-link ab-link-li">
            <Linkedin size={15} /> LinkedIn <ExternalLink size={11} className="ab-link-ext" />
          </a>
          <a href="https://leetcode.com/u/Mohd_Azam0823/" target="_blank" rel="noreferrer" className="ab-link ab-link-lc">
            <Code2 size={15} /> LeetCode <ExternalLink size={11} className="ab-link-ext" />
          </a>
          <a href="mailto:shaikhazam0990@gmail.com" className="ab-link ab-link-mail">
            <Mail size={15} /> Email Me <ExternalLink size={11} className="ab-link-ext" />
          </a>
        </div>
      </section>

    </div>
  )
}

const About = ({ windowName, setWindowsState }) => (
  <MacWindow
    width="700px"
    height="600px"
    windowName={windowName}
    setWindowsState={setWindowsState}
    title="About Me"
  >
    <AboutContent />
  </MacWindow>
)

export default About