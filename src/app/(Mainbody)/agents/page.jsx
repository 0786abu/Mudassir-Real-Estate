import BodyContent from "@/components/pages/agency/agencyGrid";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import Exploration from "@/layout/sidebarLayout/Exploration";
import RecentlyAdded from "@/layout/sidebarLayout/RecentlyAdded";
import Featured from "@/layout/sidebarLayout/Featured";
import { Suspense } from "react";
import ContentLoader from "react-content-loader";

export const metadata = {
  title: "Real Estate Experts at PakEarth.com | Property Agents in Pakistan",
  description:
    "Find best Property Dealers/Agents in Pakistan. Get expert guidance on Buying, Selling or Renting property as Lahore, Karachi, Islamabad and other cities.",
  keywords: [
    "Real estate agents Pakistan",
    "Property experts Pakistan",
    "Buy property with agent",
    "Sell property with agent",
    "Property consultants Pakistan"
  ].join(", "),
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/agents` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Property Experts at PakEarth.com | Real Estate Agents in Pakistan",
    description: "Find verified real estate agents in Pakistan offering expert guidance for Buying, Selling and Renting property across major cities and others regions.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/agents`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/agents-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Real Estate Agents Pakistan",
      },
    ],
    type: "website",
  }
};



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
