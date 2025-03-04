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
      },{
        protocol: "https",
        hostname: "th.bing.com"
      },
    ],
  },
};

export default nextConfig;
