import { Suspense } from "react";
// import Filter from "@/layout/sidebarLayout/Filter";
import SkeletonPropertyCard from "@/components/elements/propertyBoxs/GridSkeleton";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import ListingSection from "./ListingSection";

const Page = ({ searchParams })=> {
  return (
    <section className="property-section">
      <Container>
        <Row>

          {/* ✅ Sidebar stays static */}
          <Sidebar side="right">
            Filter
          </Sidebar>

          {/* ✅ ONLY listing suspense */}
          <Col xl="9" lg="8" className={`property-grid-2 property-grid-slider`}>
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
  );
}
export default Page
