export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin',"/dashboard","/api"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pakearth.com"}/sitemap.xml`,
  };
}