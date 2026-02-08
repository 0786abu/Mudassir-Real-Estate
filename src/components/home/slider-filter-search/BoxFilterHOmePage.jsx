"use client";

import { NewFilterForHomePageRentBase, NewFilterForHomePageSaleBase } from "@/utils/FiltersCities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHome, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { useSelector } from "react-redux";


function PropertyFilter() {
    const router = useRouter();
    const handleFilterClick = (category, itemQuery) => {
  // itemQuery mai individual button ki query hoti hai
  // filter out null / undefined values
  const filteredQuery = Object.fromEntries(
    Object.entries(itemQuery).filter(([key, value]) => value !== null && value !== undefined)
  );
  const params = new URLSearchParams(filteredQuery).toString();
  router.push(`/properties?${params}`);
  // Ab yahan aap axios/fetch request kar sakte ho
  // Example:
  // axios.get("/api/properties", { params: filteredQuery })
};

  const [activeTab, setActiveTab] = useState({
    residential: "type",
    plot: "type",
    commercial: "type",
  });

  const renderButtons = (category, key) => {
    return NewFilterForHomePageSaleBase[category][key].map((item, idx) => (
      <button key={idx} className="btn btn-outline-custom m-1" style={{padding:"3px 6px"}} onClick={() => handleFilterClick(category, item.query)}>
        {item.label}
      </button>
    ));
  };

  const renderCard = (category, title) => (
    <div className="card p-3 mb-3 shadow-sm border filter-card">
      <h5>{title}</h5>
      <ul className="nav nav-tabs mb-2">
        {["type", "areaSize", "budget"].map((tab) => (
          <li key={tab} className="nav-item">
            <button
              className={` ${
                activeTab[category] === tab ? "green" : "tr" 
              }`}
              onClick={() =>
                setActiveTab((prev) => ({ ...prev, [category]: tab }))
              }
            >
              {tab === "type" ? "Type" : tab === "areaSize" ? "Area Size" : "Budget"}
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex flex-wrap filter-scroll">
        {renderButtons(category, activeTab[category])}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h4 className="mb-3">Browse Properties</h4>
      <div className="row">
        <div className="col-md-6 col-lg-4 ">{renderCard("residential", "House")}</div>
        <div className="col-md-6 col-lg-4 ">{renderCard("plot", "Plots")}</div>
        <div className="col-md-6 col-lg-4 ">{renderCard("commercial", "Commercial")}</div>
      </div>
    </div>
  );
}
function PropertyFilter2() {
     const router = useRouter();
    const handleFilterClick = (category, itemQuery) => {
  // itemQuery mai individual button ki query hoti hai
  // filter out null / undefined values
  const filteredQuery = Object.fromEntries(
    Object.entries(itemQuery).filter(([key, value]) => value !== null && value !== undefined)
  );
  const params = new URLSearchParams(filteredQuery).toString();
  router.push(`/properties?${params}`);
  // Ab yahan aap axios/fetch request kar sakte ho
  // Example:
  // axios.get("/api/properties", { params: filteredQuery })
};
  const [activeTab, setActiveTab] = useState({
    residential: "type",
    commercial: "type",
  });

  const renderButtons = (category, key) => {
    return NewFilterForHomePageRentBase[category][key].map((item, idx) => (
      <button key={idx} onClick={()=>handleFilterClick(category, item.query)} className="btn btn-outline-custom m-1" style={{padding:"3px 6px"}}>
        {item.label}
      </button>
    ));
  };

  const renderCard = (category, title) => (
    <div className="card p-3 mb-3 shadow-sm border filter-card">
      <h5>{title}</h5>
      <ul className="nav nav-tabs mb-2">
        {["type", "areaSize", "budget"].map((tab) => (
          <li key={tab} className="nav-item">
            <button
              className={` ${
                activeTab[category] === tab ? "green" : "tr" 
              }`}
              onClick={() =>
                setActiveTab((prev) => ({ ...prev, [category]: tab }))
              }
            >
              {tab === "type" ? "Type" : tab === "areaSize" ? "Area Size" : "Budget"}
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex flex-wrap filter-scroll">
        {renderButtons(category, activeTab[category])}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h4 className="mb-3">Browse Properties</h4>
      <div className="row">
        <div className="col-md-4">{renderCard("residential", "House")}</div>
        <div className="col-md-4">{renderCard("commercial", "Commercial")}</div>
      </div>
    </div>
  );
}


const BoxFilterHOmePage = () => {
    const {selectedFilterCategory} = useSelector((state)=>state.Property);
  return (
    <div>{selectedFilterCategory==="Sale" ? <PropertyFilter/> : <PropertyFilter2/>}</div>
  )
}

export default BoxFilterHOmePage