"use client"
import { setSelectedFilterCategory } from "@/redux-toolkit/slice/propertySlice";
import { areaSizes, bedsFilterData, citiesLocationsData, FLATTENED_BUDGET_FILTERS, popuarCities, propertyTypesData, RentedpropertyTypesData, SalepropertyTypesData } from "@/utils/FiltersCities";
import { formatPK } from "@/utils/Formatter";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";
import { useDispatch } from "react-redux";
import { Button, Container, Input } from "reactstrap";

const HomeBannerSection = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const [subCities, setSubCities] = useState([]);


  const [filterValues, setFilterValues] = useState({
    category:"Sale",
    type: "",
    city: "",
    location:"",
    areaSize: "",
    beds: "",
    developer:""
  });
  const [isSubCity, setIsSubCity] = useState(null);

  const handleSearch = () => {
  const query = new URLSearchParams();
  if(filterValues.category) query.set("category", filterValues.category);
  if (filterValues.type) query.set("type", filterValues.type);
  if (filterValues.city) query.set("city", filterValues.city);
  if (filterValues.areaSize) query.set("areaSize", filterValues.areaSize);
  if (filterValues.beds) query.set("beds", filterValues.beds);
   if (priceRange[0]>0) query.set("minPrice", priceRange[0]);
  if (priceRange[1]) query.set("maxPrice", priceRange[1]);
  if (filterValues.developer) query.set("developer", filterValues.developer);

    router.push(`/properties?${query.toString()}`)
};
const MIN = 0;
const MAX = 1000000000;
const [showBudget, setShowBudget] = useState(false);
const [priceRange, setPriceRange] = useState([ MIN,MAX]);
useEffect(()=>{
  dispatch(setSelectedFilterCategory(filterValues.category))
},[filterValues.category])
useEffect(()=>{
    if(filterValues.city){
      const cityData = citiesLocationsData.find(item=>item.city === filterValues.city);
      if(cityData && cityData.subCities && cityData.subCities.length > 0){
        setSubCities(cityData.subCities);
        setIsSubCity(null);
      }else{
        setIsSubCity("noSubCity");
        setSubCities([]);
      }
    }
  },[filterValues.city])


  return (
    <section
    style={{
    backgroundImage: "url('/assets/images/8.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    paddingTop:"50px",
    paddingBottom:"150px",
    position:"relative"
  }}
    className="home-banner ">

      <Container style={{marginBottom:"40px"}}>

        {/* ------- HERO TITLE (AUTO-STYLING KE LIYE AS-IT-IS) ------- */}
        <div className="text-center mb-4 ">
          <h2 className="fw-bold">
            Search the best properties for {filterValues.category==="Sale" ? "Sale" : filterValues.category==="Rent" ? "Rent" : "Project"} in Pakistan
          </h2>
        </div>

        {/* ---------------- FILTER BOX UI ---------------- */}
        <div
          className="custom-filter-box p-3 shadow-lg rounded"
          style={{ background: "#fff", marginTop: "25px" }}
        >

          {/* -------- BUY / RENT TOGGLE -------- */}
          <div className="d-flex justify-content-center mb-3">
            <div className="btn-group">
             <button
  onMouseEnter={() => setHovered("Sale")}
  onMouseLeave={() => setHovered(null)}
  style={{
    background:
      filterValues.category === "Sale"
        ? hovered === "Sale"
          ? "#108a00"
          : "#14a800"
        : "#F8F9FA",
    color: filterValues.category === "Sale" ? "white" : "black",
    transition: "background 0.3s ease-in-out"
  }}
  className="btn d-flex align-items-center"
  onClick={() =>
    setFilterValues({ ...filterValues, category: "Sale" })
  }
>
  <span style={{marginRight:"6px"}} className={`check-icon ${filterValues.category==="Sale" ? "checked" : "unchecked"}`}>
          {filterValues.category==="Sale" ? "✔" : ""}
        </span>
  Sale
</button>

<button
  onMouseEnter={() => setHovered("Rent")}
  onMouseLeave={() => setHovered(null)}
  style={{
    background:
      filterValues.category === "Rent"
        ? hovered === "Rent"
          ? "#108a00"
          : "#14a800"
        : "#F8F9FA",
    color: filterValues.category === "Rent" ? "white" : "black",
    transition: "background 0.3s ease-in-out",
  }}
  className="btn d-flex align-items-center"
  onClick={() =>
    setFilterValues({ ...filterValues, category: "Rent" })
  }
>
   <span style={{marginRight:"6px"}} className={`check-icon ${filterValues.category==="Rent" ? "checked" : "unchecked"}`}>
          {filterValues.category==="Rent" ? "✔" : ""}
        </span>
  Rent
</button>
<Link href={"/projects"}>
  <button
  onMouseEnter={() => setHovered("Project")}
  onMouseLeave={() => setHovered(null)}
  style={{
    background:
      filterValues.category === "Project"
        ? hovered === "Project"
          ? "#108a00"
          : "#14a800"
        : "#F8F9FA",
    color: filterValues.category === "Project" ? "white" : "black",
    transition: "background 0.3s ease-in-out",
  }}
  className="btn d-flex align-items-center"
  onClick={() => setFilterValues({ ...filterValues, category: "Project" })}
>
   <span style={{marginRight:"6px"}} className={`check-icon ${filterValues.category==="Project" ? "checked" : "unchecked"}`}>
          {filterValues.category==="Project" ? "✔" : ""}
        </span>
  Project
</button>
</Link>

            </div>
          </div>

          {/* -------- MAIN FILTER BAR -------- */}
          <div className="row gx-2 gy-2 align-items-center">

            {/* Property Type */}
            <div className="col-lg-2 col-md-3 col-6">
              <div className="border rounded p-2 d-flex align-items-center">
                <i className="fas fa-home me-2 text-primary"></i>
                <select
                  className="form-select border-0"
                  value={filterValues.type}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="">{filterValues.category==="Project" ? "Project type" : "Property Type"}</option>
                   {filterValues.category==="Sale" ? SalepropertyTypesData.map((item) => (
                      <optgroup key={item.mainType} label={item.mainType}>
                        {item.types.map((sub,index) => (
                          <option key={index} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </optgroup>
                    )) : RentedpropertyTypesData.map((item) => (
                      <optgroup key={item.mainType} label={item.mainType}>
                        {item.types.map((sub,index) => (
                          <option key={index} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="col-lg-2 col-md-3 col-6">
              <div className="border rounded p-2 d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                <select
                          className="form-select border-0"
                          value={filterValues.city}
                          onChange={(e) => setFilterValues({...filterValues, city:e.target.value })}
                        >
                          <option value="">Popular cities</option>
                          {popuarCities.map((filt,index)=>{
                            return <option value={filt} key={index}>{filt}</option>
                          })}
                        </select>
                
              </div>
            </div>

            <div className="col-lg-2 col-md-3 col-6">
              <div className="border rounded p-2 d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                {isSubCity !== "noSubCity" ? (
                  <select
                          className="form-select border-0"
                          value={filterValues.location}
                          onChange={(e) => setFilterValues({...filterValues, location:e.target.value })}
                        >
                          <option value="">Popular locations</option>
                          {subCities.length===0 && <option value="" disabled>Select city first</option>}
                          {subCities?.map((filt,index)=>{
                            return <option value={filt} key={index}>{filt}</option>
                          })}
                        </select>
                ) : (
                  <Input
                                type="text"
                                placeholder="Enter location"
                                value={filterValues.location}
                              onChange={(e)=>setFilterValues({...filterValues, location:e.target.value})}
                              />
                )}
              </div>
            </div>

            {/* Area */}
             <div className="col-lg-2 col-md-3 col-6">
              <div className="border rounded p-2">
                <select
                  className="form-select border-0"
                  value={filterValues.areaSize}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      areaSize: e.target.value,
                    })
                  }
                >
                  <option>Select Area Size</option>
                  {areaSizes.map((filt,index)=>{
                            return <option value={filt} key={index}>{filt}</option>
                          })}
                </select>
              </div>
            </div>


              {/* <div className="col-lg-2 col-md-3 col-6">
              <div className="border rounded p-2">
                <input
                  type="number"
                  className="form-control border-0"
                  placeholder="Enter budget"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      minPrice: +e.target.value,
                      })
                      }
                      />
                      </div>
                      </div> */}
                       <div className="position-relative col-lg-2 col-md-3 col-6">
                      
                        {/* Budget Button */}
                        <div
                          className="budget-trigger"
                          style={{padding:"14px"}}
                          onClick={() => setShowBudget(!showBudget)}
                        >
                          Rs. {formatPK(priceRange[0])} - Rs. {formatPK(priceRange[1])}
                        </div>
                      
                        {/* Dropdown */}
                        {showBudget && (
                          <div className="budget-dropdown shadow">
                            <label className="form-label">
                              Price: Rs. {formatPK(priceRange[0])} - Rs. {formatPK(priceRange[1])}
                            </label>
                      
                            <Range
                                step={100}
                                min={MIN}
                                max={MAX}
                                values={priceRange}
                                onChange={(values) => setPriceRange(values)} // live update while dragging
                                renderTrack={({ props, children }) => {
                                  const { key, ...restProps } = props;
                                  return (
                                  <div
                                  key={key}
                                    {...restProps}
                                    style={{
                                      ...props.style,
                                      height: "6px",
                                      width: "100%",
                                      borderRadius: "4px",
                                      background: getTrackBackground({
                                        values: priceRange,
                                        colors: ["#ccc", "#14a800", "#ccc"],
                                        min: MIN,
                                        max: MAX,
                                      }),
                                      alignSelf: "center",
                                    }}
                                  >
                                    {children}
                                  </div>
                                )
                                }}
                                renderThumb={({ props }) => {
                                  const { key, ...restProps } = props;
                                  return (
                                  <div
                                    key={key}
                                    {...restProps}
                                    style={{
                                      position:"absolute",
                                      height: "20px",
                                      width: "20px",
                                      borderRadius: "50%",
                                      backgroundColor: "#14a800",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: "6px",
                                        width: "6px",
                                        borderRadius: "50%",
                                        backgroundColor: "white",
                                      }}
                                    />
                                  </div>
                                )
                                }}
                              />
                      
                            <div className="text-end mt-3">
                              <Button
                                size="sm"
                                color="success"
                                onClick={() => setShowBudget(false)}
                              >
                                Apply
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
            

            {/* Search Button */}
            <div className="col-md-1 col-12">
              <button
              onMouseEnter={()=>setIsHover(true)}
              onMouseLeave={()=>setIsHover(false)}
              style={{background:isHover ? "#108a00" : "#14a800",color:"white"}}
                className="btn w-100 py-2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

          </div>
        </div>
      </Container>
      <div className="main-gif-banner">
  
    <div className="gif-banner">
      <Image
        src="https://res.cloudinary.com/dmrk0ry6x/image/upload/v1771087032/ad_here_kknqgv.gif"
        alt="Loading..."
        fill
        // style={{ objectFit: "cover" }}
      />
    </div>
</div>
    </section>
  );
};

export default HomeBannerSection;
