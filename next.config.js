/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
  },
  reactStrictMode: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_PROXY_HOSTNAME}`],
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
