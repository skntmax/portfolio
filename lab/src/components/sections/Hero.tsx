import { heroProof, site } from '@/data/site'
import '@/styles/sections.css'

export function Hero() {
  return (
    <section id="intro" className="section hero hero--studio">
      <div className="glass-card hero__card interactive">
        <p className="meta hero__kicker">Welcome to</p>
        <h1 className="display hero__headline">
          <span className="hero__line">{site.name.split(' ')[0]}</span>
          <span className="hero__line hero__line--accent">
            {site.name.split(' ').slice(1).join(' ') || 'Kant'}
          </span>
        </h1>
        <p className="hero__tagline">{site.narrative.toLowerCase()}</p>
        <p className="lede hero__lede">{site.supporting}</p>

        <p className="hero__stack meta">
          [Java] [Spring Boot] [Kafka] [Redis] [React] [Three.js] [Blender] ∞
        </p>

        <ul className="hero__proof" aria-label="Proof">
          {heroProof.map((item) => (
            <li key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="row hero__cta">
          <a className="btn btn--mint" href="#systems" data-cursor="explore">
            View systems
          </a>
          <a className="btn btn--ghost" href="#swiftcab" data-cursor="explore">
            Explore SwiftCab
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
    </section>
  )
}
