import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/ternak/**',
      },
      // Optional: Untuk gambar dari luar (jika ada)
      {
        protocol: 'https',
        hostname: '**', // Hati-hati dengan ini, lebih baik spesifik
      },
    ],
  },
};

export default nextConfig;