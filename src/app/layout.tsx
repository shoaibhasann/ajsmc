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
    // "Chennai" carries the volume; "Egmore" is the qualifier that wins the local
    // pack and tells a patient whether we are reachable. City first, locality second.
    default: "Multi Speciality Hospital in Chennai | AJSMC, Egmore",
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
    title: `${siteConfig.fullName}: Multi Speciality Hospital in Chennai`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName}: Multi Speciality Hospital in Egmore, Chennai`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
