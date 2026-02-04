import { Suspense } from "react";
// import Filter from "@/layout/sidebarLayout/Filter";
import SkeletonPropertyCard from "@/components/elements/propertyBoxs/GridSkeleton";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import ListingSection from "./ListingSection";
import ProjectCTA from "@/components/property/Have_Project";
import ProjectFilter from "./Filter";
import SubBudget from "@/components/property/SubBudget";


export const metadata = {
  title: " Real Estate Projects in Pakistan - Residential & Commercial",
  description:
    " Find Best Property projects in Karachi, Lahore, Islamabad and other cities, featuring residential and commercial developments with full project details.",
  keywords: [
    "Real estate projects Pakistan",
    "Residential buildings Pakistan",
    "Commercial property development",
    "Housing societies Karachi Lahore Islamabad",
    "New real estate developments",
    "Apartments for sale Pakistan",
    "Investment property Pakistan",
    "Luxury homes Pakistan",
    "Property development projects",
    "Pakistan real estate listings"
  ].join(", "),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Real Estate Projects in Pakistan - Residential & Commercial",
    description:
      "Browse top real estate developments in Pakistan. View residential apartments, housing societies and commercial projects with detailed amenities, locations and investment options.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    siteName: "Pak Earth", // Change to your actual company/site name
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/about.webp`, 
        width: 1200,
        height: 630,
        alt: "Real Estate Projects in Pakistan",
      },
    ],
    type: "website",
  }
};



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
