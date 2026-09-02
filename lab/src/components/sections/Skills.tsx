import { reliabilityDepth, skillGroups, skillLevels } from '@/data/site'

export function Skills() {
  return (
    <section id="technical-system" className="section section--tight skills">
      <p className="meta">Technical system</p>
      <h2 className="display display--sm">Engineering constellation</h2>
      <p className="lede">
        Technical skills aligned with 5+ years building Fintech and Enterprise
        systems — backend microservices, frontend apps, cloud/DevOps, messaging,
        security, and AI automation.
      </p>

      <ul className="skill-bars" aria-label="Skill levels">
        {skillLevels.map((skill) => (
          <li key={skill.name}>
            <div className="skill-bars__row">
              <span>{skill.name}</span>
              <span className="meta">{skill.level}%</span>
            </div>
            <div
              className="skill-bars__track"
              role="meter"
              aria-valuenow={skill.level}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={skill.name}
            >
              <span style={{ width: `${skill.level}%` }} />
            </div>
          </li>
        ))}
      </ul>

      <ul className="constellation">
        {skillGroups.map((group) => (
          <li key={group.id} className="constellation__group interactive">
            <h3>
              <span className="meta">{group.id}</span>
              {group.label}
            </h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="depth-grid" id="depth">
        <p className="meta">Distributed systems & fintech depth</p>
        <h3 className="display display--sm">Keyword-ready depth</h3>
        <div className="depth-grid__cols">
          <article>
            <h4>Reliability patterns</h4>
            <ul>
              {reliabilityDepth.reliability.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h4>Data & messaging</h4>
            <ul>
              {reliabilityDepth.data.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h4>Security & delivery</h4>
            <ul>
              {reliabilityDepth.security.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
