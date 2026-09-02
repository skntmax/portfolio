import { nav, site } from '@/data/site'
import '@/styles/nav.css'

export function Navigation() {
  return (
    <header className="nav nav--studio">
      <a className="nav__brand interactive" href="#intro">
        <span className="nav__mono" aria-hidden="true">
          {site.monogram}
        </span>
        <span className="nav__name">{site.name}</span>
      </a>

      <p className="nav__status">
        <span className="nav__dot" aria-hidden="true" />
        {site.status}
      </p>

      <nav className="nav__links interactive" aria-label="Primary">
        {nav.map((item) => (
          <a key={item.id} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="nav__cta" href="#contact">
          Contact
        </a>
      </nav>
    </header>
  )
}
