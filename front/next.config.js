/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    URL_FRONT: 'http://localhost:3000',
    URL_USER_MS: 'http://microservice-users:3003',
    URL_ORDER_MS: 'http://microservice-orders:3333'
  },
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
};

module.exports = nextConfig;
