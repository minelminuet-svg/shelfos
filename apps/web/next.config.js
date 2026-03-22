/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@shelfos/ui', '@shelfos/types'],
  pageExtensions: ['tsx', 'ts'],
};

module.exports = nextConfig;
