/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */
import React, { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { LatestForSale, Sale } from "@/constValues/constValues";
import PropertyBoxOne from "../../elements/propertyBoxs/PropertyBoxOne";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/navigation";

const SalePropertySection = ({ value,loading, from }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const handlePush = ()=>{
    router.push("/hot-properties")
  }
  return (
    <section className='property-section slick-between slick-shadow'>
      <Container>
        <Row className=' ratio_landscape'>
          <Col>
            <div className='title-1'>
              {from!=="adminProperties" && (
                <span className='label label-gradient'>{Sale}</span>
              )}
              <h2>{from==="adminProperties" ? "Hot Properties" : LatestForSale}</h2>
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
              )  : from==="adminProperties" ? (
                value &&
                value?.slice(0,4)?.map((data, i) => (
                   <Col xl='3' lg='4' md='6' key={i}>
        <PropertyBoxOne data={data} />
      </Col>
                ))
              ) : (
                value &&
                value?.map((data, i) => (
                   <Col xl='3' lg='4' md='6' key={i}>
        <PropertyBoxOne data={data} />
      </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
        {from==="adminProperties" && value?.length>4 && (
          <div className="d-flex justify-content-center" style={{marginTop:"60px"}}>
          <Button onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} onClick={handlePush} size="sm" style={{background:isHovered ? "#108a00" : "#14A800"}}>See all</Button>
        </div>
        )}
      </Container>
    </section>
  );
};

export default SalePropertySection;
