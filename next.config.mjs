import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.onlinegradecalculator.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.compresspdf.to',
      }
    ],
    domains: ['placehold.jp'],
  },
};

export default withNextIntl(nextConfig);
