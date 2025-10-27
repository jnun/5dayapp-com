import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
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
