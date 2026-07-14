
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://globalsafety.us"),
  title: { default: "Global Safety | Train for the Moment That Matters", template: "%s | Global Safety" },
  description: "Nationwide instructor-led safety training developed around your people, environment and real-world risks.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Global Safety | Train for the Moment That Matters",
    description: "Practical, instructor-led safety training built around your organization.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1732, height: 908, alt: "Global Safety â€” Prepare, Respond, Recover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Safety | Train for the Moment That Matters",
    description: "Practical, instructor-led safety training built around your organization.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

