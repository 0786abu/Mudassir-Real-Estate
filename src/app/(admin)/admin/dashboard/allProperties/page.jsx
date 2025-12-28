"use client";
import Breadcrumb from "@/adminComponents/components/Common/Breadcrumb";
import Listview from "@/adminComponents/components/myproperties/PropertyList/Listview";
import ProfileLoader from "@/components/common/Loader";
import { AdminAllProperties } from "@/redux-toolkit/action/adminAction";
import { citiesLocationsData, propertyTypesData } from "@/utils/FiltersCities";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Input, Label, Row, Button } from "reactstrap";

const AllProperties = () => {
    const {allproperties,propertyloading,totalPages,totalProperties} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

 const [filters, setFilters] = useState({
  page: 1,
  beds: "",
  areaSize: "",
  category: "",
  type: "",
  minsquareSize: "",
  maxsquareSize: "",
  location: "",
  city: "",
  minPrice: "",
  maxPrice: "",
  isApproved: "",
  isPaid: "",
  isFree: "",
  isFeatured: "",
  furnished: "",
  baths:"",
  rooms:""
});
const getPages = () => {
    const maxVisible = 4;
    let start = Math.max(1, filters.page - 1); // sliding window
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
  setFilters(prev=>({...prev, page:page}))
}

const handleResetFilters = ()=>{
    setFilters({
  page: 1,
  beds: "",
  areaSize: "",
  category: "",
  type: "",
  minsquareSize: "",
  maxsquareSize: "",
  location: "",
  city: "",
  minPrice: "",
  maxPrice: "",
  isApproved: "",
  isPaid: "",
  isFree: "",
  isFeatured: "",
  furnished: "",
  baths:"",
  rooms:""
})
}

  

    useEffect(()=>{
        dispatch(AdminAllProperties(filters))
    },[dispatch,filters])
  return (
    <Fragment>
      {/* <Breadcrumb title='Property list' titleText='Welcome to admin panel' parent='My properties' /> */}
      <Container fluid={true}>
        <Row>
          <Col lg='12'>
            <div className='property-admin'>
              <div className='property-section section-sm'>
                <Row className='ratio_55 property-grid-2 property-map map-with-back'>
                  <Col className='col-12'>
                    <div className='filter-panel'>
                      <div className='listing-option'>
                        <h5 className='mb-0'>
                          Showing <span>{allproperties?.length}</span> Listings
                        </h5>
                        <div>
                          {/* <div className='d-flex'>
                            <span className='m-r-10'>Map view</span>
                            <Label className='switch'>
                              <Input type='checkbox' className='option-list' name='step_1' defaultValue='ani1' defaultChecked />
                              <span className='switch-state' />
                            </Label>
                            <span className='m-l-10'>List view</span>
                          </div> */}
                          <Button onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{background:hovered ? "#14a800" : "#108a00"}} onClick={toggleFilter}>
  <i className="fas fa-filter me-2"></i>
  Filters
</Button>


                        </div>
                      </div>
                          {/* Overlay */}
{isFilterOpen && <div className="filter-overlay" onClick={toggleFilter}></div>}

{/* Sidebar */}
<div className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>

  <div className="filter-header d-flex justify-content-between align-items-center">
    <h5 className="mb-0">Filters</h5>
    <Button close onClick={toggleFilter} />
  </div>

  <div className="filter-body">

    <Row className="g-3">

      
      <Col md="12">
        <Label>Category</Label>
        <Input
          type="select"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">select category</option>
          <option value="Sale">Sale</option>
          <option value="Rent">Rent</option>
        </Input>
      </Col>
      <Col md="6">
        <Label>Type</Label>
        <Input
          type="select"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">select type</option>
           {propertyTypesData.map((item) => (
              <optgroup key={item.mainType} label={item.mainType}>
                {item.types.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </optgroup>
            ))}
        </Input>
      </Col>

      <Col md="6">
        <Label>Area Size</Label>
        <Input
          type="select"
          value={filters.areaSize}
          onChange={(e) => setFilters({ ...filters, areaSize: e.target.value })}
        >
          <option value="">All</option>
          <option value="5 Marla">5 Marla</option>
          <option value="10 Marla">10 Marla</option>
          <option value="1 Kanal">1 Kanal</option>
        </Input>
      </Col>

<Col md="6">
        <Label>isApproved</Label>
        <Input
          type="select"
          value={filters.isApproved}
          onChange={(e) => setFilters({ ...filters, isApproved: e.target.value })}
        >
          <option value="">select status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </Input>
      </Col>
      <Col md="6">
        <Label>isPaid</Label>
        <Input
          type="select"
          value={filters.isPaid}
          onChange={(e) => setFilters({ ...filters, isPaid: e.target.value })}
        >
          <option value="">select value</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Input>
      </Col>
      <Col md="6">
        <Label>isFree</Label>
        <Input
          type="select"
          value={filters.isFree}
          onChange={(e) => setFilters({ ...filters, isFree: e.target.value })}
        >
          <option value="">select status</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Input>
      </Col>

      <Col md="6">
        <Label>City</Label>
        <Input
        type="select"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
            <option value={""}>select City</option>
            {citiesLocationsData.map((city,index)=>{
                return <option key={index} value={city.city}>{city.city}</option>
            })}
            </Input>
      </Col>
      <Col md="6">
        <Label>location</Label>
        <Input
        type="select"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
            <option value={""}>select Location</option>
            
  {citiesLocationsData.map((item) => (
    <optgroup key={item.city} label={item.city}>
      {item.subCities.map((sub) => (
        <option key={sub} value={sub}>
          {sub}
        </option>
      ))}
    </optgroup>
  ))}
            </Input>
      </Col>

      <Col md="6">
        <Label>Featured</Label>
        <Input
          type="select"
          value={filters.isFeatured}
          onChange={(e) => setFilters({ ...filters, isFeatured: e.target.value })}
        >
          <option value="">select value</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Input>
      </Col>

      <Col md="6">
        <Label>Min Price</Label>
        <Input
          type="number"
          value={filters.minPrice}
          placeholder="Enter minPrice"
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
      </Col>

      <Col md="6">
        <Label>Max Price</Label>
        <Input
          type="number"
          value={filters.maxPrice}
          placeholder="Enter minPrice"
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </Col>

      <Col md="6">
        <Label>Min sqft</Label>
        <Input
          type="number"
          value={filters.minsquareSize}
          placeholder="Enter min sqft"
          onChange={(e) => setFilters({ ...filters, minsquareSize: e.target.value })}
        />
      </Col>

      <Col md="6">
        <Label>Max sqft</Label>
        <Input
          type="number"
          value={filters.maxsquareSize}
          placeholder="Enter max sqft"
          onChange={(e) => setFilters({ ...filters, maxsquareSize: e.target.value })}
        />
      </Col>

      <Col md="6">
        <Label>Furnished</Label>
        <Input
          type="select"
          value={filters.furnished}
          onChange={(e) => setFilters({ ...filters, furnished: e.target.value })}
        >
          <option value="">select value</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Input>
      </Col>
      <Col md="6">
        <Label>Beds</Label>
        <Input
          type="number"
          value={filters.beds}
          placeholder="Enter num of beds"
          onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
        />
      </Col>
      <Col md="6">
        <Label>Baths</Label>
        <Input
          type="number"
          value={filters.baths}
          placeholder="Enter num of baths"
          onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
        />
      </Col>
      <Col md="6">
        <Label>rooms</Label>
        <Input
          type="number"
          value={filters.rooms}
          placeholder="Enter num of rooms"
          onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
        />
      </Col>

    </Row>
  </div>

  {/* Footer */}
  <div className="filter-footer">
    <Button color="primary" className="w-100 mb-2">
      Apply Filters
    </Button>

    <Button
      color="light"
      className="w-100"
      onClick={handleResetFilters}
    >
      Reset
    </Button>
  </div>

</div>

                    </div>
                  </Col>
                  {propertyloading ? <ProfileLoader/> : (
                    <Listview data={allproperties} from="admin"/>
                  )}
                  {totalProperties>12 && (
                     <nav className="theme-pagination">
      <ul className="pagination">
        <li className={`page-item ${filters.page === 1 ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(1)}>«</div>
        </li>
        <li className={`page-item ${filters.page === 1 ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(filters.page - 1)}>{"<"}</div>
        </li>

        {pages.map((p,index) => (
          <li key={index} className={`page-item `}>
            <button style={{background:p===filters.page ? "#108a00" : "",color:p===filters.page ? "white" : "black"}} disabled={p === filters.page || propertyloading} className="page-link" onClick={() => goToPage(p)}>{propertyloading && p===filters.page ? "...": p}</button>
          </li>
        ))}

        <li className={`page-item ${filters.page === totalPages ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(filters.page + 1)}>{">"}</div>
        </li>
        <li className={`page-item ${filters.page === totalPages ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(totalPages)}>»</div>
        </li>
      </ul>
    </nav>
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AllProperties;
