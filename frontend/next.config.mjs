/**
* @type {import('next').NextConfig}
*/
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: './',
  basePath: '/react',
  assetPrefix: '/react',
  css: true,
  output: 'standalone'
};

export default nextConfig;