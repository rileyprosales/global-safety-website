
import Link from "next/link";
import { type Program } from "./site-data";

export function SiteHeader() {
  return (
    <>
      <div className="topbar">
        <div className="page-shell">
          <span>Nationwide instructor-led training</span>
          <span><a href="tel:+18005622318">Office 800-562-2318</a><i /><a href="sms:+19512584854">Text 951-258-4854</a></span>
        </div>
      </div>
      <header className="site-header">
        <div className="page-shell header-inner">
          <Link className="brand-lockup" href="/" aria-label="Global Safety home">
            <span>GLOBAL</span><strong>SAFETY</strong><i>GS</i>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/programs">Programs</Link>
            <Link href="/who-we-serve">Who We Serve</Link>
            <Link href="/about">About</Link>
            <Link href="/faqs">FAQs</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <Link className="button button-header" href="/contact">Request Training <span>â†—</span></Link>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-headline"><span>Prepare.</span><span>Respond.</span><span>Recover.</span></div>
      <div className="page-shell footer-grid">
        <div className="footer-intro">
          <Link className="brand-lockup footer-brand" href="/"><span>GLOBAL</span><strong>SAFETY</strong><i>GS</i></Link>
          <p>Practical, instructor-led safety training developed for your people, environment and goals.</p>
        </div>
        <div><h2>Explore</h2><Link href="/programs">Programs</Link><Link href="/who-we-serve">Who We Serve</Link><Link href="/about">About</Link><Link href="/faqs">FAQs</Link></div>
        <div><h2>Talk with us</h2><a href="tel:+18005622318">800-562-2318</a><a href="sms:+19512584854">Text 951-258-4854</a><p>Nationwide training<br />Mondayâ€“Friday<br />9:00 AMâ€“5:00 PM</p></div>
      </div>
      <div className="page-shell footer-bottom"><span>Â© 2026 Global Safety. All rights reserved.</span><span><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link><Link href="/disclaimer">Disclaimer</Link></span></div>
    </footer>
  );
}

export function ProgramCard({ program, index = 0 }: { program: Program; index?: number }) {
  return (
    <article className="program-card">
      <Link className="program-image" href={`/programs/${program.slug}`}>
        <span className="program-index">0{index + 1}</span>
        <img src={program.image} alt={program.imageAlt} />
      </Link>
      <div className="program-body">
        <p className="program-kicker">{program.audience}</p>
        <h3>{program.name}</h3>
        <p>{program.short}</p>
        <Link className="card-link" href={`/programs/${program.slug}`}>Explore program <span>â†—</span></Link>
      </div>
    </article>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="inner-hero">
      <div className="page-shell inner-hero-grid">
        <div><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1></div>
        <div className="inner-hero-copy">{children}</div>
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="page-shell contact-band-inner">
        <div><p className="eyebrow">Start with your real-world risks.</p><h2>Build the training plan your people will remember.</h2><p>Tell us who you need to prepare, where you are located and what you want them ready for.</p></div>
        <div className="button-row"><Link className="button button-dark" href="/contact">Request Training <span>â†—</span></Link><a className="button button-outline-dark" href="tel:+18005622318">Call 800-562-2318</a></div>
      </div>
    </section>
  );
}

