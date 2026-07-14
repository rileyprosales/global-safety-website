
export type Program = {
  slug: string;
  name: string;
  audience: string;
  short: string;
  details: string;
  topics: string[];
  image: string;
  imageAlt: string;
};

export const programs: Program[] = [
  {
    slug: "first-aid-cpr-aed",
    name: "First Aid, CPR & AED",
    audience: "Life safety certification",
    short: "Certification-focused training that builds essential medical-response skills.",
    details: "Life safety certification training with additional instruction available for BLS, EMR, and Stop-the-Bleed.",
    topics: ["First Aid", "CPR & AED", "BLS", "EMR", "Stop-the-Bleed"],
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/f30174b8-f9d1-4486-ae4c-a7bb37c877a0.png/%3A/cr%3Dt%3A0%25%2Cl%3A0%25%2Cw%3A100%25%2Ch%3A100%25/rs%3Dw%3A365%2Ccg%3Atrue",
    imageAlt: "First Aid, CPR and AED life saver training",
  },
  {
    slug: "threat-ready-survival",
    name: "Threat Ready Survival",
    audience: "Active threat response",
    short: "Hands-on skill development for a proper response to an active shooter or active threat.",
    details: "Instructor-led, hands-on training that helps participants develop skills to properly respond to an active shooter or active threat.",
    topics: ["Awareness", "Response options", "Practical skill development", "Instructor-led scenarios"],
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/9c46c01b-346a-46ab-8c0f-b61f2b926471-3f07ec2.png/%3A/rs%3Dw%3A365%2Ccg%3Atrue%2Cm",
    imageAlt: "Threat Ready Survival program logo",
  },
  {
    slug: "safety-dragons",
    name: "Safety Dragons",
    audience: "Pre-K through 6th grade",
    short: "Emergency preparedness instruction designed specifically for young learners.",
    details: "Age-appropriate emergency preparedness training for Pre-K through 6th grade, led through interaction and discussion.",
    topics: ["Age-appropriate learning", "Interaction", "Guided discussion", "Emergency preparedness"],
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/SD%20small.png/%3A/cr%3Dt%3A16.09%25%2Cl%3A18.41%25%2Cw%3A66.67%25%2Ch%3A66.67%25/rs%3Dw%3A365%2Ccg%3Atrue%2Cm",
    imageAlt: "Safety Dragons characters and logo",
  },
  {
    slug: "emergency-preparedness",
    name: "Emergency Preparedness",
    audience: "Workplace readiness",
    short: "Fact-focused, no-fluff training for natural disasters, workplace emergencies, and medical awareness.",
    details: "Hands-on preparedness training covering natural disasters, workplace emergencies, and medical awareness with a practical, fact-focused approach.",
    topics: ["Natural disasters", "Workplace emergencies", "Medical awareness", "Hands-on learning"],
    image: "https://img1.wsimg.com/isteam/ip/dcd334aa-85da-431d-9728-71f35641f09b/ChatGPT%20Image%20Jun%2010%2C%202026%2C%2005_14_07%20P-8b319bc.png/%3A/cr%3Dt%3A0%25%2Cl%3A0%25%2Cw%3A100%25%2Ch%3A100%25/rs%3Dw%3A365%2Ccg%3Atrue",
    imageAlt: "Emergency preparedness program emblem",
  },
];

