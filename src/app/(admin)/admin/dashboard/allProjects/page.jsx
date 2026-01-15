"use client";

import React from 'react'
import ListingSection from './ListingSection'
import { Col, Row } from 'reactstrap';

const page = () => {
  return (
    <section className="property-section">
        <Row className=' m-lg-4 m-md-3 m-2'>
            <Col sm="12" className={`property-grid-2 property-grid-slider`}>
              <ListingSection />
          </Col>
        </Row>
    </section>
  )
}

export default page