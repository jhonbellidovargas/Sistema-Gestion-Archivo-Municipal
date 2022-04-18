// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['tailwindui.com', 'images.unsplash.com'],
//   },
// };
const withPWA = require('next-pwa');
module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    mode: 'production',
    disable: false,
  },
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'localhost:3000', 'placeimg.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
