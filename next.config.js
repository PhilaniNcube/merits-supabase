/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: [
      "zifwfkzfmcnpoglxqhqr.supabase.co",
      "kdibrdtmltlbngiqmrgf.supabase.co",
    ],
  },
};

module.exports = nextConfig;
