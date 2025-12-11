import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";

const GridLayout =({properties,favProperties,from}) => {
   
  return (
    <Fragment>
     {!properties ? (
       <Row className={` column-sm zoom-gallery property-grid list-view`}>
        {!favProperties || favProperties?.length === 0 ? (
          <Col xs={12} className="text-center py-5">
            <div className="no-properties d-flex flex-column align-items-center justify-content-center">
              {/* You can replace this with an SVG or image */}
              <div
                style={{
                  fontSize: "80px",
                  color: "#ff8c41",
                  marginBottom: "20px",
                }}
              >
                🏠
              </div>
              <h4>No Favourite Properties Found</h4>
            </div>
          </Col>
        ) : (
          favProperties?.map((data, i) => (
            <Fragment key={i}>
              <Col xs={12} key={i}>
                <PropertyBox data={data} from={from} />
              </Col>
            </Fragment>
          ))
        )}
      </Row>
     ):(
       <Row className={` column-sm zoom-gallery property-grid list-view`}>
        {!properties || properties?.length === 0 ? (
          <Col xs={12} className="text-center py-5">
            <div className="no-properties d-flex flex-column align-items-center justify-content-center">
              {/* You can replace this with an SVG or image */}
              <div
                style={{
                  fontSize: "80px",
                  color: "#ff8c41",
                  marginBottom: "20px",
                }}
              >
                🏠
              </div>
              <h4>No Properties Found</h4>
              <p className="text-muted">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          </Col>
        ) : (
          properties?.map((data, i) => (
            <Fragment key={i}>
              <Col xs={12} key={i}>
                <PropertyBox data={data} />
              </Col>
            </Fragment>
          ))
        )}
      </Row>
     )}
    </Fragment>
  );
};

export default GridLayout;
