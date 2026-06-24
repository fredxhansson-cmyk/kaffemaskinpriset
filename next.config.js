/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  images: { domains: ['axiom-engine-production-54c3.up.railway.app','m.media-amazon.com','images-eu.ssl-images-amazon.com','images-na.ssl-images-amazon.com'] },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https://axiom-engine-production-54c3.up.railway.app https://m.media-amazon.com https://images-eu.ssl-images-amazon.com https://images-na.ssl-images-amazon.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cloud.umami.is; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://cloud.umami.is; frame-ancestors 'none'" },
    ]}];
  },
}
module.exports = nextConfig
