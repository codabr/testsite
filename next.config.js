/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.ctfassets.net"],
    unoptimized: true,
  },
  distDir: ".next",
};
module.exports = nextConfig;
