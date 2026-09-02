import { projectShorts } from '@/data/site'

export function ProjectShorts() {
  return (
    <section id="project_shorts" className="section section--tight shorts">
      <p className="meta">Project shorts</p>
      <h2 className="display display--sm">Visual proof</h2>
      <p className="lede">
        Screenshots and previews from shipped modules — OAuth, geolocation, AI
        apply tooling, and live platforms.
      </p>

      <ul className="shorts__grid">
        {projectShorts.map((item) => {
          const href = item.href ?? item.preview ?? item.image
          const hasSite = Boolean(item.href)
          return (
            <li key={item.title} className="shorts__card interactive">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="explore"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={640}
                  height={400}
                />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.blurb}</span>
                  <span className="meta shorts__link">
                    {hasSite ? 'Visit site →' : 'View preview →'}
                  </span>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
