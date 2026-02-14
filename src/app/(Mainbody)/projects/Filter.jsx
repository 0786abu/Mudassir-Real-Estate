"use client";

import { BUDGET_FILTERS, citiesLocationsData, FLATTENED_BUDGET_FILTERS, propertyTypesData } from "@/utils/FiltersCities";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
   const searchedType = params.get("type")
  const searchedCity = params.get("city")
  const searchedDeveloper = params.get("developer")
  const [city, setCity] = useState(searchedCity ? searchedCity : "");
  const [type, setType] = useState(searchedType ? searchedType : "");
  const [developer, setDeveloper] = useState(searchedDeveloper ? searchedDeveloper : "");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
  const newparams = new URLSearchParams(params.toString());

  if(developer) newparams.set("developer", developer);
  if(city) newparams.set("city", city);
  if(type) newparams.set("type", type);

  if(budget) {
    const [min, max] = budget.split("-").map(Number);

    if(min !== null && min !== undefined && !isNaN(min)) {
      newparams.set("minPrice", min);
    }

    if(max !== null && max !== undefined && !isNaN(max)) {
      newparams.set("maxPrice", max);
    }
  }

  router.push(`/projects?${newparams.toString()}`);
};


  const resetFilter = ()=>{
    setType("");
    setCity("");
    setDeveloper("");
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
                <Col lg="3" md="6">
  <label className="filter-label">Budget</label>
  <Input 
    type="select"
    value={budget}
    onChange={(e)=>setBudget(e.target.value)}
  >
    <option value={""}>select budget</option>
    {FLATTENED_BUDGET_FILTERS.map((item, index) => (
      <option 
        key={index} 
        value={`${item.minPrice}-${item.maxPrice}`} // backend ko send karne ke liye
      >
       {item.label}
      </option>
    ))}
  </Input>
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
