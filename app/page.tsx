
import Link from "next/link";
import { ContactBand, ProgramCard, SiteFooter, SiteHeader } from "./components";
import { HeroReveal } from "./hero-reveal";
import { programs } from "./site-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-premium">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="page-shell hero-premium-grid">
            <div className="hero-premium-copy">
              <p className="eyebrow light">Nationwide / Instructor-led / Built for your environment</p>
              <h1>Train for the <em>moment</em> that matters.</h1>
              <p className="hero-lede">Global Safety turns emergency plans into clear decisions, practiced skills and people who are ready to act.</p>
              <div className="button-row">
                <Link className="button button-accent" href="/contact">Build your training plan <span>â†—</span></Link>
                <a className="button button-ghost" href="tel:+18005622318">Call 800-562-2318</a>
              </div>
              <div className="hero-proof"><span>For schools</span><span>For workplaces</span><span>For communities</span></div>
            </div>
            <div className="hero-visual-wrap">
              <div className="hero-visual-code"><span>READINESS / 01</span><span>MOVE CURSOR â†’</span></div>
              <HeroReveal />
              <div className="hero-visual-foot"><strong>Preparedness is a practiced skill.</strong><span>Not a PDF in a drawer.</span></div>
            </div>
          </div>
          <div className="hero-rail"><div><span>PREPARE</span><i /> <span>RESPOND</span><i /> <span>RECOVER</span><i /> <span>REAL SKILLS FOR REAL MOMENTS</span><i /> <span>PREPARE</span><i /> <span>RESPOND</span><i /> <span>RECOVER</span><i /> <span>REAL SKILLS FOR REAL MOMENTS</span></div></div>
        </section>

        <section className="trust-strip"><div className="page-shell trust-grid"><p><strong>Instructor-led</strong><span>Human guidance, not another generic module</span></p><p><strong>Hands-on</strong><span>Skills built through participation and practice</span></p><p><strong>Specific</strong><span>Training shaped around your people and environment</span></p><p><strong>Nationwide</strong><span>Professional training where your team needs it</span></p></div></section>

        <section className="statement-section">
          <div className="page-shell statement-grid">
            <p className="eyebrow">The gap we close / 001</p>
            <h2>A plan on paper is not a response under pressure.</h2>
            <p className="statement-copy">When seconds matter, people need more than information. They need a clear next move they have already understood, discussed and practiced.</p>
            <div className="statement-meter" aria-hidden="true"><span>Uncertainty</span><i /><strong>Capability</strong></div>
          </div>
        </section>

        <section className="section page-shell programs-stage">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">Four focused programs</p><h2>Build readiness where it counts.</h2></div>
            <div><p>Start with one program or combine training around the risks, people and responsibilities in your organization.</p><Link className="text-link" href="/programs">Compare all programs <span>â†—</span></Link></div>
          </div>
          <div className="program-grid">{programs.map((program, index) => <ProgramCard key={program.slug} program={program} index={index} />)}</div>
        </section>

        <section className="method-section">
          <div className="page-shell method-grid">
            <div className="method-heading"><p className="eyebrow light">Prepare / Respond / Recover</p><h2>We train the whole decisionâ€”not just the first step.</h2><p>Every program connects awareness to action, then carries the thinking through what happens next.</p></div>
            <div className="method-steps">
              <article><span>01</span><div><h3>See it sooner.</h3><p>Recognize risk, warning signs and the conditions that call for action.</p></div></article>
              <article><span>02</span><div><h3>Choose the next move.</h3><p>Turn uncertainty into clear decisions people can recall under pressure.</p></div></article>
              <article><span>03</span><div><h3>Practice the response.</h3><p>Build confidence through instructor-led discussion, demonstration and participation.</p></div></article>
            </div>
          </div>
        </section>

        <section className="section page-shell audience-stage">
          <div className="section-heading"><p className="eyebrow">Training that fits the room</p><h2>Different people. Different risks. One standard: ready.</h2></div>
          <div className="audience-grid">
            <Link href="/who-we-serve#schools"><span>01 / EDU</span><h3>Schools</h3><p>Students, educators and school staff.</p><b>â†—</b></Link>
            <Link href="/who-we-serve#businesses"><span>02 / WORK</span><h3>Workplaces</h3><p>Employees, leaders and response teams.</p><b>â†—</b></Link>
            <Link href="/who-we-serve#churches"><span>03 / FAITH</span><h3>Churches</h3><p>Staff, volunteers and congregations.</p><b>â†—</b></Link>
            <Link href="/who-we-serve#community"><span>04 / COMMUNITY</span><h3>Community groups</h3><p>Leaders, members and local organizations.</p><b>â†—</b></Link>
          </div>
        </section>

        <section className="process-section"><div className="process-word" aria-hidden="true">READY</div><div className="page-shell"><div className="section-heading"><p className="eyebrow">From concern to capability</p><h2>Simple to start. Specific to you.</h2></div><div className="process-grid"><article><span>01</span><h3>Share your risks</h3><p>Tell us who you need to prepare, where they work and what concerns you most.</p></article><article><span>02</span><h3>Shape the program</h3><p>We identify the right training and tailor the format to your organization.</p></article><article><span>03</span><h3>Train with purpose</h3><p>Your people leave with clearer decisions and practical response skills.</p></article></div></div></section>

        <ContactBand />
      </main>
      <SiteFooter />
    </>
  );
}

