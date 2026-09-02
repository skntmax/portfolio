import { miniProjects, projects } from '@/data/site'

export function Projects() {
  return (
    <section id="work" className="section section--tight projects">
      <header className="projects__head interactive">
        <p className="meta">Major projects & architecture</p>
        <h2 className="display display--md">
          Systems
          <br />
          shipped
        </h2>
        <p className="lede">
          Production systems with stack, outcomes, and design snapshots —
          problem → architecture → contribution → outcome.
        </p>
      </header>

      <div className="projects__timeline">
        {projects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className="project interactive"
            data-cursor="explore"
          >
            <div className="project__index">
              <span className="meta">
                Project {project.index}
                {project.badge ? ` · ${project.badge}` : ''}
              </span>
            </div>
            <div className="project__body">
              <h3 className="project__title">{project.title}</h3>
              <p className="project__subtitle">{project.subtitle}</p>

              <div className="project__fields">
                <div>
                  <p className="meta">Problem</p>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <p className="meta">Architecture</p>
                  <p>{project.architecture}</p>
                </div>
                <div>
                  <p className="meta">Contribution</p>
                  <p>{project.contribution}</p>
                </div>
                <div>
                  <p className="meta">Outcome</p>
                  <p>{project.outcome}</p>
                </div>
              </div>

              <p className="meta project__tech">
                Technology · {project.tech.join(' · ')}
              </p>
              {project.href ? (
                <a
                  className="btn btn--ghost"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="explore"
                >
                  Open system →
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="mini-block interactive" id="portfolio">
        <p className="meta">Mini projects</p>
        <h3 className="display display--sm">Live demos</h3>
        <ul className="mini__grid">
          {miniProjects.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="explore"
              >
                <strong>{item.title}</strong>
                <span>{item.blurb}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
