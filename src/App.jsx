import { useEffect, useRef, useState } from 'react'
import { community, projects, skills } from './data/portfolio'

const navigation = [
  ['01', 'Sobre', '#sobre'],
  ['02', 'Projetos', '#projetos'],
  ['03', 'Atuação', '#atuacao'],
  ['04', 'Contato', '#contato'],
]

function Arrow({ direction = 'diagonal' }) {
  return (
    <span className={`arrow arrow--${direction}`} aria-hidden="true">
      {direction === 'down' ? '↓' : '↗'}
    </span>
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

function Header({ open, setOpen }) {
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
      <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Lucas Lopes, voltar ao início">
        <video autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/noid-logo.webm" type="video/webm" />
        </video>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? 'FECHAR' : 'MENU'}</span>
        <i aria-hidden="true" />
      </button>

      <nav id="main-navigation" className={`navigation ${open ? 'navigation--open' : ''}`} aria-label="Principal">
        {navigation.map(([index, label, href]) => (
          <a href={href} onClick={closeMenu} key={href}>
            <small>{index}</small>
            {label}
          </a>
        ))}
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
      <CustomCursor />
      <Header open={menuOpen} setOpen={setMenuOpen} />

      <main>
        <section className="hero" id="inicio">
          <div className="hero__wash" aria-hidden="true" />
          <div className="hero__technical hero__technical--top" aria-hidden="true">
            05°47&apos;S — 35°12&apos;W
          </div>

          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">
              <span>Computer Science</span>
              <span>UFRN · Natal/RN</span>
            </p>

            <h1 aria-label="Software developer">
              <span className="hero__word hero__word--red">SOFTWARE</span>
              <span className="hero__word hero__word--outline">DEVELOPER</span>
            </h1>

            <div className="hero__intro">
              <p>
                Olá, eu sou <strong>Lucas Lopes.</strong> Transformo lógica em experiências digitais precisas,
                expressivas e feitas para durar.
              </p>
              <a className="text-link" href="#projetos">
                Explorar projetos <Arrow direction="down" />
              </a>
            </div>
          </div>

          <div className="hero__status">
            <span className="status-dot" />
            Disponível para novas conexões
          </div>

          <p className="hero__role">DEV EM FORMAÇÃO &amp; ENTUSIASTA DIGITAL</p>
        </section>

        <section className="about dark-section" id="sobre">
          <div className="section-shell">
            <SectionLabel index="01" light>
              Background
            </SectionLabel>

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
                <p className="kicker">NAVEGANDO ENTRE CÓDIGO E COMUNIDADE</p>
                <h2>
                  Curiosidade para <em>entender.</em>
                  <br />
                  Código para <em>construir.</em>
                </h2>
                <div className="about__body">
                  <p>
                    Estudante de Ciência da Computação na UFRN, construo minha trajetória entre algoritmos,
                    orientação a objetos e desenvolvimento backend.
                  </p>
                  <p>
                    Gosto de desmontar problemas complexos, encontrar sua estrutura e remontá-los como soluções
                    simples — sem deixar a personalidade de lado.
                  </p>
                </div>
              </div>
            </div>

            <div className="facts" data-reveal>
              <div>
                <span>BASE</span>
                <strong>Natal, RN</strong>
              </div>
              <div>
                <span>FOCO</span>
                <strong>Backend &amp; Software</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong>Em evolução contínua</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="projects light-section" id="projetos">
          <div className="section-shell">
            <SectionLabel index="02">Selected work</SectionLabel>

            <div className="section-heading" data-reveal>
              <h2>PROJETOS</h2>
              <p>
                Uma seleção de sistemas e experimentos que exploram arquitetura, lógica e resolução de problemas.
              </p>
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
                    <ul aria-label={`Tecnologias de ${project.title}`}>
                      {project.techs.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <a href={project.link} target="_blank" rel="noreferrer">
                      Ver no GitHub <Arrow />
                    </a>
                  </div>

                  <ProjectVisual project={project} index={index} />
                </article>
              ))}
            </div>

            <a className="all-projects" href="https://github.com/lucas1noid" target="_blank" rel="noreferrer">
              <span>Explorar todos no GitHub</span>
              <Arrow />
            </a>
          </div>
        </section>

        <section className="experience dark-section" id="atuacao">
          <div className="experience__ghost" aria-hidden="true">
            COMMUNITY
          </div>
          <div className="section-shell">
            <SectionLabel index="03" light>
              Além do código
            </SectionLabel>

            <div className="experience__heading" data-reveal>
              <p>TECNOLOGIA TAMBÉM É SOBRE PESSOAS.</p>
              <h2>ATUAÇÃO &amp; COMUNIDADE</h2>
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

        <section className="toolkit" aria-label="Tecnologias">
          <div className="toolkit__track">
            {[...skills, ...skills].map((skill, index) => (
              <span key={`${skill}-${index}`}>
                {skill}
                <i>✦</i>
              </span>
            ))}
          </div>
        </section>

        <section className="contact light-section" id="contato">
          <div className="section-shell">
            <SectionLabel index="04">Initiate contact</SectionLabel>

            <div className="contact__layout">
              <div className="contact__title" data-reveal>
                <p>Tem uma ideia, projeto ou só quer trocar uma ideia?</p>
                <h2>
                  VAMOS
                  <span>CONSTRUIR</span>
                  ALGO.
                </h2>
              </div>

              <div className="contact__action" data-reveal>
                <p>
                  Estou aberto a projetos, colaborações acadêmicas e conversas sobre tecnologia, backend e
                  comunidade dev.
                </p>
                <a href="mailto:lucas1noid@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio">
                  <span>
                    Enviar uma mensagem
                    <small>lucas1noid@gmail.com</small>
                  </span>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a href="#inicio">NOID.SYS</a>
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
