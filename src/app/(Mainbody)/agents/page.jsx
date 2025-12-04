import BodyContent from "@/components/pages/agency/agencyGrid";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const AgentGrid = async() => {
  const data = await fetch(`${baseURL}/api/agents/getAgents`,{
    method:"GET"
  });
  const {agents} = await data.json();
  return (
    <div>
      <Breadcrumb />
      <BodyContent agents={agents}/>
      <FooterThree />
    </div>
  );
};

export default AgentGrid;
