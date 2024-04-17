/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.losremes.com"
      }
    ]
  }
};

module.exports = nextConfig;
