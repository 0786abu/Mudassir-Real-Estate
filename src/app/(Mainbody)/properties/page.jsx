import { Suspense } from "react";
import Filter from "@/layout/sidebarLayout/Filter";
import SkeletonPropertyCard from "@/components/elements/propertyBoxs/GridSkeleton";
import ListingSection from "@/components/listing/gridView/ListingSection";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import { formatPK } from "@/utils/Formatter";

export async function generateMetadata({ searchParams }) {
  const city = searchParams?.city;
  const location = searchParams?.location;
  const type = searchParams?.type; // house | apartment | commercial
  const category = searchParams?.category; // sale | rent
  const minPrice = searchParams?.minPrice;
  const maxPrice = searchParams?.maxPrice;

  let title = "Explore Properties in Pakistan | Buy, Rent, or Sell Real Estate";
  let description =
    "Browse property listings in Pakistan. Find houses, apartments, commercial properties for sale or rent in major cities.";

  // 🔹 City
  if (city || type) {
    title = `${city ? `Properties in ${city}` : `${type} properties`} | Buy & Rent at Pak Earth`;
    description = `Explore houses, apartments, and commercial properties for sale or rent in ${city}.`;
  }

  // 🔹 City + Location
  if (city && location) {
    title = `Properties in ${location}, ${city} | Buy & Rent`;
    description = `Find properties for sale or rent in ${location}, ${city}. Updated listings with best prices.`;
  }

  // 🔹 Sale / Rent
  if (category && city) {
    title = `${category === "sale" ? "Buy" : "Rent"} Properties in ${city}`;
    description = `Browse ${category === "sale" ? "properties for sale" : "rental properties"} in ${city}. Verified real estate listings.`;
  }

  // 🔹 Type (House, Apartment, Commercial)
  if (type && city) {
    title = `${type.charAt(0).toUpperCase() + type.slice(1)} for ${category || "Sale"} in ${city}`;
    description = `Find ${type} for ${category || "sale"} in ${city}. Compare prices, locations, and features.`;
  }

  // 🔹 Pricing filter
  if (minPrice || maxPrice) {
    title = `Properties in Pakistan ${formatPK(minPrice) ? `from ${formatPK(minPrice)}` : ""} ${formatPK(maxPrice) ? `to ${formatPK(maxPrice)}` : ""}`;
    description = `Browse properties in Pakistan within your budget ${formatPK(minPrice) ? `starting from ${formatPK(minPrice)}` : ""} ${formatPK(maxPrice) ? `up to ${maxPrice}` : ""}.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/properties`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/properties`,
      siteName: "Pak Earth",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/properties-og-image.webp`,
          width: 1200,
          height: 630,
          alt: "Real Estate Listings in Pakistan",
        },
      ],
      type: "website",
    },
  };
}


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
