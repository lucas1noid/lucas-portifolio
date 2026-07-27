import { useEffect, useRef, useState } from 'react'
import { community, projects, skills } from './data/portfolio'

const navigation = [
  ['01', 'About me', '#about-me'],
  ['02', 'Experience', '#experience'],
  ['03', 'Projects', '#projects'],
  ['04', 'Skills', '#skills'],
  ['05', 'Contact', '#contact'],
]

function Arrow({ direction = 'diagonal' }) {
  return (
    <span className={`arrow arrow--${direction}`} aria-hidden="true">
      {direction === 'down' ? '↓' : '↗'}
    </span>
  )
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const duration = 3000
    const startedAt = performance.now()
    let animationFrame
    let exitTimer

    document.body.classList.add('is-loading')

    const updateProgress = (currentTime) => {
      const nextProgress = Math.min(100, Math.floor(((currentTime - startedAt) / duration) * 100))
      setProgress((current) => (current === nextProgress ? current : nextProgress))

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress)
        return
      }

      setComplete(true)
      exitTimer = window.setTimeout(() => {
        document.body.classList.remove('is-loading')
        setVisible(false)
      }, 500)
    }

    animationFrame = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(exitTimer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`loader ${complete ? 'loader--complete' : ''}`} aria-label="Loading portfolio">
      <div className="loader__panel">
        <video autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/noid-logo.webm" type="video/webm" />
        </video>

        <div
          className="loader__progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div className="loader__meta">
            <span>INITIALIZING_</span>
            <strong>{progress}%</strong>
          </div>
          <div className="loader__track">
            <span style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
        </div>
      </div>

      <p className="loader__coordinates">05°47&apos;S / 35°12&apos;W</p>
    </div>
  )
}

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const cursor = cursorRef.current
    const moveCursor = ({ clientX, clientY }) => {
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      cursor.classList.add('cursor--visible')
    }
    const updateCursor = ({ target }) => {
      cursor.classList.toggle('cursor--active', Boolean(target.closest('a, button')))
    }
    const hideCursor = () => cursor.classList.remove('cursor--visible')

    document.body.classList.add('has-custom-cursor')
    window.addEventListener('pointermove', moveCursor)
    document.addEventListener('pointerover', updateCursor)
    document.documentElement.addEventListener('pointerleave', hideCursor)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', moveCursor)
      document.removeEventListener('pointerover', updateCursor)
      document.documentElement.removeEventListener('pointerleave', hideCursor)
    }
  }, [])

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function Header({ open, setOpen, theme, setTheme }) {
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = ({ key }) => {
      if (key === 'Escape') setOpen(false)
    }

    document.body.classList.add('menu-open')
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, setOpen])

  return (
    <header className={`site-header ${open ? 'site-header--menu-open' : ''}`}>
      <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Lucas Lopes, back to home">
        <video autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/noid-logo.webm" type="video/webm" />
        </video>
      </a>

      <div className="header__actions">
        <button
          type="button"
          className="theme-toggle-btn"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? 'CLOSE' : 'MENU'}</span>
          <i aria-hidden="true" />
        </button>
      </div>

      <nav id="main-navigation" className={`navigation ${open ? 'navigation--open' : ''}`} aria-label="Primary">
        {navigation.map(([index, label, href]) => (
          <a href={href} onClick={closeMenu} key={href}>
            <small>{index}</small>
            {label}
          </a>
        ))}
        <button
          type="button"
          className="theme-toggle-btn theme-toggle-btn--desktop"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>
    </header>
  )
}

function SectionLabel({ index, children, light = false }) {
  return (
    <p className={`section-label ${light ? 'section-label--light' : ''}`}>
      <span>{index}</span>
      {children}
    </p>
  )
}

function ProjectVisual({ project, index }) {
  return (
    <div className={`project-visual project-visual--${index + 1}`} aria-hidden="true">
      <div className="project-visual__grid" />
      <p>{project.code}</p>
      <strong>{project.short}</strong>
      <span>0{index + 1} / 03</span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => window.localStorage.getItem('portfolio-theme') || 'dark')

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light')
    document.body.classList.add(`theme-${theme}`)
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 },
    )

    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Header open={menuOpen} setOpen={setMenuOpen} theme={theme} setTheme={setTheme} />

      <main>
        <section className="hero" id="inicio">
          <div className="hero__wash" aria-hidden="true" />
          <div className="hero__technical hero__technical--top" aria-hidden="true">
            05°47&apos;S — 35°12&apos;W
          </div>

          <div className="hero__layout">
            <aside className="hero__profile">
              <figure className="hero__photo">
                <img src="/images/lucas-hero.png" alt="Lucas" />
              </figure>

              <div className="hero__intro">
                <p>
                   Hi! I'm <strong>Lucas Lopes</strong>! And this is the portfolio I created to
                  share a bit more about myself and my work as a programmer.
                </p>
                <a className="text-link" href="#projects">
                  Explore projects <Arrow direction="down" />
                </a>
              </div>
            </aside>

            <div className="hero__content">
              <p className="eyebrow hero__eyebrow">
                <span>ℭ𝔬𝔪𝔭𝔲𝔱𝔢𝔯 𝔖𝔠𝔦𝔢𝔫𝔠𝔢</span>
                <span className="hero__verse">
                  𝔍𝔢𝔰𝔲𝔰 𝔦𝔰 𝔱𝔥𝔢 𝔴𝔞𝔶, 𝔱𝔥𝔢 𝔱𝔯𝔲𝔱𝔥, 𝔞𝔫𝔡 𝔱𝔥𝔢 𝔩𝔦𝔣𝔢.
                  <small>(𝔍𝔫 14:6)</small>
                </span>
              </p>

              <h1 aria-label="Software developer">
                <span className="hero__word hero__word--red">SOFTWARE</span>
                <span className="hero__word hero__word--outline">DEVELOPER</span>
              </h1>
            </div>
          </div>

          <div className="hero__status">
            <span className="status-dot" />
            Available for new connections
          </div>

          <p className="hero__role">DEVELOPER IN TRAINING &amp; DIGITAL ENTHUSIAST</p>
        </section>

        {/* 01. ABOUT ME */}
        <section className="about dark-section" id="about-me">
          <div className="section-shell">
            <div className="about__header">
              <SectionLabel index="01" light>
                About me
              </SectionLabel>
            </div>

            <div className="about__grid">
              <div className="about__visual" data-reveal>
                <span className="about__orbit about__orbit--one" aria-hidden="true" />
                <span className="about__orbit about__orbit--two" aria-hidden="true" />
                <div className="about__core">
                  <span>L</span>
                  <span>L</span>
                </div>
                <p>LOGIC / SYSTEMS / PEOPLE</p>
              </div>

              <div className="about__copy" data-reveal>
                <div className="about__story">
                  <figure className="about__photo about__photo--portrait">
                    <img src="/images/lucas-retrato.png" alt="Lucas Lopes smiling" />
                  </figure>

                  <p className="about__lead">
                    I am an aspiring software developer currently studying Computer Science at UFRN - DIMAp.
                  </p>

                  <p className="about__body">
                    I am passionate about technology and always willing to learn. I enjoy breaking down and creating the logic behind algorithms and systems, as well as expressing my creativity; computing is the medium through which I found my calling.
                  </p>

                  <div className="about__gallery">
                    <figure className="about__photo about__photo--hackathon">
                      <img src="/images/lucas-hackathon.png" alt="Lucas Lopes at Hackathon do Sol" loading="lazy" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02. EXPERIENCE */}
        <section className="experience dark-section" id="experience">
          <div className="experience__ghost" aria-hidden="true">
            EXPERIENCE
          </div>
          <div className="section-shell">
            <SectionLabel index="02" light>
              Beyond code
            </SectionLabel>

            <div className="experience__heading" data-reveal>
              <p>TECHNOLOGY IS ALSO ABOUT PEOPLE.</p>
              <h2>EXPERIENCE</h2>
            </div>

            <div className="experience__list">
              {community.map((item, index) => (
                <article key={item.title} data-reveal>
                  <span>0{index + 1}</span>
                  <div>
                    <p>{item.period}</p>
                    <h3>{item.title}</h3>
                  </div>
                  <div>
                    <h4>{item.role}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03. PROJECTS */}
        <section className="projects light-section" id="projects">
          <div className="section-shell">
            <SectionLabel index="03">Selected work</SectionLabel>

            <div className="section-heading" data-reveal>
              <h2>PROJECTS</h2>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <article className="project" key={project.title} data-reveal>
                  <div className="project__meta">
                    <span>0{index + 1}</span>
                    <p>{project.type}</p>
                  </div>

                  <div className="project__copy">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul aria-label={`Technologies used in ${project.title}`}>
                      {project.techs.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <a href={project.link} target="_blank" rel="noreferrer">
                      View on GitHub <Arrow />
                    </a>
                  </div>

                  <ProjectVisual project={project} index={index} />
                </article>
              ))}
            </div>

            <a className="all-projects" href="https://github.com/lucas1noid" target="_blank" rel="noreferrer">
              <span>Explore all on GitHub</span>
              <Arrow />
            </a>
          </div>
        </section>

        {/* 04. SKILLS */}
        <section className="skills light-section" id="skills">
          <div className="section-shell">
            <SectionLabel index="04">Stack &amp; Tools</SectionLabel>

            <div className="section-heading" data-reveal>
              <h2>SKILLS</h2>
              <p>Technologies and frameworks I work with on a daily basis.</p>
            </div>

            <div className="skills__grid" data-reveal>
              {skills.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-card__visual">
                    <div className="skill-card__grid-bg" />
                    <img src={skill.icon} alt={skill.name} className="skill-card__icon" />
                  </div>
                  <div className="skill-card__info">
                    <h3>{skill.name}</h3>
                    {skill.category && <span>{skill.category}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05. CONTACT */}
        <section className="contact light-section" id="contact">
          <div className="section-shell">
            <SectionLabel index="05">Initiate contact</SectionLabel>

            <div className="contact__layout">
              <div className="contact__title" data-reveal>
                <p>Have an idea, a project, or just want to chat?</p>
                <h2>
                  LET&apos;S
                  <span>BUILD</span>
                  SOMETHING.
                </h2>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a href="#inicio">NOID</a>
        <p>Lucas Lopes · © {new Date().getFullYear()}</p>
        <div>
          <a href="https://github.com/lucas1noid" target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a href="mailto:lucas1noid@gmail.com">Email <Arrow /></a>
        </div>
      </footer>
    </>
  )
}

export default App