/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
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
