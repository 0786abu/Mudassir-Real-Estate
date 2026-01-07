"use client"
import { areaSizes, bedsFilterData, citiesLocationsData, propertyTypesData } from "@/utils/FiltersCities";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container } from "reactstrap";

const HomeBannerSection = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);
  const [isHover, setIsHover] = useState(false);

  const [filterValues, setFilterValues] = useState({
    category:"Sale",
    type: "",
    city: "",
    areaSize: "",
    beds: "",
    minPrice: "",
  });

  const handleSearch = () => {
  const query = new URLSearchParams();

  // Yeh optional values hain → sirf value ho tabhi URL mein add hongi
  if (filterValues.category) query.set("category", filterValues.category);
  if (filterValues.type) query.set("type", filterValues.type);
  if (filterValues.city) query.set("city", filterValues.city);
  if (filterValues.areaSize) query.set("areaSize", filterValues.areaSize);
  if (filterValues.beds) query.set("beds", filterValues.beds);
  if (filterValues.minPrice) query.set("minPrice", filterValues.minPrice);

  router.push(`/properties?${query.toString()}`);
};


  return (
    <section
    style={{
    backgroundImage: "url('/assets/images/8.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding:"150px 0"
  }}
    className="home-banner ">
      <Container>

        {/* ------- HERO TITLE (AUTO-STYLING KE LIYE AS-IT-IS) ------- */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            You are local Real estate
professionals
          </h2>
          <p className="text-muted">Residences can be classified by and connected to residences. Different types of housing can be use same physical type.</p>
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
    transition: "background 0.3s ease-in-out",
  }}
  className="btn"
  onClick={() =>
    setFilterValues({ ...filterValues, category: "Sale" })
  }
>
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
  className="btn"
  onClick={() =>
    setFilterValues({ ...filterValues, category: "Rent" })
  }
>
  Rent
</button>

            </div>
          </div>

          {/* -------- MAIN FILTER BAR -------- */}
          <div className="row gx-2 gy-2 align-items-center">

            {/* Property Type */}
            <div className="col-md-3 col-6">
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
                  <option value="">Property Type</option>
                   {propertyTypesData.map((item) => (
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
            <div className="col-md-3 col-6">
              <div className="border rounded p-2 d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                <select
                          className="form-select border-0"
                          value={filterValues.city}
                          onChange={(e) => setFilterValues({...filterValues, city:e.target.value })}
                        >
                          <option value="">Select City</option>
                          {citiesLocationsData.map((filt,index)=>{
                            return <option value={filt.city} key={index}>{filt.city}</option>
                          })}
                        </select>
              </div>
            </div>

            {/* Area */}
            <div className="col-md-2 col-6">
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

            {/* Beds */}
            <div className="col-md-2 col-6">
              <div className="border rounded p-2">
                <select
                  className="form-select border-0"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      beds: e.target.value,
                    })
                  }
                >
                  <option>No. of Beds</option>
                   {bedsFilterData.map((filt,index)=>{
                            return <option value={filt} key={index}>{filt}</option>
                          })}
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="col-md-2 col-6">
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
            </div>
            

            {/* Search Button */}
            <div className="col-md-2 col-12">
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
    </section>
  );
};

export default HomeBannerSection;
