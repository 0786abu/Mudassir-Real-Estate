/**
 * It takes in a list of data and returns a list of components
 * @returns The return statement is used to return a value from a function.
 */
"use client"
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import Exploration from "@/layout/sidebarLayout/Exploration";
import RecentlyAdded from "@/layout/sidebarLayout/RecentlyAdded";
import Featured from "@/layout/sidebarLayout/Featured";
import PropertyBoxFour from "../../../elements/propertyBoxs/PropertyBoxFour";

const BodyContent = ({ agents}) => {

  return (
    <section className="agent-section property-section">
      <Container>
        <Row className="row ratio2_3">
          <Col xl="9" lg="8" className="property-grid-3 agent-grids">
            {/* <Header title={"Agency Listing"} /> */}
            <div className={`property-wrapper-grid`}>
              <div className={`property-2 row column-sm property-label property-grid  `}>
                {agents &&
                  agents.map((data, i) => (
                    <Col
                    xl="4"
                    md="6"
                      className={` wow fadeInUp grid-view `}
                      key={i}>
                      <PropertyBoxFour data={data} />
                    </Col>
                  ))}
              </div>
            </div>
          </Col>
          <Sidebar>
            <Exploration />
            <Featured />
            <RecentlyAdded />
          </Sidebar>
        </Row>
      </Container>
    </section>
  );
};

export default BodyContent;
