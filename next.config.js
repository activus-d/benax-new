/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}


module.exports = {

  // env: {
  //   API_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  //   IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
  // },
  // publicRuntimeConfig: {
  //   API_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  //   IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
  // },

  // images: {
  //   deviceSizes: [640, 768, 1024, 1280, 1600],
  //   imageSizes: [16, 32, 48, 64, 96],
  //   domains: [process.env.IMAGES_DOMAIN],
  //   path: '/_next/images',
  //   loader: 'default'
  // },
  nextConfig
}
