"use client";
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Image from "next/image";

const AdminPropertyDetail = ({ property }) => {
  if (!property) return null;

  return (
    <Container fluid className="py-4">
      <Row className="g-4">
        {/* LEFT: Images */}
        <Col lg="5">
          <Card className="shadow-sm border-0 h-100">
            <CardBody>
              <Image
                src={property.images?.[0]?.url}
                alt={property.title}
                width={800}
                height={500}
                className="img-fluid rounded"
                style={{ objectFit: "cover" }}
              />
            </CardBody>
          </Card>
        </Col>

        {/* RIGHT: MAIN INFO */}
        <Col lg="7">
          <Card className="shadow-sm border-0 h-100">
            <CardBody>
              <h3 className="fw-bold mb-2">{property.title}</h3>

              <div className="mb-3">
                <Badge color="primary" className="me-2">
                  {property.category}
                </Badge>
                <Badge color="dark" className="me-2">
                  {property.type}
                </Badge>
                <Badge
                  color={
                    property.isApproved === "Approved"
                      ? "success"
                      : "warning"
                  }
                >
                  {property.isApproved}
                </Badge>
              </div>

              <h4 className="text-success fw-bold mb-3">
                PKR {property.price.toLocaleString()}
              </h4>

              <p className="text-muted">{property.description}</p>

              <Row className="text-center my-4">
                <Col>
                  <strong>{property.beds}</strong>
                  <div className="text-muted small">Beds</div>
                </Col>
                <Col>
                  <strong>{property.baths}</strong>
                  <div className="text-muted small">Baths</div>
                </Col>
                <Col>
                  <strong>{property.rooms}</strong>
                  <div className="text-muted small">Rooms</div>
                </Col>
                <Col>
                  <strong>{property.squareFits}</strong>
                  <div className="text-muted small">Sqft</div>
                </Col>
              </Row>

              <hr />

              <Row>
                <Col md="6">
                  <p className="mb-1">
                    <strong>Area Size:</strong> {property.areaSize}
                  </p>
                  <p className="mb-1">
                    <strong>Furnished:</strong>{" "}
                    {property.furnished ? "Yes" : "No"}
                  </p>
                  <p className="mb-1">
                    <strong>Operating Since:</strong>{" "}
                    {property.operatingSince}
                  </p>
                </Col>

                <Col md="6">
                  <p className="mb-1">
                    <strong>Country:</strong> {property.country}
                  </p>
                  <p className="mb-1">
                    <strong>City:</strong> {property.city}
                  </p>
                  <p className="mb-1">
                    <strong>Location:</strong> {property.location}
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* EXTRA DETAILS */}
      <Row className="mt-4 g-4">
        <Col lg="6">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold mb-3">Amenities</h5>
              <div className="d-flex flex-wrap gap-2">
                {property.amenities?.map((item, i) => (
                  <Badge key={i} color="secondary" pill>
                    {item}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg="6">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold mb-3">SEO Information</h5>
              <ListGroup flush>
                <ListGroupItem>
                  <strong>SEO Title:</strong> {property.seo_title}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>SEO Description:</strong>{" "}
                  {property.seo_description}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Slug:</strong> {property.slug}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Keywords:</strong>{" "}
                  {property.keywords?.join(", ")}
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPropertyDetail;
