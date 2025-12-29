import BodyContent from "@/components/pages/agency/agencyGrid";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import Exploration from "@/layout/sidebarLayout/Exploration";
import RecentlyAdded from "@/layout/sidebarLayout/RecentlyAdded";
import Featured from "@/layout/sidebarLayout/Featured";
import { Suspense } from "react";
import ContentLoader from "react-content-loader";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const AgentGrid = ({searchParams}) => {
  
  return (
    <div>
      <Container>
      <Row>
      <Suspense key={JSON.stringify(searchParams)} fallback={
        <Col xl="9" lg="8" className="property-grid-3 agent-grids" style={{minHeight: "500px",marginTop:"4.8rem"}}>
        
                <Row className="">
                {Array.from({ length: 6 }).map((_, index) => (
    <Col lg="4"  md="6" key={index} style={{marginBottom:"10px"}}>
      <ContentLoader className="skeleton-svg">
        <rect className="skeleton-img" />
        <rect className="skeleton-c1" />
        <rect className="skeleton-c2" />
        <rect className="skeleton-c3" />
      </ContentLoader>
    </Col>
  ))}
                </Row>
      </Col>
      }>
      <BodyContent baseURL={baseURL} searchParams={searchParams}/>
      </Suspense>
      <Sidebar top={"80px"}>
            <Exploration />
            <Featured />
            <RecentlyAdded />
          </Sidebar>
      </Row>
      </Container>
      
    </div>
  );
};

export default AgentGrid;
