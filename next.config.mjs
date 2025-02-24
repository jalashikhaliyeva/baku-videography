/** @type {import('next').NextConfig} */
const nextConfig = {
 
  reactStrictMode: true,
  images: {
    domains: ["video.markup.az"], 
  },
  i18n: {
    locales: ['az', 'en', 'ru'], 
    defaultLocale: 'az', 
    localeDetection: false, 
    // localeDetection: true, // Detect user's language automatically
  },
};

export default nextConfig;
