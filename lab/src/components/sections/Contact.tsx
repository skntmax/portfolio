import { hire, proofLinks, site } from '@/data/site'

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="meta">Open channel</p>
      <div className="hire-band interactive" id="hire">
        <h2 className="display display--md">
          Let&apos;s build
          <br />
          something that
          <br />
          scales.
        </h2>
        <p className="lede">{hire.blurb}</p>
        <div className="row">
          <a
            className="btn btn--primary"
            href={`mailto:${site.email}?subject=Hiring%20inquiry%20-%20Senior%20Software%20Engineer`}
          >
            Email Shashi
          </a>
          <a
            className="btn btn--ghost"
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="btn btn--ghost"
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn--ghost"
            href={site.resumeUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>

      <p className="lede">{hire.replyNote}</p>

      <div className="contact__details interactive">
        <p>
          <span className="meta">Email</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          <span className="meta">Phone</span>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
        </p>
        <p>
          <span className="meta">Location</span>
          <span>
            {site.location} · {site.timezone}
          </span>
        </p>
      </div>

      <div className="proof-block interactive">
        <p className="meta">Proof & links</p>
        <ul className="proof__grid">
          {proofLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="social-row interactive" aria-label="Social">
        <a href={site.social.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
        <a href={site.social.twitter} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </section>
  )
}
