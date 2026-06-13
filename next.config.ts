import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "quqpwiooyodijkxrtlxk.supabase.co",
      },
    ],
  },
};

export default nextConfig;