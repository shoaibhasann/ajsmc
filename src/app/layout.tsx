import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // Egmore moved ahead of the brand on 11 September 2026, against the reasoning that
    // used to sit here — that Chennai carries the volume, so city first and locality
    // second. Search Console disagreed. "egmore hospital" is the third-largest query
    // the site gets, 241 impressions in 24 days at position 8.3, and it has never once
    // been clicked. Egmore was last in this title, after the brand, where a scanning
    // eye does not reach. It now reads as the phrase people actually type.
    default: "Multi Speciality Hospital in Egmore, Chennai | AJSMC",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  // Google has ignored this tag since 2009, so it is here only for the handful of
  // smaller crawlers and internal search tools that still read it. Nothing about the
  // site's ranking depends on it, and no term belongs here that the pages do not
  // genuinely cover.
  keywords: [
    "multi speciality hospital in Egmore",
    "AJSMC",
    "AJ Subaitha Medical Centre",
    "hospital in Egmore Chennai",
    "day care surgery Chennai",
    "sleep study Chennai",
    "general physician Egmore",
  ],
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    // No `url` here: it would be inherited verbatim by every page, stamping the
    // home URL into og:url site-wide. Canonicals are set per page instead.
    siteName: siteConfig.fullName,
    title: `${siteConfig.fullName}: Multi Speciality Hospital in Egmore, Chennai`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName}: Multi Speciality Hospital in Egmore, Chennai`,
    description: siteConfig.description,
  },
  // Proves ownership of the property to Google Search Console. It has to stay:
  // Google re-checks the tag periodically and drops verification if it vanishes,
  // which would take the Search Console data with it.
  //
  // Rotated 7 September 2026 when the property moved to a different Google account.
  // The previous token was FbA8KQ9h-8RlmXyodvdIoEdtqeouwkCHJtIF0k-x1_M; replacing it
  // unverifies the old property and its history goes with it. Google accepts more than
  // one verification tag on a page, so if the old account's data is ever wanted back,
  // both tokens can sit here together rather than one replacing the other.
  verification: {
    google: "7Ju7JQjbLYvbECOzgyVbtBPk9yc2meTMTRvp_61RZb0",
  },
  // Only the directives that are not already the default. `index, follow` is what
  // a crawler assumes when no robots tag is present, so stating it bought nothing
  // and cost something: it is inherited by every route including the 404, which
  // Next also stamps with its own `noindex`, leaving two contradictory robots tags
  // in one head. The preview limits below are genuinely non-default and stay.
  robots: {
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0C2E6E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${jakarta.variable}`}>
      <head>
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="flex min-h-screen flex-col bg-bg font-body text-ink antialiased">
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
