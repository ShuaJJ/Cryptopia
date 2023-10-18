/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.ipfs.w3s.link',
              port: '',
              pathname: '/**',
            },
            
        ],
    },
}

module.exports = nextConfig
