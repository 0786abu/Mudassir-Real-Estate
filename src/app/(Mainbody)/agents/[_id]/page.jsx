import FooterThree from "@/layout/footers/FooterThree";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import BodyContent from "@/components/agent/agentProfile";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const page = async({params,searchParams}) => {
    const param = await params;
    const {_id} = param;
    const searchparam = await searchParams;
    const newPage = searchparam?.page || 1
    const data = await fetch(`http://localhost:3000/api/agents/getAgents/${_id}?page=${newPage}`,{method:"GET"});
    const {agent,agentProperties,totalProperties,totalPages,page} = await data.json();
  return (
    <div>
      <Breadcrumb page={"agent"} agentName={agent?.name} />
      <BodyContent agent={agent} agentProperties={agentProperties} totalPages={totalPages} totalProperties={totalProperties} page={page} searchParams={searchParams} />
      <FooterThree />
    </div>
  );
};

export default page;
