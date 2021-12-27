/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    mode: 'production',
    dest: 'public',
    register: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['proxy.piped.silkky.cloud'],
  },
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },
})
