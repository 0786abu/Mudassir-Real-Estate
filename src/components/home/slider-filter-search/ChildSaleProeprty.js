"use client"
import { Col, Container, Row } from "reactstrap";
import { LatestForSale, Sale } from "@/constValues/constValues";
import PropertyBoxOne from "@/components/elements/propertyBoxs/PropertyBoxOne";
import Link from "next/link";

const ChildSaleProeprty = ({from,value,properties,category}) => {
  return (
    <section style={{marginTop: category==="sale" ? "-40px" : "-120px"}} className='property-section slick-between slick-shadow'>
      <Container>
        <Row className=' ratio_landscape'>
          <Col>
            <div className={from==="adminProperties" ? "title-1-1" : "title-1-2"} style={{marginBottom:"50px"}}>
              <h2>{from==="adminProperties" ? "Sponsored Properties" : category==="rent" ? "Latest Properties For Rent" : LatestForSale}</h2>
              <hr />
            </div>
              {from==="adminProperties" ? (
                <div className=" d-flex justify-content-end" style={{marginTop:"-80px",marginBottom:"40px"}}>
                  <Link href="/hot-properties" className="view-all">View All →</Link>
                </div>
              ) : (
                <div className=" d-flex justify-content-end" style={{marginTop:"-80px",marginBottom:"40px"}}>
                  <Link href={category==="sale" ? "/properties?isLatest=latest&category=Sale" : "/properties?isLatest=latest&category=Rent"} className="view-all">View All →</Link>
                </div>
              )}
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
      </Container>
    </section>
  )
}

export default ChildSaleProeprty