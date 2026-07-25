import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
