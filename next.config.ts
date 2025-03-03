import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dicenroll.it",
      },
      {
        protocol: "https",
        hostname: "cf.geekdo-images.com"
      },
    ],
  },
};

export default nextConfig;
