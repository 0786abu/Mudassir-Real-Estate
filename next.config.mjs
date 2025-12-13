
const nextConfig  = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_URL: "http://localhost:3000/api",
  },
  eslint: {
  ignoreDuringBuilds: true,
},
  reactStrictMode: false,
};

export default nextConfig;
