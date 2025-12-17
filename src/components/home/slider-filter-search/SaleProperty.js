/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { LatestForSale, Sale } from "@/constValues/constValues";
import PropertyBoxOne from "../../elements/propertyBoxs/PropertyBoxOne";
import ContentLoader from "react-content-loader";

const SalePropertySection = ({ value,loading }) => {
 
  return (
    <section className='property-section slick-between slick-shadow'>
      <Container>
        <Row className=' ratio_landscape'>
          <Col>
            <div className='title-1'>
              <span className='label label-gradient'>{Sale}</span>
              <h2>{LatestForSale}</h2>
              <hr />
            </div>
            <Row className='listing-hover-property'>
              {loading ? (
                 Array.from({ length: 4 }).map((_, index) => (
    <Col xl="3" lg="4" md="6" key={index}>
      <ContentLoader className="skeleton-svg">
        <rect className="skeleton-img" />
        <rect className="skeleton-c1" />
        <rect className="skeleton-c2" />
        <rect className="skeleton-c3" />
      </ContentLoader>
    </Col>
  ))
              )  : value &&
                value?.map((data, i) => (
                   <Col xl='3' lg='4' md='6' key={i}>
        <PropertyBoxOne data={data} />
      </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SalePropertySection;
