
import Header from "@/layout/sidebarLayout/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AdminFetchProjects } from "@/redux-toolkit/action/projectAction";
import Projectbox from "@/app/(Mainbody)/projects/ProjectBox";
import ProfileLoader from "@/components/common/Loader";
import { Button, Col, Input, Row } from "reactstrap";
import { propertyTypesData } from "@/utils/FiltersCities";

const ListingSection = ()=> {
    const {projects,projectloading,totalPages,totalProjects} = useSelector((state)=>state.Project)
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState("");
    const [featured, setFeatured] = useState("");
    const [sponsored, setSponsored] = useState("");

    useEffect(()=>{
        dispatch(AdminFetchProjects(currentPage,featured,sponsored,type))
    },[dispatch,currentPage,featured,sponsored,type])
    const getPages = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage- 1); // sliding window
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if less than maxVisible pages at end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

   
const goToPage = (page)=>{
  setCurrentPage(page)
}

const clearFilter = ()=>{
  setType("");
  setFeatured("");
  setSponsored("");
  setCurrentPage(1);
}

  return (
    <>
      {/* ✅ Header gets data */}
      <Header
        title="Projects Listing"
        totalProperties={projects?.length}
      />
      <Row className="mb-4">
        <Col lg="3" md="4" sm="6" className="my-2">
          <Input
          type="select"
          value={featured}
          onChange={(e)=>setFeatured(e.target.value)}
          className="form-control"
          >
            <option value="">Select Featured</option>
            <option value="true">Yes</option>
            <option value="false">No</option>            
          </Input>
        </Col>
        <Col lg="3" md="4" sm="6" className="my-2">
          <Input
          type="select"
          value={sponsored}
          onChange={(e)=>setSponsored(e.target.value)}
          className="form-control"
          >
            <option value="">Select Sponsored</option>
            <option value="true">Yes</option>
            <option value="false">No</option>            
          </Input>
        </Col>
        <Col lg="3" md="4" sm="6" className="my-2">
          <Input
          type="select"
          value={type}
          onChange={(e)=>setType(e.target.value)}
          className="form-control"
          >
            <option value="">Select Type</option>
            {propertyTypesData.map((item,index) => (
    <optgroup key={index} label={item.mainType}>
      {item.types.map((sub,index) => (
        <option key={index} value={sub}>
          {sub}
        </option>
      ))}
    </optgroup>
  ))}
          </Input>
        </Col>
        <Col lg="3" md="4" sm="6" className="my-2">
          <Button onClick={clearFilter} style={{width:"100%"}}>Clear filter</Button>
        </Col>
      </Row>

      {/* ✅ Grid */}
      {projectloading ? (<ProfileLoader/>) : projects?.length===0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{heigth:"40vh"}}>
          <h2>No Project Found</h2>
        </div>
      ) : (
        <div className="property-wrapper-grid list-view">
        {projects?.map((project,index)=>{
            return <div className="column-sm zoom-gallery property-grid list-view" key={index}>
                <Projectbox data={project} from="admin"/>
            </div>
        })}
      </div>
      )}

      {totalProjects>12 && (
                     <nav className="theme-pagination">
      <ul className="pagination">
        <li className={`page-item ${currentPage=== 1 ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(1)}>«</div>
        </li>
        <li className={`page-item ${currentPage=== 1 ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(currentPage- 1)}>{"<"}</div>
        </li>

        {pages.map((p,index) => (
          <li key={index} className={`page-item `}>
            <button style={{background:"transparent",border:"none"}} disabled={p === currentPage|| projectloading} className={`page-item ${p === currentPage? "active" : ""}`} onClick={() => goToPage(p)}>
               <div className="page-link">{projectloading && p===currentPage? "...": p}</div>
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage=== totalPages ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(currentPage+ 1)}>{">"}</div>
        </li>
        <li className={`page-item ${currentPage=== totalPages ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(totalPages)}>»</div>
        </li>
      </ul>
    </nav>
                   )} 
    </>
  );
}
export default ListingSection