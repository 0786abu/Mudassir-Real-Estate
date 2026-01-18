"use client"
import React from 'react'
import ContentLoader from 'react-content-loader'
import { Col, Row } from 'reactstrap'

const SkeletonLoader = () => {
  return (
    <Row className=' m-lg-5 m-md-3 m-2'>
        {Array.from({ length: 4 }).map((_, index) => (
         <Col xl="3" lg="4" sm="6" key={index}>
           <ContentLoader className="skeleton-svg">
             <rect className="skeleton-img" />
             <rect className="skeleton-c1" />
             <rect className="skeleton-c2" />
             <rect className="skeleton-c3" />
           </ContentLoader>
         </Col>
       ))}
    </Row>
  )
}

export default SkeletonLoader