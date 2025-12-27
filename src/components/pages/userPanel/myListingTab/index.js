import React, { useEffect, useState } from "react";
import GridView from "../../../listing/gridView/grid/GridView";
import { useDispatch, useSelector } from "react-redux";
import { MyProperties } from "@/redux-toolkit/action/propertyAction";
import ProfileLoader from "@/components/common/Loader";
import { Button, Col, Row } from "reactstrap";
import { citiesLocationsData, propertyTypesData } from "@/utils/FiltersCities";
import { setPagesContent } from "@/redux-toolkit/slice/propertySlice";

const MyListingTab = ({setActiveTab,from}) => {
  const {myProperties,mypropertyloading,totalPages,currentPage} = useSelector((state)=>state.Property);
  
    // Generate pages array
    const getPages = () => {
      const maxVisible = 4;
      let start = Math.max(1, currentPage - 1); // sliding window
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
    const handleChangePage = (page) => {
  if (page < 1 || page > totalPages) return;
  dispatch(setPagesContent({ currentPage: page }));
};
const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const clearFilter = ()=>{
    setCategory("");
    setType("");
    setLocation("");
    setCity("");
    dispatch(setPagesContent({currentPage:1}))
  }
  
  useEffect(()=>{
    dispatch(MyProperties({currentPage,category,type,location,city}));
  },[dispatch,currentPage,category,type,location,city])
  return (
    <div className='dashboard-content'>
      
        <div className='tab-listing' id='listing'>
          <div className="mb-2">
            <div className="mb-3">
        {/* <label className="form-label">Property Status</label> */}
        <Row xs={"2"} sm={"3"} lg={"4"} className="">
          <Col className="mt-2">
          <select
          className=""
          style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
          onChange={(e)=>setCategory(e.target.value)}
          value={category}
        >
          <option value="">Property category</option>
          <option value="Sale">For Sale</option>
          <option value="Rent">For Rent</option>
        </select>
        </Col>
          <Col className="mt-2">
          <select
                    style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
                    value={type}
                    onChange={(e)=>setType(e.target.value)}
                  >
                    <option value="">Property Type</option>
                   {propertyTypesData.map((item) => (
              <optgroup key={item.mainType} label={item.mainType}>
                {item.types.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </optgroup>
            ))}
                  </select>
        </Col>
          <Col className="mt-2">
          <select
                    className=""
                    style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    {citiesLocationsData.map((filt,index)=>{
                      return <option value={filt.city} key={index}>{filt.city}</option>
                    })}
                  </select>
        </Col>
          <Col className="mt-2">
         <select
  style={{
    outline: "none",
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "0.5px solid #ced4da"
  }}
  onChange={(e)=>setLocation(e.target.value)}
  value={location}
>
  <option value="">Select Location</option>

  {citiesLocationsData.map((item) => (
    <optgroup key={item.city} label={item.city}>
      {item.subCities.map((sub) => (
        <option key={sub} value={sub}>
          {sub}
        </option>
      ))}
    </optgroup>
  ))}
</select>
        </Col>
        <Col className="mt-2"><Button onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} onClick={clearFilter} className="btn" style={{background:isHover ? "#14a800" : "#108A00"}}>Clear Filter</Button></Col>
        </Row>
      </div>
          </div>
          {mypropertyloading ? (
        <ProfileLoader/>
      ) : (
        <div>
          <div className='property-section'>
          <div className='property-grid-2 ratio_63'>
          {/* askjdhkashdkjasd */}
            <GridView properties={myProperties} from={from} propertyloading={mypropertyloading} setActiveTab={setActiveTab} fromPanel="user-panel" />
          </div>
        </div>
        </div>
        )}
      </div>
         <nav className="theme-pagination">
      <ul className="pagination">
        <button disabled={mypropertyloading || currentPage === 1} style={{background:"transparent",border:"none"}} onClick={()=>handleChangePage(1)} className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div className="page-link">«</div>
        </button>
        <button disabled={mypropertyloading || currentPage === 1} style={{background:"transparent",border:"none"}} onClick={()=>handleChangePage(currentPage-1)} className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div className="page-link">{"<"}</div>
        </button>

        {pages.map((p,index) => (
          <button disabled={currentPage===p || mypropertyloading} style={{background:"transparent",border:"none"}} onClick={()=>handleChangePage(p)} key={index} className={`page-item ${p === currentPage ? "active" : ""}`}>
            <div className="page-link">{mypropertyloading && p===currentPage ? "...": p}</div>
          </button>
        ))}

        <button disabled={currentPage === totalPages || totalPages===0} style={{background:"transparent",border:"none"}} onClick={()=>handleChangePage(currentPage+1)} className={`page-item ${currentPage === totalPages || totalPages===0 ? "disabled" : ""}`}>
          <div className="page-link">{">"}</div>
        </button>
        <button disabled={currentPage === totalPages || totalPages===0} style={{background:"transparent",border:"none"}} onClick={()=>handleChangePage(totalPages)} className={`page-item ${currentPage === totalPages || totalPages===0 ? "disabled" : ""}`}>
          <div className="page-link">»</div>
        </button>
      </ul>
    </nav>
      
    </div>
  );
};

export default MyListingTab;
