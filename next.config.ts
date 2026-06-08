import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['i.pravatar.cc', 'picsum.photos'],
  },
};

export default nextConfig;
