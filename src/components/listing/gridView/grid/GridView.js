/**
 * It takes in a bunch of props, and returns a bunch of JSX
 * @returns The return value of the function is the value of the last expression in the function body.
 */

import { useEffect, useReducer, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Pagination from "../../../../layout/Pagination";
import Category from "../../../../layout/sidebarLayout/Category";
import ContactInfo from "../../../../layout/sidebarLayout/ContactInfo";
import Filter from "../../../../layout/sidebarLayout/Filter";
import Header from "../../../../layout/sidebarLayout/Header";
import RecentlyAdded from "../../../../layout/sidebarLayout/RecentlyAdded";
import Sidebar from "../../../../layout/sidebarLayout/Sidebar";
import { getData } from "../../../../utils/getData";
import GridLayout from "../../elements/GridLayout";

const GridView = ({ properties, side, from, fromPanel,mypropertyloading,setActiveTab, fromTo }) => {
  return (
    <section style={{padding:fromPanel ? "0px" : undefined}} className={`property-section  `}>
      <Container>
        <Row className=' ratio_63'>
          {side && (
            <Sidebar side={side}>
              <Filter value={value} sm={12} lg={12} /> <Category value={value} />
              <ContactInfo />
              <RecentlyAdded />
            </Sidebar>
          )}

          <Col xs="12" className={`property-grid-2 property-grid-slider`}>
            {/* <Header title={"Properties Listing"} value={value} /> */}
            <div className={`property-wrapper-grid list-view`}>
              <GridLayout from={from} fromTo={fromTo} properties={properties} fromPanel={fromPanel} mypropertyloading={mypropertyloading} setActiveTab={setActiveTab} />
            </div>
              {/* <Pagination /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GridView;
