import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    domains: ['i.pravatar.cc', 'picsum.photos','res.cloudinary.com'],
  },
};

export default nextConfig;
