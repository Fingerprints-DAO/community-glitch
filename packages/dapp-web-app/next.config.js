/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push("pino-pretty")
    return config
  },
  async rewrites() {
    return [
        {
          source: '/edition/metadata/:dir/:file',
          destination: '/edition/metadata/:dir/:file.json',
        },
        {
          source: '/mint-edition/metadata/:file',
          destination: '/mint-edition/metadata/:file.json',
        }
      ]
  }
}

module.exports = nextConfig
