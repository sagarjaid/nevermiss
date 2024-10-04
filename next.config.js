/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'images.unsplash.com',
      'logos-world.net',
    ],
  },
  webpack: (config) => {
    config.resolve.alias['/node_modules/@ffmpeg/core/dist/ffmpeg-core.js'] =
      '/node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js';
    config.resolve.alias['fs'] = false;
    return config;
  },
};

module.exports = nextConfig;
