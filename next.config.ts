import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        events: false,
        net: false,
        tls: false,
        timers: false,
        url: false,
        querystring: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        constants: false,
        domain: false,
        punycode: false,
        string_decoder: false,
        sys: false,
        vm: false,
        child_process: false,
        cluster: false,
        dgram: false,
        dns: false,
        module: false,
        process: false,
        readline: false,
        repl: false,
        tty: false,
        v8: false,
        worker_threads: false,
      };
    }
    
    return config;
  },
  // Add environment variable handling
  env: {
    PRISMA_GENERATE_DATAPROXY: 'true',
  },
};

export default nextConfig;
