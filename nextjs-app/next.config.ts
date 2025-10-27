import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/pitch.html',
        destination: '/pitch',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
