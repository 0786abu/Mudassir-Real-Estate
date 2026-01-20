import { Suspense } from "react";
import Filter from "@/layout/sidebarLayout/Filter";
import SkeletonPropertyCard from "@/components/elements/propertyBoxs/GridSkeleton";
import ListingSection from "@/components/listing/gridView/ListingSection";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";

export const metadata = {
  title: "Explore Properties in Pakistan | Real Estate Listings – Buy, Rent, or Sell",
  description:
    "Find your dream home or property in Pakistan with our comprehensive listings. Browse residential, commercial, and rental properties across major cities like Karachi, Lahore, Islamabad, and more. Filter by price, type, or location to discover the perfect property.",
  keywords: [
    "Real estate Pakistan",
    "Properties for sale Pakistan",
    "Properties for rent Pakistan",
    "Karachi real estate",
    "Lahore property listings",
    "Islamabad homes for sale",
    "Pakistan property portal",
    "Buy property Pakistan",
    "Rent property Pakistan",
    "Property filter Pakistan",
  ].join(", "),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/properties`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Explore Properties in Pakistan | Real Estate Portal",
    description:
      "Browse Pakistan's top real estate listings – from homes, apartments, and commercial properties to rentals. Use our filters to find properties in Karachi, Lahore, Islamabad, and other major cities.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/properties`,
    siteName: "Pak Earth", // Change to your actual site name
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/properties-og-image.webp`, 
        width: 1200,
        height: 630,
        alt: "Real Estate Listings in Pakistan",
      },
    ],
    type: "website",
  }
};


const Page = ({ searchParams })=> {
  return (
    <section className="property-section">
      <Container>
        <Row>

          {/* ✅ Sidebar stays static */}
          <Sidebar side="right">
            <Filter />
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
