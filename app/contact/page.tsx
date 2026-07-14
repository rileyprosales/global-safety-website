
import { PageHero, SiteFooter, SiteHeader } from "../components";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero eyebrow="Contact" title="Letâ€™s talk about your training needs.">
          <p>Call or text Global Safety to discuss your audience, location, program interests, availability, and pricing.</p>
        </PageHero>
        <section className="section page-shell contact-layout">
          <div className="contact-primary">
            <p className="eyebrow">Nationwide training</p><h2>Start with a conversation.</h2>
            <div className="contact-method"><span>Office</span><a href="tel:+18005622318">800-562-2318</a><small>Call to discuss programs, scheduling, and pricing.</small></div>
            <div className="contact-method"><span>Mobile / Text</span><a href="tel:+19512584854">951-258-4854</a><small>Call or send a text message.</small></div>
            <div className="button-row"><a className="button button-accent" href="tel:+18005622318">Call the office</a><a className="button button-outline-dark" href="sms:+19512584854">Send a text</a></div>
          </div>
          <aside className="inquiry-card"><p className="eyebrow">Helpful details</p><h2>Before you call</h2><p>Having these details ready will help begin the conversation:</p><ul><li>Program or skills you are interested in</li><li>Organization and audience type</li><li>Estimated number of participants</li><li>Training location</li><li>Preferred dates or timeframe</li></ul><p className="hours"><strong>Appointments &amp; pricing</strong><br />Call or text to discuss your training needs.</p></aside>
        </section>
        <section className="contact-close"><div className="page-shell"><p>PREPARE <span>â€¢</span> RESPOND <span>â€¢</span> RECOVER</p></div></section>
      </main>
      <SiteFooter />
    </>
  );
}

