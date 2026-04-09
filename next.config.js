/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "github-readme-stats.vercel.app" },
      { hostname: "github-readme-streak-stats.herokuapp.com" },
    ],
  },
};

module.exports = nextConfig;
