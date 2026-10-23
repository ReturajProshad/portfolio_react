import { personal, summary, experiences, projects, skills, achievements, openSource } from "@/data/portfolio";

/**
 * Server-rendered, text-only version of the portfolio.
 *
 * The visible site is an interactive desktop whose sections open as windows,
 * so most content is not in the initial HTML. This block puts the same
 * content into the page for search engines, link previews and screen-reader
 * users, while staying visually hidden. It mirrors what visitors can open
 * on the page — nothing here is extra or different.
 */
export default function SeoContent() {
  return (
    <article className="sr-only" aria-label={`${personal.fullName} — portfolio summary`}>
      <header>
        <h1>
          {personal.fullName} — {personal.role}
        </h1>
        <p>{personal.headline}</p>
        <p>{personal.location}</p>
        <p>{summary}</p>
      </header>

      <section aria-labelledby="seo-experience">
        <h2 id="seo-experience">Experience</h2>
        {experiences.map((e) => (
          <div key={e.company}>
            <h3>
              {e.role} — {e.company}
            </h3>
            <p>
              {e.period} · {e.location} · {e.type}
            </p>
            <ul>
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="seo-projects">
        <h2 id="seo-projects">Projects</h2>
        {projects.map((p) => (
          <div key={p.id}>
            <h3>
              {p.title} — {p.subtitle}
            </h3>
            <p>{p.description}</p>
            <p>{p.achievement}</p>
            <p>Technologies: {p.tags.join(", ")}</p>
            {p.links.github && <a href={p.links.github}>{p.title} source code on GitHub</a>}
            {p.links.playstore && <a href={p.links.playstore}>{p.title} on Google Play</a>}
            {p.links.pubdev && <a href={p.links.pubdev}>{p.title} on pub.dev</a>}
          </div>
        ))}
      </section>

      <section aria-labelledby="seo-opensource">
        <h2 id="seo-opensource">Open source: {openSource.name}</h2>
        <p>{openSource.tagline}</p>
        <p>{openSource.problem}</p>
        <p>{openSource.solution}</p>
        <p>{openSource.impact}</p>
        <ul>
          {openSource.design.map((d) => (
            <li key={d.title}>
              {d.title}: {d.desc}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="seo-skills">
        <h2 id="seo-skills">Skills</h2>
        <dl>
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <dt>{group}</dt>
              <dd>{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="seo-achievements">
        <h2 id="seo-achievements">Achievements and education</h2>
        <ul>
          {achievements.map((a) => (
            <li key={a.title}>
              {a.title} — {a.detail}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="seo-contact">
        <h2 id="seo-contact">Contact</h2>
        <ul>
          <li>
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
          </li>
          <li>
            <a href={personal.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={personal.github}>GitHub</a>
          </li>
        </ul>
      </section>
    </article>
  );
}
