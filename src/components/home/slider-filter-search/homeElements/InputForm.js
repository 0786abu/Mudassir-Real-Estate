"use client";

import { citiesLocationsData, propertyTypesData } from "@/utils/FiltersCities";
import { formatPK } from "@/utils/Formatter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";

export default function FilterSidebar() {
  const router = useRouter();
  const params = useSearchParams();
  const searchedCategory = params.get("category")
  const searchedType = params.get("type")
  const searchedCity = params.get("city")
  const searchedMinPrice = params.get("minPrice")
  const [isHover, setIsHover] = useState(false);

  const [category, setCategory] = useState(searchedCategory ? searchedCategory : "");
  const [type, setType] = useState(searchedType ? searchedType : "");
  const [city, setCity] = useState(searchedCity ? searchedCity : "");
  const [location, setLocation] = useState("");

  // Dynamic min/max for slider
  const MIN = 0;
  const MAX = 100000000;
  const MINFits = 100;
  const MAXFits = 40000;

  const [priceRange, setPriceRange] = useState([searchedMinPrice ? searchedMinPrice :MIN, MAX]);
  const [squareRange, setSquareRange] = useState([MINFits, MAXFits]);

  // Sync slider with URL params on initial load
  useEffect(() => {
    const minP = params.get("minPrice");
    const maxP = params.get("maxPrice");
    if (minP !== null && maxP !== null) setPriceRange([Number(minP), Number(maxP)]);
  }, [params]);
  useEffect(() => {
    const minSS = params.get("minsquareSize");
    const maxSS = params.get("maxsquareSize");
    if (minSS && maxSS) setSquareRange([Number(minSS), Number(maxSS)]);
  }, [params]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(params.toString());

    if (key === "category") setCategory(value);
    if (key === "type") setType(value);
    if (key === "city") setCity(value);
    if (key === "location") setLocation(value);

    // Price Range update
    if (key === "priceRange") {
      setPriceRange(value);
      newParams.set("minPrice", value[0]);
      newParams.set("maxPrice", value[1]);
    }
    if (key === "squareFits") {
      setSquareRange(value);
      newParams.set("minsquareSize", value[0]);
      newParams.set("maxsquareSize", value[1]);
    }

    if (key !== "priceRange" && key !== "squareFits") {
  if (value) newParams.set(key, value);
  else newParams.delete(key);
}

    router.push(`/properties?${newParams.toString()}`);
  };

  const resetFilters = () => {
    setCategory("");
    setType("");
    setCity("");
    setLocation("");
    setPriceRange([MIN, MAX]);
    setSquareRange([MINFits, MAXFits]);
    router.push("/properties");
  };

  return (
    <div className="p-1">

      {/* Property Status */}
      <div className="mb-3">
        {/* <label className="form-label">Property Status</label> */}
        <select
          style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
          value={category}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          <option value="">Property category</option>
          <option value="Sale">For Sale</option>
          <option value="Rent">For Rent</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="mb-3">
        {/* <label className="form-label">Property Type</label> */}
        <select
          style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
          value={type}
          onChange={(e) => updateFilter("type", e.target.value)}
        >
          <option value="">Property Type</option>
         {propertyTypesData.map((item,index) => (
    <optgroup key={index} label={item.mainType}>
      {item.types.map((sub,index) => (
        <option key={index} value={sub}>
          {sub}
        </option>
      ))}
    </optgroup>
  ))}
        </select>
      </div>

      {/* City */}
      <div className="mb-3">
        {/* <label className="form-label">City</label> */}
        <select
          className=""
          style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
          value={city}
          onChange={(e) => updateFilter("city", e.target.value)}
        >
          <option value="">Select City</option>
          {citiesLocationsData.map((filt,index)=>{
            return <option value={filt.city} key={index}>{filt.city}</option>
          })}
        </select>
      </div>

      {/* Location */}
      <div className="mb-3">
        {/* <label className="form-label">Location</label> */}
        <select
  style={{
    outline: "none",
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "0.5px solid #ced4da"
  }}
  value={location}
  onChange={(e) => updateFilter("location", e.target.value)}
>
  <option value="">Select Location</option>

  {citiesLocationsData.filter(item=>Array.isArray(item.subCities) && item.subCities.length > 0).map((item,index) => (
    <optgroup key={index} label={item.city}>
      {item.subCities.map((sub,index) => (
        <option key={index} value={sub}>
          {sub}
        </option>
      ))}
    </optgroup>
  ))}
</select>
      </div>

      {/* Dual Price Slider */}
      <div className="mb-4">
        <label className="form-label">
          Price: RS. {formatPK(priceRange[0])} - Rs. {formatPK(priceRange[1])}
        </label>
        <Range
          step={100}
          min={MIN}
          max={MAX}
          values={priceRange}
          onChange={(values) => setPriceRange(values)} // live update while dragging
          onFinalChange={(values) => updateFilter("priceRange", values)} // apply filter
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
      </div>
      <div className="mb-4">
        <label className="form-label">
          sqft: {squareRange[0]} - sqft. {squareRange[1]}
        </label>
        <Range
          step={100}
          min={MINFits}
          max={MAXFits}
          values={squareRange}
          onChange={(values) => setSquareRange(values)} // live update while dragging
          onFinalChange={(values) => updateFilter("squareFits", values)} // apply filter
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
                  values: squareRange,
                  colors: ["#ccc", "#14a800", "#ccc"],
                  min: MINFits,
                  max: MAXFits,
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
      </div>
{/* ? "#14a800"
          : "#108a00" */}
     <button
     onMouseEnter={()=>setIsHover(true)}
     onMouseLeave={()=>setIsHover(false)}
        className="btn w-100 py-2 rounded-3 fw-semibold shadow-sm"
        style={{background:isHover ? "#108a00" : "#14a800",color:"white"}}
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
}
