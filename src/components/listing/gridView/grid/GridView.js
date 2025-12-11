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

const GridView = ({ side }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    getData(`/api/property`)
      .then((res) => {setValue(
              Object.keys(res.data)
                .map((key) => [res.data[key]])
                .flat(2)
                .filter((arrData) => Array.isArray(arrData.img))
            );
      })
      .catch((error) => console.error("Error", error));
  }, []);
  return (
    <section className={`property-section  `}>
      <Container>
        <Row className=' ratio_63'>
          {side && (
            <Sidebar side={side}>
              <Filter value={value} sm={12} lg={12} /> <Category value={value} />
              <ContactInfo />
              <RecentlyAdded />
            </Sidebar>
          )}

          <Col xl={side ? "9" : ""} lg={side ? "8" : ""} className={`property-grid-2 property-grid-slider`}>
            <Header title={"Properties Listing"} value={value} />
            <div className={`property-wrapper-grid list-view`}>
              <GridLayout value={value} />
            </div>
              <Pagination />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GridView;
