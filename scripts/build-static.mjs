
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const out = join(root, "dist");
const client = join(out, "client");

const logo = "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/GS%202024%20Logo.png/%3A/cr%3Dt%3A0%25%2Cl%3A0%25%2Cw%3A100%25%2Ch%3A100%25/rs%3Dh%3A500%2Ccg%3Atrue";

const programs = [
  {
    slug: "first-aid-cpr-aed",
    name: "First Aid, CPR & AED",
    kicker: "Medical emergency response",
    headline: "Be ready to act during a medical emergency.",
    short: "Hands-on training that builds the knowledge and confidence to provide immediate care until professional help arrives.",
    overview: "First Aid, CPR and AED training equips employees, teachers, staff and community members with practical skills for medical emergencies. Participants learn to recognize life-threatening conditions, provide immediate care, perform CPR and use an automated external defibrillator.",
    audience: ["Schools and educators", "Businesses and workplaces", "Churches and faith teams", "Community organizations"],
    learn: ["Recognize life-threatening conditions", "Provide immediate first aid", "Perform CPR", "Use an AED", "Contact emergency services effectively", "Respond with greater confidence"],
    outcomes: ["Faster emergency response", "Stronger CPR and AED skills", "Greater confidence under pressure", "Better readiness to protect lives"],
    duration: "Approximately 3 hours",
    classSize: "Up to 30 participants",
    format: "Instructor-led and hands-on",
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/f30174b8-f9d1-4486-ae4c-a7bb37c877a0.png/%3A/cr%3Dt%3A0%25%2Cl%3A0%25%2Cw%3A100%25%2Ch%3A100%25/rs%3Dw%3A365%2Ccg%3Atrue",
    alt: "First Aid, CPR and AED life saver training"
  },
  {
    slug: "threat-ready-survival",
    name: "Threat Ready Survival",
    kicker: "Threat recognition and response",
    headline: "Recognize threats early. Respond with confidence.",
    short: "Prevention-focused instruction for recognizing, avoiding and responding to acts of violence and other high-threat situations.",
    overview: "Threat Ready Survival helps participants recognize warning signs, improve personal safety and take effective action during rapidly evolving incidents. Discussion, demonstration and hands-on skill development work together to build preparedness without relying on fear-based messaging.",
    audience: ["Businesses and workplaces", "Schools and staff teams", "Churches and community groups", "Organizational leadership"],
    learn: ["Recognize warning signs", "Improve situational awareness", "Report concerning behavior", "Make decisions under stress", "Apply practical survival principles", "Help protect yourself and others"],
    outcomes: ["Earlier threat recognition", "Better decisions under stress", "Greater response confidence", "Practical defensive-response skills"],
    duration: "Approximately 2 hours",
    classSize: "Up to 30 participants",
    format: "Discussion, demonstration and hands-on practice",
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/9c46c01b-346a-46ab-8c0f-b61f2b926471-3f07ec2.png/%3A/rs%3Dw%3A365%2Ccg%3Atrue%2Cm",
    alt: "Threat Ready Survival program logo"
  },
  {
    slug: "safety-dragons",
    name: "Safety Dragons",
    kicker: "Pre-K through 6th grade",
    headline: "Help children become safer, calmer and better prepared.",
    short: "Engaging, age-appropriate instruction that helps young learners recognize hazards, make safe decisions and seek help.",
    overview: "Safety Dragons teaches emergency preparedness through interaction and guided discussion. The program focuses on preparedness rather than fear, giving children simple actions they can remember and use at school, at home and in their community.",
    audience: ["Preschools", "Elementary schools", "After-school programs", "Family and community groups"],
    learn: ["Recognize common hazards", "Make safer decisions", "Follow emergency instructions", "Understand personal responsibility", "Communicate concerns", "Know when and how to seek help"],
    outcomes: ["Stronger safety awareness", "More confidence in stressful moments", "Improved help-seeking skills", "Practical knowledge children remember"],
    duration: "Approximately 30 minutes",
    classSize: "Designed for classroom groups",
    format: "Interactive, age-appropriate classroom session",
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/SD%20small.png/%3A/cr%3Dt%3A16.09%25%2Cl%3A18.41%25%2Cw%3A66.67%25%2Ch%3A66.67%25/rs%3Dw%3A365%2Ccg%3Atrue%2Cm",
    alt: "Safety Dragons characters and logo"
  },
  {
    slug: "emergency-preparedness",
    name: "Emergency Preparedness",
    kicker: "Organizational readiness",
    headline: "Turn your emergency plan into practical readiness.",
    short: "Fact-focused instruction that helps employees, teachers and staff prepare for emergencies before they happen.",
    overview: "Emergency Preparedness combines real-world instruction with emergency action plan review. Participants learn to recognize hazards, make informed decisions, communicate effectively and respond with confidence during critical incidents.",
    audience: ["Businesses and workplaces", "Schools and educational teams", "Churches and nonprofits", "Community organizations"],
    learn: ["Recognize organizational hazards", "Understand emergency procedures", "Make informed decisions", "Communicate during incidents", "Coordinate personnel accountability", "Support continuity and recovery"],
    outcomes: ["Greater hazard awareness", "Improved emergency decisions", "Better coordination and communication", "Stronger organizational resilience"],
    duration: "Approximately 30 minutes",
    classSize: "Customized for your organization",
    format: "Instruction plus emergency action plan review",
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/ChatGPT%20Image%20Jun%2010%2C%202026%2C%2005_14_07%20P-8b319bc.png/%3A/cr%3Dt%3A0%25%2Cl%3A0%25%2Cw%3A100%25%2Ch%3A100%25/rs%3Dw%3A365%2Ccg%3Atrue",
    alt: "Emergency preparedness program emblem"
  }
];

const nav = `
  <div class="topbar"><div class="page-shell"><span>Nationwide instructor-led training</span><span><a href="tel:+18005622318">Office 800-562-2318</a><i></i><a href="sms:+19512584854">Text 951-258-4854</a></span></div></div>
  <header class="site-header"><div class="page-shell header-inner">
    <a class="brand-lockup" href="/" aria-label="Global Safety home"><span>GLOBAL</span><strong>SAFETY</strong><i>GS</i></a>
    <nav aria-label="Main navigation"><a href="/programs">Programs</a><a href="/who-we-serve">Who We Serve</a><a href="/about">About</a><a href="/faqs">FAQs</a><a href="/contact">Contact</a></nav>
    <a class="button button-header" href="/contact">Request Training <span>&nearr;</span></a>
  </div></header>`;

const footer = `
  <footer class="site-footer"><div class="page-shell footer-headline"><span>Prepare.</span><span>Respond.</span><span>Recover.</span></div><div class="page-shell footer-grid">
    <div class="footer-intro"><a class="brand-lockup footer-brand" href="/"><span>GLOBAL</span><strong>SAFETY</strong><i>GS</i></a><p>Practical, instructor-led safety training developed for your people, environment and goals.</p></div>
    <div><h2>Explore</h2><a href="/programs">Programs</a><a href="/who-we-serve">Who We Serve</a><a href="/about">About</a><a href="/faqs">FAQs</a><a href="/contact">Contact</a></div>
    <div><h2>Talk with us</h2><a href="tel:+18005622318">800-562-2318</a><a href="sms:+19512584854">Text 951-258-4854</a><p>Nationwide training<br>Monday-Friday<br>9:00 AM-5:00 PM</p></div>
  </div><div class="page-shell footer-bottom"><span>&copy; 2026 Global Safety. All rights reserved.</span><span><a href="/privacy">Privacy</a><a href="/accessibility">Accessibility</a><a href="/disclaimer">Disclaimer</a></span></div></footer>`;

function shell(title, description, body, current = "") {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | Global Safety</title><meta name="description" content="${description}"><meta property="og:title" content="${title} | Global Safety"><meta property="og:description" content="${description}"><meta property="og:image" content="/og.jpg"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.svg"><link rel="preload" href="/hero-prepared.webp" as="image" type="image/webp"><link rel="preload" href="/hero-unprepared.webp" as="image" type="image/webp"><link rel="stylesheet" href="/styles.css"><script src="/site.js" defer></script></head><body data-page="${current}"><div class="page-wipe" aria-hidden="true"></div>${nav}<main>${body}</main>${footer}</body></html>`;
}

const buttonPair = `<div class="button-row"><a class="button button-accent" href="/contact">Request Training Information</a><a class="button button-ghost" href="tel:+18005622318">Call 800-562-2318</a></div>`;
const contactBand = `<section class="contact-band"><div class="page-shell contact-band-inner"><div><p class="eyebrow">Start with your real-world risks.</p><h2>Build the training plan your people will remember.</h2><p>Tell us who you need to prepare, where you are located and what you want them ready for.</p></div><div class="button-row"><a class="button button-dark" href="/contact">Request Training <span>&nearr;</span></a><a class="button button-outline-dark" href="tel:+18005622318">Call 800-562-2318</a></div></div></section>`;
const pageHero = (eyebrow, title, copy, action = true) => `<section class="inner-hero"><div class="page-shell inner-hero-grid"><div><p class="eyebrow light">${eyebrow}</p><h1>${title}</h1></div><div class="inner-hero-copy"><p>${copy}</p>${action ? `<a class="text-link light-link" href="/contact">Request training <span>&rarr;</span></a>` : ""}</div></div></section>`;

const programCards = programs.map((p, index) => `<article class="program-card"><a class="program-image" href="/programs/${p.slug}"><span class="program-index">0${index + 1}</span><img src="${p.image}" alt="${p.alt}"></a><div class="program-body"><p class="program-kicker">${p.kicker}</p><h3>${p.name}</h3><p>${p.short}</p><a class="card-link" href="/programs/${p.slug}">Explore program <span>&nearr;</span></a></div></article>`).join("");

const home = shell("Train for the moment that matters", "Nationwide instructor-led safety training developed around your people, environment and real-world risks.", `
  <section class="hero-premium"><div class="hero-orbit" aria-hidden="true"></div><div class="page-shell hero-premium-grid"><div class="hero-premium-copy"><p class="eyebrow light">Nationwide / Instructor-led / Built for your environment</p><h1>Train for the <em>moment</em> that matters.</h1><p class="hero-lede">Global Safety turns emergency plans into clear decisions, practiced skills and people who are ready to act.</p><div class="button-row"><a class="button button-accent" href="/contact">Build your training plan <span>&nearr;</span></a><a class="button button-ghost" href="tel:+18005622318">Call 800-562-2318</a></div><div class="hero-proof"><span>For schools</span><span>For workplaces</span><span>For communities</span></div></div><div class="hero-visual-wrap"><div class="hero-visual-code"><span>READINESS / 01</span><span>MOVE CURSOR &rarr;</span></div><div class="readiness-reveal" data-reveal role="slider" aria-label="Move to reveal a safety instructor becoming work-ready with a hard hat and safety glasses" aria-valuemin="0" aria-valuemax="100" aria-valuenow="52" tabindex="0" style="--reveal:52%"><img class="reveal-base" src="/hero-unprepared.webp" alt="Safety instructor before putting on protective equipment"><div class="reveal-ready" aria-hidden="true"><img src="/hero-prepared.webp" alt=""></div><div class="reveal-shade" aria-hidden="true"></div><div class="reveal-handle" aria-hidden="true"><span><i></i><i></i></span></div><p class="reveal-instruction"><span>Move</span> to reveal readiness</p><span class="reveal-state reveal-state-before">Everyday</span><span class="reveal-state reveal-state-after">Ready</span></div><div class="hero-visual-foot"><strong>Preparedness is a practiced skill.</strong><span>Not a PDF in a drawer.</span></div></div></div><div class="hero-rail"><div><span>PREPARE</span><i></i><span>RESPOND</span><i></i><span>RECOVER</span><i></i><span>REAL SKILLS FOR REAL MOMENTS</span><i></i><span>PREPARE</span><i></i><span>RESPOND</span><i></i><span>RECOVER</span><i></i><span>REAL SKILLS FOR REAL MOMENTS</span></div></div></section>
  <section class="trust-strip"><div class="page-shell trust-grid"><p><strong>Instructor-led</strong><span>Human guidance, not another generic module</span></p><p><strong>Hands-on</strong><span>Skills built through participation and practice</span></p><p><strong>Specific</strong><span>Training shaped around your people and environment</span></p><p><strong>Nationwide</strong><span>Professional training where your team needs it</span></p></div></section>
  <section class="statement-section"><div class="page-shell statement-grid"><p class="eyebrow">The gap we close / 001</p><h2>A plan on paper is not a response under pressure.</h2><p class="statement-copy">When seconds matter, people need more than information. They need a clear next move they have already understood, discussed and practiced.</p><div class="statement-meter" aria-hidden="true"><span>Uncertainty</span><i></i><strong>Capability</strong></div></div></section>
  <section class="section page-shell programs-stage"><div class="section-heading split-heading"><div><p class="eyebrow">Four focused programs</p><h2>Build readiness where it counts.</h2></div><div><p>Start with one program or combine training around the risks, people and responsibilities in your organization.</p><a class="text-link" href="/programs">Compare all programs <span>&nearr;</span></a></div></div><div class="program-grid">${programCards}</div></section>
  <section class="method-section"><div class="page-shell method-grid"><div class="method-heading"><p class="eyebrow light">Prepare / Respond / Recover</p><h2>We train the whole decision&mdash;not just the first step.</h2><p>Every program connects awareness to action, then carries the thinking through what happens next.</p></div><div class="method-steps"><article><span>01</span><div><h3>See it sooner.</h3><p>Recognize risk, warning signs and the conditions that call for action.</p></div></article><article><span>02</span><div><h3>Choose the next move.</h3><p>Turn uncertainty into clear decisions people can recall under pressure.</p></div></article><article><span>03</span><div><h3>Practice the response.</h3><p>Build confidence through instructor-led discussion, demonstration and participation.</p></div></article></div></div></section>
  <section class="section page-shell audience-stage"><div class="section-heading"><p class="eyebrow">Training that fits the room</p><h2>Different people. Different risks. One standard: ready.</h2></div><div class="audience-grid"><a href="/who-we-serve#schools"><span>01 / EDU</span><h3>Schools</h3><p>Students, educators and school staff.</p><b>&nearr;</b></a><a href="/who-we-serve#businesses"><span>02 / WORK</span><h3>Workplaces</h3><p>Employees, leaders and response teams.</p><b>&nearr;</b></a><a href="/who-we-serve#churches"><span>03 / FAITH</span><h3>Churches</h3><p>Staff, volunteers and congregations.</p><b>&nearr;</b></a><a href="/who-we-serve#community"><span>04 / COMMUNITY</span><h3>Community groups</h3><p>Leaders, members and local organizations.</p><b>&nearr;</b></a></div></section>
  <section class="process-section"><div class="process-word" aria-hidden="true">READY</div><div class="page-shell"><div class="section-heading"><p class="eyebrow">From concern to capability</p><h2>Simple to start. Specific to you.</h2></div><div class="process-grid"><article><span>01</span><h3>Share your risks</h3><p>Tell us who you need to prepare, where they work and what concerns you most.</p></article><article><span>02</span><h3>Shape the program</h3><p>We identify the right training and tailor the format to your organization.</p></article><article><span>03</span><h3>Train with purpose</h3><p>Your people leave with clearer decisions and practical response skills.</p></article></div></div></section>
  ${contactBand}`, "home");

const comparisonRows = programs.map(p => `<tr><th><a href="/programs/${p.slug}">${p.name}</a></th><td>${p.kicker}</td><td>${p.duration}</td><td>${p.format}</td></tr>`).join("");
const programsPage = shell("Training Programs", "Compare Global Safety programs for medical response, threats, children and organizational preparedness.", `
  ${pageHero("Training programs", "Training that turns awareness into action.", "Explore four instructor-led programs that help people prepare for medical emergencies, organizational incidents and high-threat situations.")}
  <section class="section page-shell"><div class="program-grid">${programCards}</div></section>
  <section class="table-section"><div class="page-shell"><div class="section-heading"><p class="eyebrow">At a glance</p><h2>Compare your options.</h2></div><div class="table-wrap"><table><thead><tr><th>Program</th><th>Primary focus</th><th>Typical duration</th><th>Format</th></tr></thead><tbody>${comparisonRows}</tbody></table></div><p class="table-note">Program length and class size may be adjusted when Global Safety develops your training plan.</p></div></section>
  <section class="section page-shell custom-panel"><div><p class="eyebrow">Customized training</p><h2>Not sure where to begin?</h2></div><div><p>Start with the people you need to prepare and the emergencies you are most concerned about. Global Safety can recommend a focused program or a combination of programs.</p><a class="button button-dark" href="/contact">Discuss Your Needs</a></div></section>
  ${contactBand}`, "programs");

function programPage(program) {
  const related = programs.filter(p => p.slug !== program.slug).slice(0, 2);
  return shell(program.name, program.short, `
    <section class="program-hero"><div class="page-shell program-hero-grid"><div><p class="eyebrow light">${program.kicker}</p><h1>${program.headline}</h1><p class="hero-lede">${program.short}</p>${buttonPair}</div><div class="program-hero-art"><img src="${program.image}" alt="${program.alt}"><span>${program.name}</span></div></div></section>
    <section class="section page-shell overview-grid"><div><p class="eyebrow">Program overview</p><h2>${program.name}</h2></div><div class="large-copy dark-copy"><p>${program.overview}</p></div></section>
    <section class="soft-section"><div class="page-shell two-column"><div><p class="eyebrow">Who it is for</p><h2>Designed around your audience.</h2><ul class="check-list">${program.audience.map(x => `<li>${x}</li>`).join("")}</ul></div><div><p class="eyebrow">What participants learn</p><h2>Skills with a clear purpose.</h2><ul class="check-list">${program.learn.map(x => `<li>${x}</li>`).join("")}</ul></div></div></section>
    <section class="section page-shell"><div class="section-heading"><p class="eyebrow">Program details</p><h2>What to expect.</h2></div><div class="detail-grid"><article><span>Duration</span><strong>${program.duration}</strong></article><article><span>Class size</span><strong>${program.classSize}</strong></article><article><span>Format</span><strong>${program.format}</strong></article></div></section>
    <section class="dark-section"><div class="page-shell outcome-feature"><div><p class="eyebrow light">Key outcomes</p><h2>Knowledge people can put into action.</h2></div><div class="outcome-list">${program.outcomes.map((x, i) => `<p><span>0${i + 1}</span>${x}</p>`).join("")}</div></div></section>
    <section class="section page-shell"><div class="section-heading"><p class="eyebrow">Related training</p><h2>Build a more complete preparedness plan.</h2></div><div class="related-grid">${related.map(p => `<a href="/programs/${p.slug}"><span>${p.kicker}</span><h3>${p.name}</h3><p>${p.short}</p><strong>Explore program &rarr;</strong></a>`).join("")}</div></section>
    ${contactBand}`, program.slug);
}

const servePage = shell("Who We Serve", "Global Safety training for schools, businesses, churches and community organizations.", `
  ${pageHero("Who we serve", "Training for the people you are responsible for.", "Every organization has different people, risks and procedures. Global Safety helps you choose training that fits all three.")}
  <section class="section page-shell audience-list">
    <article id="schools"><div><span>01</span><p class="eyebrow">Schools and education</p><h2>Prepare students, educators and staff.</h2><p>Age-appropriate learning for children combines with practical preparation for the adults responsible for them.</p></div><ul><li>Safety Dragons</li><li>Staff First Aid, CPR & AED</li><li>Emergency Preparedness</li><li>Threat Ready Survival</li></ul></article>
    <article id="businesses"><div><span>02</span><p class="eyebrow">Businesses and workplaces</p><h2>Build capability across your organization.</h2><p>Help employees and leaders understand plans, recognize hazards and respond during critical incidents.</p></div><ul><li>Emergency Action Plan review</li><li>Medical emergency response</li><li>Workplace preparedness</li><li>Threat recognition and response</li></ul></article>
    <article id="churches"><div><span>03</span><p class="eyebrow">Churches and faith organizations</p><h2>Support staff, volunteers and congregations.</h2><p>Practical training can help the people who welcome, serve and protect your community respond more effectively.</p></div><ul><li>Volunteer and staff preparedness</li><li>First Aid, CPR & AED</li><li>Emergency procedures</li><li>Threat awareness</li></ul></article>
    <article id="community"><div><span>04</span><p class="eyebrow">Community organizations</p><h2>Make readiness more accessible.</h2><p>Bring clear, useful safety instruction to the groups and community members you serve.</p></div><ul><li>Group First Aid and CPR</li><li>Preparedness education</li><li>Age-appropriate programs</li><li>Customized safety training</li></ul></article>
  </section>${contactBand}`, "who-we-serve");

const aboutPage = shell("About", "Learn about Global Safety's practical, instructor-led approach to preparedness.", `
  ${pageHero("About Global Safety", "Preparedness should feel practical, not overwhelming.", "We help people understand what to do before, during and after an emergency through direct, instructor-led learning.")}
  <section class="section page-shell overview-grid"><div><p class="eyebrow">Our purpose</p><h2>Build capability before it is needed.</h2></div><div class="large-copy dark-copy"><p>Global Safety develops training for the specific workspace and audience in front of us. The goal is straightforward: replace uncertainty with useful knowledge, practiced skills and greater confidence.</p><p>Programs range from medical response and organizational preparedness to threat-response training and age-appropriate learning for children.</p></div></section>
  <section class="values-section"><div class="page-shell values-grid"><article><span>01 / PREPARE</span><h2>Understand the risk.</h2><p>Build awareness and learn the steps that support an effective response.</p></article><article><span>02 / RESPOND</span><h2>Act with purpose.</h2><p>Develop practical skills through interaction, demonstration and hands-on learning.</p></article><article><span>03 / RECOVER</span><h2>Know what comes next.</h2><p>Approach readiness as a complete process rather than a single moment.</p></article></div></section>
  <section class="section page-shell two-column"><div><p class="eyebrow">What to expect</p><h2>Training built around people.</h2></div><ul class="check-list large-checks"><li>Instructor-led delivery</li><li>Organization-specific development</li><li>Hands-on participation</li><li>Clear, fact-focused discussion</li><li>Age-appropriate instruction</li><li>Nationwide availability</li></ul></section>
  ${contactBand}`, "about");

const galleryPage = shell("Training Gallery", "A visual layout for Global Safety training photos and program highlights.", `
  ${pageHero("Training in action", "Show visitors what practical preparedness looks like.", "Use this page for authentic classroom, workplace and hands-on training photographs. The labeled spaces below show the strongest arrangement.", false)}
  <section class="section page-shell"><div class="gallery-grid">${programs.map((p, i) => `<article class="gallery-tile ${i === 0 ? "gallery-wide" : ""}"><div><img src="${p.image}" alt="${p.alt}"></div><span>${p.name}</span><p>Replace this program graphic with a strong, authentic training photograph when available.</p></article>`).join("")}<article class="gallery-tile gallery-placeholder"><div><strong>+</strong></div><span>Organization and group photo</span><p>Add a wide image that shows the instructor, participants and training environment together.</p></article></div></section>
  ${contactBand}`, "gallery");

const faqs = [
  ["Does Global Safety provide nationwide training?", "Yes. Global Safety advertises nationwide training. Scheduling, location and travel details are discussed during the initial conversation."],
  ["Can training be provided at our location?", "Training is developed for your organization and can be discussed for your workplace, school, church or community location."],
  ["Which program is right for us?", "Begin with your audience, risks and goals. Global Safety can recommend one program or a combination of programs."],
  ["Can the training be customized?", "Yes. The training approach is designed around your people, environment and organizational needs."],
  ["How long does training take?", "Typical lengths range from about 30 minutes to three hours depending on the program. Confirm the final format when scheduling."],
  ["How many participants can attend?", "First Aid/CPR/AED and Threat Ready Survival are commonly presented for groups of up to 30. Other program sizes are discussed during planning."],
  ["How is pricing determined?", "Pricing depends on the program, number of participants, location, scheduling and any customization. Call or submit a request for details."],
  ["What should we have ready when contacting you?", "Your organization type, location, estimated participant count, preferred timeframe and program interests are the most helpful starting details."]
];
const faqPage = shell("Frequently Asked Questions", "Answers to common questions about Global Safety programs, scheduling and pricing.", `
  ${pageHero("Frequently asked questions", "Clear answers before the conversation begins.", "Review common questions about program selection, class details, scheduling and pricing.", false)}
  <section class="section page-shell faq-layout"><div><p class="eyebrow">Questions and answers</p><h2>What organizations usually ask.</h2><p>If your question is not answered here, call or text Global Safety.</p></div><div class="faq-list">${faqs.map((x, i) => `<details ${i === 0 ? "open" : ""}><summary>${x[0]}<span>+</span></summary><p>${x[1]}</p></details>`).join("")}</div></section>
  ${contactBand}`, "faqs");

const contactPage = shell("Contact", "Request information about nationwide Global Safety training.", `
  ${pageHero("Contact Global Safety", "Let&rsquo;s discuss your training needs.", "Tell us about your organization, audience and goals. We will use that information to begin identifying the right program and format.", false)}
  <section class="section page-shell contact-layout"><form class="request-form" action="/thank-you" method="get"><p class="eyebrow">Training request</p><h2>Tell us what you need.</h2><div class="form-grid"><label>Full name<input name="name" autocomplete="name" required></label><label>Organization<input name="organization" autocomplete="organization" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Phone<input name="phone" type="tel" autocomplete="tel"></label><label>City and state<input name="location" autocomplete="address-level2"></label><label>Organization type<select name="type"><option value="">Select one</option><option>School or educational organization</option><option>Business or workplace</option><option>Church or faith organization</option><option>Community organization</option><option>Other</option></select></label><label>Program of interest<select name="program"><option value="">Not sure yet</option>${programs.map(p => `<option>${p.name}</option>`).join("")}</select></label><label>Estimated participants<input name="participants" inputmode="numeric"></label><label class="full-field">Preferred timeframe<input name="timeframe" placeholder="Example: September or within 60 days"></label><label class="full-field">Questions or training needs<textarea name="message" rows="5" placeholder="Tell us what you would like your people to be prepared for."></textarea></label></div><button class="button button-accent" type="submit">Submit Training Request</button><p class="form-note">Prefer a conversation? Call 800-562-2318 or text 951-258-4854.</p></form><aside class="contact-sidebar"><p class="eyebrow light">Talk with us directly</p><h2>Start with a conversation.</h2><div><span>Office</span><a href="tel:+18005622318">800-562-2318</a></div><div><span>Mobile / Text</span><a href="sms:+19512584854">951-258-4854</a></div><div><span>Availability</span><p>Nationwide training<br>Monday-Friday<br>9:00 AM-5:00 PM</p></div><hr><h3>What happens next</h3><ol><li>We review your request.</li><li>We contact you to discuss the details.</li><li>We recommend a program and format.</li><li>We provide scheduling and pricing information.</li></ol></aside></section>`, "contact");

const thankYouPage = shell("Thank You", "Your Global Safety training inquiry has been received.", `<section class="confirmation"><div class="page-shell"><span>Request received</span><h1>Thank you for contacting Global Safety.</h1><p>This model shows the confirmation page visitors should see after submitting your GoDaddy form. For immediate assistance, call the office.</p><div class="button-row"><a class="button button-accent" href="tel:+18005622318">Call 800-562-2318</a><a class="button button-ghost" href="/">Return Home</a></div></div></section>`, "thank-you");

function policyPage(title, intro, sections, slug) {
  return shell(title, intro, `${pageHero("Website information", title, intro, false)}<section class="section page-shell policy-layout"><aside><p class="eyebrow">On this page</p>${sections.map((s, i) => `<a href="#section-${i + 1}">${s[0]}</a>`).join("")}</aside><div>${sections.map((s, i) => `<section id="section-${i + 1}"><h2>${s[0]}</h2><p>${s[1]}</p></section>`).join("")}</div></section>`, slug);
}

const privacyPage = policyPage("Privacy Policy", "A practical starter policy for the information collected through this website. Have final language reviewed before publishing.", [["Information collected", "The website may collect information that visitors voluntarily provide through forms, including names, contact details, organization information and training interests."],["How information is used", "Information may be used to respond to requests, discuss services, prepare scheduling or pricing information and improve the website experience."],["Cookies and analytics", "The website may use cookies and aggregated analytics to understand traffic and website performance. GoDaddy settings should be configured to match the final policy."],["Information sharing", "Describe any service providers that process website forms or analytics. Do not claim that information is never shared if GoDaddy or another provider processes it."],["Your choices", "Visitors should be given a way to request access, correction or deletion of personal information where applicable."],["Contact", "Add the verified business email or mailing address visitors should use for privacy questions."]], "privacy");
const accessibilityPage = policyPage("Accessibility Statement", "Global Safety is committed to providing a website that is usable by the widest possible audience.", [["Our commitment", "The goal is to maintain clear navigation, readable text, sufficient color contrast, descriptive image text and keyboard-friendly controls."],["Ongoing improvement", "Website content and features should be reviewed as pages are added or changed."],["Feedback", "If you experience difficulty using the website, contact Global Safety by calling 800-562-2318 or texting 951-258-4854 and describe the page or feature involved."]], "accessibility");
const disclaimerPage = policyPage("Website Disclaimer", "Important context for safety information presented on the Global Safety website. Have final legal language reviewed before publishing.", [["Educational information", "Website content is general educational information and is not a substitute for participating in professional instruction or following your organization-specific emergency procedures."],["Emergency situations", "In an active emergency, contact the appropriate emergency services and follow instructions from public safety authorities."],["Training and certification", "Program details, certification status, duration and availability should be confirmed directly with Global Safety before relying on them."],["No guarantee", "Training can improve preparedness but cannot eliminate every risk or guarantee a particular outcome during an emergency."]], "disclaimer");

const pageEntries = [
  ["/", home], ["/programs", programsPage],
  ...programs.map(p => [`/programs/${p.slug}`, programPage(p)]),
  ["/who-we-serve", servePage], ["/about", aboutPage], ["/gallery", galleryPage], ["/faqs", faqPage], ["/contact", contactPage], ["/thank-you", thankYouPage], ["/privacy", privacyPage], ["/accessibility", accessibilityPage], ["/disclaimer", disclaimerPage]
];

await rm(out, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(join(out, "server"), { recursive: true });
for (const [route, html] of pageEntries) {
  const file = route === "/" ? join(client, "index.html") : join(client, route.slice(1), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
await copyFile(join(root, "app", "globals.css"), join(client, "styles.css"));
await copyFile(join(root, "public", "og.jpg"), join(client, "og.jpg"));
await copyFile(join(root, "public", "favicon.svg"), join(client, "favicon.svg"));
await copyFile(join(root, "public", "hero-unprepared.webp"), join(client, "hero-unprepared.webp"));
await copyFile(join(root, "public", "hero-prepared.webp"), join(client, "hero-prepared.webp"));
await copyFile(join(root, "public", "site.js"), join(client, "site.js"));

const routes = Object.fromEntries(pageEntries.flatMap(([route]) => route === "/" ? [["/", "/index.html"]] : [[route, `${route}/index.html`], [`${route}/`, `${route}/index.html`]]));
await writeFile(join(out, "server", "index.js"), `const routes=${JSON.stringify(routes)}; export default { async fetch(request, env) { const url = new URL(request.url); const path = routes[url.pathname] || url.pathname; return env.ASSETS.fetch(new Request(new URL(path, request.url), request)); } };`);
console.log(`Static site built with ${pageEntries.length} pages`);

