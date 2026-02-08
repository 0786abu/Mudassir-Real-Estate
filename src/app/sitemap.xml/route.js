export const runtime = "edge";

function formatDate(dateString) {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pakearth.com";

  const [properties, projects, agents] = await Promise.all([
    fetch(`${baseUrl}/api/property/create-property`).then(res => res.json()).then(data => data.properties || []),
    fetch(`${baseUrl}/api/admin/createProject`).then(res => res.json()).then(data => data.projects || []),
    fetch(`${baseUrl}/api/agents/getAgents`).then(res => res.json()).then(data => data.agents || []),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/pricing",
    "/privacy-policy",
    "/terms-&-conditions",
    "/our-features",
    "/hot-properties",
    "/properties",
    "/projects",
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticRoutes.forEach(route => {
    xml += `  <url><loc>${escapeXml(baseUrl + route)}</loc><lastmod>${new Date().toISOString()}</lastmod></url>\n`;
  });

  properties.forEach(p => {
    xml += `  <url><loc>${escapeXml(baseUrl + "/property/" + p.slug)}</loc><lastmod>${formatDate(p.updatedAt)}</lastmod></url>\n`;
  });

  projects.forEach(p => {
    xml += `  <url><loc>${escapeXml(baseUrl + "/projects/" + p.city + "/" + p.slug)}</loc><lastmod>${formatDate(p.updatedAt)}</lastmod></url>\n`;
  });

  agents.forEach(a => {
    xml += `  <url><loc>${escapeXml(baseUrl + "/agents/" + a._id)}</loc><lastmod>${formatDate(a.updatedAt)}</lastmod></url>\n`;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
