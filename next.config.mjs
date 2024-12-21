/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/en/application-status',
            permanent: true,
          },
          {
            source: '/en',
            destination: '/en/application-status',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
