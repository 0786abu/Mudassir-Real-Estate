/**
 * It takes an array of objects, and returns a new array of objects with the same keys, but with the
 * values transformed by the function you pass in
 * @returns The data is being returned as an array of objects.
 */
import { Col, Container, Row } from "reactstrap";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";

const RelatedProperty = ({relatedProperties}) => {
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

  return (
    <section className="property-section pt-0 mt-5">
      <Container>
        <div className="title-3 text-start inner-title">
          <h2>Related Properties</h2>
        </div>
        <Row className=" ratio_55">
          <Col sm="12" className=" property-grid-3">
            <Row className=" column-sm zoom-gallery property-label property-grid">
              {relatedProperties?.length===0 ? (
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
                <h4>No Related Properties Found</h4>
              </div>
            </Col>
              ) : relatedProperties?.map((data, i) => (
                  <Col xl="4" md="6" className="wow fadeInUp" key={i}>
                    <PropertyBox data={data} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RelatedProperty;
