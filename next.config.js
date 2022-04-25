/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['starwars-visualguide.com'],
  },
  i18n: {
    locales: ['pt'],
    defaultLocale: 'pt',
  },
}

module.exports = nextConfig
