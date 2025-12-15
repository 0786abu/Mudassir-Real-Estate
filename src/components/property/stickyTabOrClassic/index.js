/**
 * It returns a section with a container with a row with a sidebar and a single property section
 * @returns The return statement is used to return a value from a function.
 */
"use client"
import React, { useEffect } from "react";
import { Button, Container, Row } from "reactstrap";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import Exploration from "../../../layout/sidebarLayout/Exploration";
import Featured from "../../../layout/sidebarLayout/Featured";
import Filter from "../../../layout/sidebarLayout/Filter";
// import Mortgage from "../../../layout/sidebarLayout/Mortgage";
import RecentlyAdded from "../../../layout/sidebarLayout/RecentlyAdded";
import Sidebar from "../../../layout/sidebarLayout/Sidebar";
import RelatedProperty from "./RelatedProperty";
import SinglePropertySection from "./SingleProperty";
import SliderBreadcrumbSection from "./SliderBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const BodyContent = ({ side, property,relatedProperties }) => {
  const { favProperties } = useSelector((state) => state.Favourites);
  const dispatch = useDispatch();
  return (
      <>
      {(property?.isApproved==="No Approved" || property?.isApproved==="Pending") ? (
        <div style={{minHeight:"80vh"}} className=" d-flex justify-content-center align-items-center">
          <div>
            {property?.isApproved === "Pending" ? (
              <div className="d-flex flex-column gap-4 align-content-start">
                <span>This property is currently under review by our admin. Please check back later or explore other available properties.</span>
                <Link style={{width:"100%"}} href={"/properties"}>
                  <Button style={{width:"100%"}} color="success">Property</Button>
                </Link>
              </div>
            ):(
              <div className="d-flex flex-column gap-4 align-content-start">
                <span>Unfortunately, this property was not approved by our admin. You can explore other available properties meanwhile.</span>
                <Link style={{width:"100%"}} href={"/properties"}>
                  <Button style={{width:"100%"}} color="success">Property</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <SliderBreadcrumbSection property={property} favourites={favProperties} />
      <section className="single-property">
        <Container>
          <Row className=" ratio_65">
            <Sidebar mortgage={true} side={side} singleProperty={true}>
              <ContactInfo owner={property?.createdBy} />
              <Exploration />
              {/* <Filter sm={12} /> */}
              <Featured />
              {/* <RecentlyAdded /> */}
            </Sidebar>
            <SinglePropertySection property={property} />
          </Row>
        </Container>
      </section>
      <RelatedProperty relatedProperties={relatedProperties} />
        </div>
      )}
      </>
  );
};

export default BodyContent;
