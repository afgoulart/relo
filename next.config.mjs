/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {

    }
  },
  images: {
    remotePatterns: [
      { hostname: 'dummyimage.com' },
      { hostname: 's3.amazonaws.com' },
      { hostname: 'sports-cdn.rmdevops.com' },
    ],
  },

};

export default nextConfig;
