import { Suspense } from "react";
// import Filter from "@/layout/sidebarLayout/Filter";
import SkeletonPropertyCard from "@/components/elements/propertyBoxs/GridSkeleton";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import ListingSection from "./ListingSection";
import ProjectCTA from "@/components/property/Have_Project";
import ProjectFilter from "./Filter";
import SubBudget from "@/components/property/SubBudget";

const Page = ({ searchParams })=> {
  return (
    <>
    <ProjectFilter searchParams={searchParams}/>
     <section className="property-section">
      <Container>
        <Row>

          {/* ✅ Sidebar stays static */}
          <Sidebar side="right">
            <SubBudget />
          </Sidebar>

          {/* ✅ ONLY listing suspense */}
          <Col xl="9" lg="8" style={{minHeight:"100vh"}} className={`property-grid-2 property-grid-slider`}>
            <Suspense
              key={JSON.stringify(searchParams)}
              fallback={<SkeletonPropertyCard />}
            >
              <ListingSection searchParams={searchParams} />
            </Suspense>
          </Col>

        </Row>
      </Container>
    </section>
        <ProjectCTA />
    </>
  );
}
export default Page
