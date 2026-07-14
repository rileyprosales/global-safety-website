
import Link from "next/link";
import { ContactBand, PageHero, SiteFooter, SiteHeader } from "../components";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero eyebrow="About Global Safety" title="Preparedness should feel practicalâ€”not overwhelming.">
          <p>We focus on clear, instructor-led learning that helps people understand what to do before, during, and after an emergency.</p>
        </PageHero>
        <section className="section page-shell story-grid">
          <div><p className="eyebrow">Our purpose</p><h2>Build capability before it is needed.</h2></div>
          <div className="story-copy"><p>Global Safety develops training for the specific workspace and audience in front of us. The goal is straightforward: replace uncertainty with useful knowledge and practiced skills.</p><p>Our programs span life safety certification, active-threat response, emergency preparedness, and age-appropriate learning for children from Pre-K through 6th grade.</p></div>
        </section>
        <section className="values-section"><div className="page-shell values-grid">
          <article><span>PREPARE</span><h2>Understand the risk.</h2><p>Build awareness and learn the steps that support a strong response.</p></article>
          <article><span>RESPOND</span><h2>Act with purpose.</h2><p>Develop practical skills through instructor-led interaction and hands-on learning.</p></article>
          <article><span>RECOVER</span><h2>Know what comes next.</h2><p>Approach emergency readiness as a complete process, not a single moment.</p></article>
        </div></section>
        <section className="section page-shell approach-grid">
          <div className="approach-card"><p className="eyebrow">What to expect</p><h2>Training built around people.</h2><ul><li>Instructor-led delivery</li><li>Workspace-specific development</li><li>Hands-on participation</li><li>Clear, fact-focused discussion</li><li>Nationwide training availability</li></ul></div>
          <div className="approach-quote"><blockquote>â€œFact-focused, no fluff, hands-on training.â€</blockquote><p>That promise shapes the way Global Safety approaches emergency preparedness.</p><Link className="button button-accent" href="/contact">Start a conversation</Link></div>
        </section>
        <ContactBand />
      </main>
      <SiteFooter />
    </>
  );
}

