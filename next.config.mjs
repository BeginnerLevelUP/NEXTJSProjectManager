/** @type {import('next').NextConfig} */
// next.config.mjs
import withVideos from 'next-videos';

const nextConfig = {
    // Your Next.js configuration options here
    images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default withVideos(nextConfig);
