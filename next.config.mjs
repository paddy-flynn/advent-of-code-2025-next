/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/stats/js/script.js",
        destination: "https://plausible.io/js/script.outbound-links.js",
      },
      {
        source: "/stats/api/event",
        destination: "https://plausible.io/api/event",
      },
    ];
  },
};

export default nextConfig;
