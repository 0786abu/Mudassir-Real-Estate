// import Header from "@/layout/sidebarLayout/Header";
// import Pagination from "@/layout/Pagination";
// import GridLayout from "@/components/listing/elements/GridLayout";

import Header from "@/layout/sidebarLayout/Header";
import GridLayout from "../elements/GridLayout";
import Pagination from "@/layout/Pagination";

export default async function ListingSection({ searchParams }) {
  const safeParams = Object.fromEntries(
    Object.entries(searchParams || {}).filter(
      ([, value]) => typeof value === "string" || typeof value === "number"
    )
  );

  const query = new URLSearchParams(safeParams).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property?${query}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const { properties, totalPages, currentPage, totalProperties } = data;

  return (
    <>
      {/* ✅ Header gets data */}
      <Header
        title="Properties Listing"
        totalProperties={totalProperties}
      />

      {/* ✅ Grid */}
      <div className="property-wrapper-grid list-view">
        <GridLayout properties={properties} />
      </div>

      {/* ✅ Pagination */}
      {totalProperties > 4 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          searchParams={safeParams}
        />
      )}
    </>
  );
}
