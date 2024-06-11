/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
          {
            source: "/",
            destination: "/landing-page",
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
