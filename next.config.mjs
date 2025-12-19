
const nextConfig  = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  },
  eslint: {
  ignoreDuringBuilds: true,
},
  reactStrictMode: false,
};

export default nextConfig;
