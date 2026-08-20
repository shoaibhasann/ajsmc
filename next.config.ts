import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The old WordPress site (retired when ajsmc.in was pointed at this app) used
   * `/index.php/...` permalinks, and these are the URLs Google had indexed — its
   * sitemap listed exactly these eight. Each gets a 301 to its replacement so the
   * indexed links keep working and their signals transfer; the catch-all last line
   * sweeps anything else under /index.php/ (wp-json, stray posts) to the home page.
   * Order matters: Next.js applies the first matching redirect.
   */
  async redirects() {
    return [
      { source: "/index.php/about-us", destination: "/about", permanent: true },
      { source: "/index.php/our-specialties", destination: "/specialties", permanent: true },
      { source: "/index.php/meet-our-expert-team", destination: "/doctors", permanent: true },
      { source: "/index.php/career-with-us", destination: "/contact", permanent: true },
      { source: "/index.php/blog", destination: "/blog", permanent: true },
      { source: "/index.php/reach-us", destination: "/contact", permanent: true },
      { source: "/index.php/book-an-apponient", destination: "/contact", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      // Deliberately no catch-all for the rest of /index.php/*. There was one,
      // sending everything unmatched to the home page, and Google's own soft-404
      // documentation names exactly that — redirecting a page that does not exist
      // to the home page — as the thing not to do. WordPress exposed plenty of
      // other paths under this prefix (wp-json, feeds, category and tag archives;
      // the Wayback index still lists /index.php/wp-json/), and each one was
      // answering with the home page instead of admitting it was gone. They now
      // fall through to a real 404, which is the honest answer and lets Google
      // drop them instead of recrawling them.
    ];
  },
  images: {
    // Scoped to our Cloudinary account only — see src/lib/assets.ts
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dh4blkvix/image/upload/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
