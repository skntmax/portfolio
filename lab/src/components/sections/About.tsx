import { site } from '@/data/site'

export function About() {
  return (
    <section id="about" className="section about">
      <p className="meta">Engineer profile</p>
      <div className="about__layout interactive">
        <div className="about__main">
          <h2 className="display display--md">{site.statement}</h2>
          <p className="meta about__secondary">{site.secondary}</p>
          {site.aboutParagraphs.map((p) => (
            <p key={p.slice(0, 40)} className="lede about__note">
              {p}
            </p>
          ))}
          <p className="about__closing">{site.aboutClosing}</p>
        </div>

        <aside className="about__aside">
          <img
            className="about__photo"
            src={site.photoUrl}
            alt={site.name}
            width={180}
            height={180}
          />
          <p className="meta about__role-line">
            {site.role} · {site.company}
          </p>
          <dl className="about__meta">
            <div>
              <dt>City</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>
                <a href={site.website} target="_blank" rel="noopener noreferrer">
                  {site.website.replace(/^https?:\/\//, '')}
                </a>
              </dd>
            </div>
            <div>
              <dt>Timezone</dt>
              <dd>{site.timezone}</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>{site.degree}</dd>
            </div>
          </dl>
          <div className="hero__chips about__chips" aria-label="Core stack">
            {site.stackChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
