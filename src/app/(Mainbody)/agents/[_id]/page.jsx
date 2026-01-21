import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import BodyContent from "@/components/agent/agentProfile";

export async function generateMetadata({ params }) {
  const { _id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/agents/${_id}`,
    { cache: "no-cache" }
  );

  const data = await res.json();
  const agent = data?.agent;

  const agentName = agent?.name || "Real Estate Agent";
  const agencyName = agent?.agencyName || "Pak Earth";
  const city = agent?.city;

  // 👉 Name + City SEO (only if city exists)
  const nameWithCity = city
    ? `${agentName} in ${city}`
    : agentName;

  const title = agent
    ? `${nameWithCity} | Real Estate Agent at Pak Earth`
    : `Real Estate Agent | Pak Earth`;

  const description = agent
    ? agent?.bio
      ? `Meet ${nameWithCity}, a professional real estate agent at ${agencyName}. ${agent.bio} Explore trusted property buying, selling, and rental services.`
      : `Meet ${nameWithCity}, a trusted real estate agent at ${agencyName}. Specializing in buying, selling, and renting properties with expert market knowledge.`
    : `Connect with professional real estate agents at Pak Earth offering trusted property services across Pakistan.`;

  const ogImage =
    agent?.agencyProfile?.url;

  return {
    title,
    description,
    keywords: agent
      ? [
          agentName,
          city && `${agentName} ${city}`,
          "real estate agent",
          "property dealer",
          agencyName,
          city,
          "buy property",
          "sell property",
          "rent property",
          "real estate services Pakistan",
        ].filter(Boolean) // 🚀 removes null/undefined
      : [
          "real estate agent Pakistan",
          "property dealer",
          "Pak Earth",
        ],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/agents/${_id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/agents/${_id}`,
      siteName: "Pak Earth",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: nameWithCity,
        },
      ],
      type: "profile",
    },
  };
}


const page = async({params,searchParams}) => {
    const param = await params;
    const {_id} = param;
    const searchparam = await searchParams;
    const newPage = searchparam?.page || 1
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agents/getAgents/${_id}?page=${newPage}`,{method:"GET"});
    const {agent,agentProperties,totalProperties,totalPages,page} = await data.json();
  return (
    <div>
      <Breadcrumb page={"agent"} agentName={agent?.name} />
      <BodyContent agent={agent} agentProperties={agentProperties} totalPages={totalPages} totalProperties={totalProperties} page={page} searchParams={searchParams} />
    </div>
  );
};

export default page;
