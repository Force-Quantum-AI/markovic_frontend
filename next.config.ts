import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['i.pravatar.cc', 'picsum.photos'],
  },
};

export default nextConfig;
