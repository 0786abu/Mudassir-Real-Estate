// import Header from "@/layout/sidebarLayout/Header";
// import Pagination from "@/layout/Pagination";
// import GridLayout from "@/components/listing/elements/GridLayout";

import Header from "@/layout/sidebarLayout/Header";
import Pagination from "@/layout/Pagination";
import Projectbox from "./ProjectBox";

export default async function ListingSection({ searchParams }) {
  const safeParams = Object.fromEntries(
    Object.entries(searchParams || {}).filter(
      ([, value]) => typeof value === "string" || typeof value === "number"
    )
  );

  const query = new URLSearchParams(safeParams).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject?${query}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const { projects, totalPages, currentPage, totalProjects } = data;
  return (
    <>
      {/* ✅ Header gets data */}
      <Header
        title="Projects Listing"
        totalProperties={projects}
        from="projects"
      />

      {/* ✅ Grid */}
      <div className="property-wrapper-grid list-view">
        {projects?.length===0 ? (
          <div className="d-flex justify-content-center align-items-center" style={{height:"60vh"}}>
            <h2>No Projects Found</h2>
          </div>
        ) : projects?.map((project,index)=>{
            return <div className="column-sm zoom-gallery property-grid list-view" key={index}>
                <Projectbox data={project}/>
            </div>
        })}
      </div>

      {/* ✅ Pagination */}
      {totalProjects > 12 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          searchParams={safeParams}
        />
      )}
    </>
  );
}
