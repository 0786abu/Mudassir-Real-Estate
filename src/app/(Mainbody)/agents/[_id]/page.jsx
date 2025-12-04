import FooterThree from "@/layout/footers/FooterThree";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import BodyContent from "@/components/agent/agentProfile";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const page = async({params}) => {
    const {_id} = await params
    const data = await fetch(`${baseURL}/api/agents/getAgents/${_id}`,{method:"GET"});
    const {agent} = await data.json();
  return (
    <div>
      <Breadcrumb page={"agent"} agentName={agent?.name} />
      <BodyContent agent={agent}/>
      <FooterThree />
    </div>
  );
};

export default page;
