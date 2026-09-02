import { certificates, education, experience } from '@/data/site'

export function Experience() {
  return (
    <section id="experience" className="section section--tight experience">
      <p className="meta">Engineering timeline</p>
      <h2 className="display display--sm">Career architecture</h2>

      <ol className="arch-timeline">
        {experience.map((item) => (
          <li key={`${item.org}-${item.period}`} className="interactive">
            <div className="arch-timeline__rail" aria-hidden="true" />
            <span className="meta">{item.period}</span>
            <h3>
              {item.org}
              <span>
                {item.role} · {item.location}
              </span>
            </h3>
            <ul>
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
        {education.slice(0, 1).map((item) => (
          <li key={item.title} className="interactive">
            <div className="arch-timeline__rail" aria-hidden="true" />
            <span className="meta">{item.period}</span>
            <h3>
              {item.title}
              <span>{item.org}</span>
            </h3>
            <p className="edu__note">{item.note}</p>
          </li>
        ))}
      </ol>

      <div className="edu-block interactive">
        <p className="meta">Education</p>
        <ul className="edu__list">
          {education.map((item) => (
            <li key={item.title}>
              <span className="meta">{item.period}</span>
              <strong>{item.title}</strong>
              <p>{item.org}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="certs-block interactive" id="certificates">
        <p className="meta">Certificates</p>
        <ul className="certs__list">
          {certificates.map((item) => (
            <li key={item.title}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              ) : (
                <span>{item.title}</span>
              )}
              {item.meta ? <span className="meta">{item.meta}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
