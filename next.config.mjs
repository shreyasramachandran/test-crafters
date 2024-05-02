/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/your-day",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
