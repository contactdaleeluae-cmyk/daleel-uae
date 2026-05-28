/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'your-project.supabase.co',
      'via.placeholder.com',
      'placehold.co',
    ],
  },
}

module.exports = nextConfig
