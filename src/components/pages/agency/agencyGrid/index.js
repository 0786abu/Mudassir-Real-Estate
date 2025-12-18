/**
 * It takes in a list of data and returns a list of components
 * @returns The return statement is used to return a value from a function.
 */
import { Col } from "reactstrap";

import PropertyBoxFour from "../../../elements/propertyBoxs/PropertyBoxFour";
import Pagination from "@/layout/Pagination";

const BodyContent = async({baseURL,searchParams}) => {
  const newpage = searchParams?.page || 1;
  const query = new URLSearchParams({ page:newpage }).toString();
  const res = await fetch(`${baseURL}/api/agents/getAgents?${query}`,{
    method:"GET"
  });
  const data = await res.json();
  const {agents, totalPages, page} = data;
  return (
    <Col xl="9" lg="8" className="property-grid-3 agent-grids">
    <section className="agent-section property-section">
            {/* <Header title={"Agency Listing"} /> */}
            <div className={`property-wrapper-grid`}>
              <div className={`property-2 row column-sm property-label property-grid  `}>
                {agents &&
                  agents.map((data, i) => (
                    <Col
                    xl="4"
                    sm="6"
                      className={` wow fadeInUp grid-view `}
                      key={i}>
                      <PropertyBoxFour data={data} />
                    </Col>
                  ))}
              </div>
            </div>
    <div>
      <Pagination totalPages={totalPages} currentPage={page} searchParams={searchParams} from={"agents"}/>
    </div>
    </section>
          </Col>
  );
};

export default BodyContent;
