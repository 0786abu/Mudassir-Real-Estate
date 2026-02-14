"use client";

import { BUDGET_FILTERS, citiesLocationsData, FLATTENED_BUDGET_FILTERS, propertyTypesData } from "@/utils/FiltersCities";
import { formatPK } from "@/utils/Formatter";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Button,
} from "reactstrap";

const ProjectFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
    const MIN = 0;
  const MAX = 1000000000;
  const [showBudget, setShowBudget] = useState(false);
   const searchedType = params.get("type")
  const searchedCity = params.get("city")
  const searchedDeveloper = params.get("developer")
  const searchedMinPrice = params.get("minPrice");
  const searchedMaxPrice = params.get("maxPrice");
  const [city, setCity] = useState(searchedCity ? searchedCity : "");
  const [type, setType] = useState(searchedType ? searchedType : "");
  const [developer, setDeveloper] = useState(searchedDeveloper ? searchedDeveloper : "");
  const [priceRange, setPriceRange] = useState([
  searchedMinPrice ? Number(searchedMinPrice) : MIN,
  searchedMaxPrice ? Number(searchedMaxPrice) : MAX,
]);

  const handleSearch = () => {
  const newparams = new URLSearchParams(params.toString());

  if(developer) newparams.set("developer", developer);
  if(city) newparams.set("city", city);
  if(type) newparams.set("type", type);
   if (priceRange[0] !== MIN) newparams.set("minPrice", priceRange[0]);
  if (priceRange[1] !== MAX) newparams.set("maxPrice", priceRange[1]);
  router.push(`/projects?${newparams.toString()}`);
};


  const resetFilter = ()=>{
    setType("");
    setCity("");
    setDeveloper("");
    setPriceRange([MIN, MAX]);
    router.push("/projects")
  }
  return (
    <section className="project-filter-hero">
      <div className="overlay" />

      <Container>
        <div className="hero-text text-center">
          <h1>Find New Projects in Pakistan</h1>
          <p>
            Find exciting new real estate projects and investment opportunities
          </p>
        </div>

        <Card className="filter-card shadow-lg border-0">
          <CardBody>
            <Form>
              <Row className="g-3 align-items-end">
                {/* Project Type */}
                <Col lg="3" md="6">
                  <label className="filter-label">Project Type</label>
                  <Input 
                  type="select"
                  value={type}
                  onChange={(e)=>setType(e.target.value)}
                  
                  >
                    <option value={""}>select type</option>
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

                {/* City */}
                <Col lg="3" md="6">
                  <label className="filter-label">City</label>
                  <Input 
                  type="select"
                  value={city}
                  onChange={(e)=>setCity(e.target.value)}
                  >
                    <option value={""}>select city</option>
                    {citiesLocationsData.map((filt,index)=>{
                                return <option value={filt.city} key={index}>{filt.city}</option>
                              })}
                  </Input>
                </Col>
                <Col lg="3" md="6" className="position-relative">
  <label className="filter-label">Budget</label>

  {/* Budget Button */}
  <div
    className="budget-trigger"
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
</Col>



                {/* Location */}
                <Col lg="3" md="6">
                  <label className="filter-label">Developer</label>
                  <Input
                    type="text"
                    placeholder="Enter developer title"
                    value={developer}
                  onChange={(e)=>setDeveloper(e.target.value)}
                  />
                </Col>

                {/* Buttons */}
                <Col lg="3" md="6" className="d-flex gap-2">
                  <Button onClick={handleSearch} className="btn-search w-100">
                    🔍 Search
                  </Button>
                  <Button onClick={resetFilter} outline className="btn-reset w-100">
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
};

export default ProjectFilter;
