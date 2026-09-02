import { useState } from 'react'
import { systemNodes } from '@/data/site'

export function SystemDesign() {
  const [active, setActive] = useState(systemNodes[3].id)
  const node = systemNodes.find((n) => n.id === active) ?? systemNodes[0]

  return (
    <section id="architecture" className="section section--tight system-design">
      <p className="meta">Architecture</p>
      <h2 className="display display--md">
        How the
        <br />
        system thinks.
      </h2>
      <p className="lede">
        Interactive distributed architecture — hover a node for technology,
        purpose, failure strategy, and scaling strategy.
      </p>

      <div className="sysmap interactive">
        <ul className="sysmap__nodes" role="list">
          {systemNodes.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                className={n.id === active ? 'is-active' : ''}
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                aria-pressed={n.id === active}
              >
                <span className="meta">{n.label}</span>
                <strong>{n.tech}</strong>
              </button>
            </li>
          ))}
        </ul>

        <aside className="sysmap__detail" aria-live="polite">
          <p className="meta">Node inspect</p>
          <h3>{node.label}</h3>
          <dl>
            <div>
              <dt>Technology</dt>
              <dd>{node.tech}</dd>
            </div>
            <div>
              <dt>Purpose</dt>
              <dd>{node.purpose}</dd>
            </div>
            <div>
              <dt>Failure strategy</dt>
              <dd>{node.failure}</dd>
            </div>
            <div>
              <dt>Scaling strategy</dt>
              <dd>{node.scaling}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
