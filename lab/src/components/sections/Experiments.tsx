import { experiments } from '@/data/site'

export function Experiments() {
  return (
    <section id="lab" className="section section--tight experiments">
      <p className="meta">Lab / Experiments</p>
      <h2 className="display display--sm">Curiosity systems</h2>
      <p className="lede">
        Beyond employment history — experiments that show how the stack is
        explored in practice.
      </p>
      <ul className="experiments__grid">
        {experiments.map((item) => (
          <li key={item.code} className="experiment interactive">
            <span className="meta">{item.code}</span>
            <h3>{item.title}</h3>
            <p>{item.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
