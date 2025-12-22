/**
 * It takes in a list of data and returns a list of components
 * @returns The return statement is used to return a value from a function.
 */
import { Col } from "reactstrap";

import Pagination from "@/layout/Pagination";
import AgentContent from "./ShortHeader";

const BodyContent = async({baseURL,searchParams}) => {
  const newpage = searchParams?.page || 1;
  const query = new URLSearchParams({ page:newpage }).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agents/getAgents?${query}`,{
    method:"GET"
  });
  const data = await res.json();
  const {agents, totalPages, page} = data;
  return (
    <Col xl="9" lg="8" className="property-grid-3 agent-grids">
      
    <section className="agent-section property-section">
            {/* <Header title={"Agency Listing"} /> */}
            <AgentContent agents={agents}/>
    <div>
      <Pagination totalPages={totalPages} currentPage={page} searchParams={searchParams} from={"agents"}/>
    </div>
    </section>
          </Col>
  );
};

export default BodyContent;
