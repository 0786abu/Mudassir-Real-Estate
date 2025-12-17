import { formatPK } from "@/utils/Formatter";
import React from "react";
import { Col, Row } from "reactstrap";

const DetailsDeskBox = ({property}) => {
  return (
    <div className='desc-box' id='details'>
      <div className='page-section'>
        <h4 className='content-title'>
          Property Details
        </h4>
        <Row>
          <Col md='6' xl='4'>
            <ul className='property-list-details'>
              <li>
                <span>Property Type :</span> {property?.type}
              </li>
              <li>
                <span>Property ID :</span> {property?._id.slice(0,8)}
              </li>
              <li>
                <span>Property status :</span> For {property?.category}
              </li>
              <li>
                <span>Operating Since :</span> {property?.operatingSince}
              </li>
            </ul>
          </Col>
          <Col md='6' xl='4'>
            <ul className='property-list-details'>
              <li>
                <span>Price :</span> Rs. {formatPK(property?.price)}
              </li>
              <li>
                <span>Property Size :</span> {property?.squareFits} sq / ft
              </li>
             {property?.furnished && (
               <li>
                <span>Furnished :</span> Fully Furnished
              </li>
             )}
              {property?.balcony && (
                <li>
                <span>Balcony :</span> {property?.balcony}
              </li>
              )}
            </ul>
          </Col>
          <Col md='6' xl='4'>
            <ul className='property-list-details'>
              <li>
                <span>City :</span> {property?.city}
              </li>
              {property?.beds>0 && (
                <li>
                <span>Bedrooms :</span> {property?.beds}
              </li>
              )}
              {property?.baths>0 && (
                <li>
                <span>Bathrooms :</span> {property?.baths}
              </li>
              )}
              {property?.rooms>0 && (
                <li>
                <span>Totalrooms :</span> {property?.rooms}
              </li>
              )}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailsDeskBox;
