import { glance, howIWork, impact, site } from '@/data/site'

export function Impact() {
  return (
    <section id="systems" className="section section--tight impact">
      <p className="meta">Selected outcomes</p>
      <h2 className="display display--md">
        Systems
        <br />
        under load.
      </h2>
      <p className="lede">
        A few numbers from systems I’ve helped build and run in production.
      </p>

      <ul className="impact__huge">
        {impact.map((item) => (
          <li key={item.label}>
            <strong>{item.value}</strong>
            <span className="impact__label">{item.label}</span>
            <p>{item.note}</p>
          </li>
        ))}
      </ul>

      <div className="glance-block interactive">
        <p className="meta">At a glance</p>
        <h3 className="display display--sm">Recruiter scan</h3>
        <dl className="glance__grid">
          {glance.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="how-block" id="principles">
        <p className="meta">How I work</p>
        <h3 className="display display--sm">Delivery principles</h3>
        <ul className="how__grid">
          {howIWork.map((item) => (
            <li key={item.code} className="interactive">
              <span className="meta">{item.code}</span>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="meta domains-label">Domains</p>
      <ul className="domain-chips">
        {site.domains.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </section>
  )
}
