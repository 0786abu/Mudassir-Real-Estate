import BodyContent from "@/components/pages/agency/agencyGrid";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";

const AgentGrid = async() => {
  const data = await fetch("http://localhost:3000/api/agents/getAgents",{
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
