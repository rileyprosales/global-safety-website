
import { ContactBand, PageHero, SiteFooter, SiteHeader } from "../components";
import { programs } from "../site-data";

export default function ProgramsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero eyebrow="Programs" title="Training that turns awareness into action.">
          <p>Global Safety provides instructor-led programs for medical response, active threats, young learners, and workplace preparedness.</p>
        </PageHero>
        <section className="section page-shell program-list">
          {programs.map((program, index) => (
            <article className="program-detail" id={program.slug} key={program.slug}>
              <div className="program-detail-visual"><span className="detail-number">0{index + 1}</span><img src={program.image} alt={program.imageAlt} /></div>
              <div className="program-detail-copy">
                <p className="eyebrow">{program.audience}</p><h2>{program.name}</h2><p className="detail-lede">{program.details}</p>
                <ul>{program.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                <a className="text-link" href="tel:+18005622318">Discuss this program <span>â†’</span></a>
              </div>
            </article>
          ))}
        </section>
        <ContactBand />
      </main>
      <SiteFooter />
    </>
  );
}

