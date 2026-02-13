/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdfkit', 'fontkit', 'iconv-lite'],
  },
};

export default nextConfig;
