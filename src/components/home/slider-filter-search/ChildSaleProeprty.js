"use client"
import React, { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { LatestForSale, Sale } from "@/constValues/constValues";
import { useRouter } from "next/navigation";
import PropertyBoxOne from "@/components/elements/propertyBoxs/PropertyBoxOne";

const ChildSaleProeprty = ({from,value,properties}) => {
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
              { from==="adminProperties" ? (
                properties &&
                properties?.slice(0,4)?.map((data, i) => (
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
        {from==="adminProperties" && properties?.length>4 && (
          <div className="d-flex justify-content-center" style={{marginTop:"60px"}}>
          <Button onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} onClick={handlePush} size="sm" style={{background:isHovered ? "#108a00" : "#14A800"}}>See all</Button>
        </div>
        )}
      </Container>
    </section>
  )
}

export default ChildSaleProeprty