import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

const page = () => {
  return (
       <>
          <Breadcrumb/>
    <section>
      <Container style={{maxWidth:"1024px"}} className=" m-auto">
        {/* Heading */}
        <Row className="mb-5 text-center">
          <Col>
            <h1 className="fw-bold">Our Features</h1>
            <p className="text-muted mt-2">
              Everything you need to buy, sell, or rent property with confidence
            </p>
          </Col>
        </Row>

        {/* Features */}
        <Row className="g-4 mb-5">
          <Col md="6" lg="4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody>
                <h5 className="fw-semibold">Easy Property Ad Posting</h5>
                <p className="text-muted mb-0">
                  Individuals and property dealers can both post their property ads with ease on PakEarth.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody>
                <h5 className="fw-semibold">Variety of Property Types</h5>
                <p className="text-muted mb-0">
                  Our platform includes residential properties alongside commercial properties and industrial properties with agricultural listings as well.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody>
                <h5 className="fw-semibold">Authenticated Listings</h5>
                <p className="text-muted mb-0">
                  We ensure property listings are authenticated and genuine to achieve maximum transparency.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody>
                <h5 className="fw-semibold">Local & Global Access</h5>
                <p className="text-muted mb-0">
                 Our platform offers accessibility for users from Pakistan and international locations.

                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md="6" lg="4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody>
                <h5 className="fw-semibold">Plenty of users</h5>
                <p className="text-muted mb-0">
                  Our website operates for users both in Pakistan and internationally which makes it perfect for international buyers and sellers.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Why Choose */}
        <Row className="mb-5">
          <Col md="12">
            <h2 className="fw-bold mb-4">Why Choose PakEarth?</h2>
          </Col>

          <Col md="6" className="mb-3">
            <h6 className="fw-semibold">User-Friendly Experience</h6>
            <p className="text-muted">
              Our platform offers straightforward and user-friendly property advertising and searching capabilities for efficient results.

            </p>
          </Col>

          <Col md="6" className="mb-3">
            <h6 className="fw-semibold">Vast Audience Reach</h6>
            <p className="text-muted">
              The growth of our community consisting of property advertisers and seekers ensures your property listings receive maximum visibility.
            </p>
          </Col>

          <Col md="6" className="mb-3">
            <h6 className="fw-semibold">Trustworthy & Secure</h6>
            <p className="text-muted">
              Our platform requires authentic transactions and interactions from all users.
            </p>
          </Col>

          <Col md="6" className="mb-3">
            <h6 className="fw-semibold">Industry News</h6>
            <p className="text-muted">
              Receive updates about property news alongside investment opportunities and development information.
            </p>
          </Col>
        </Row>

        {/* Vision */}
        <Row className="text-start">
          <Col md={{ size: 12 }}>
            <h2 className="fw-bold mb-3">Our Vision</h2>
            <p className="text-muted"> 
              Our vision is to transform the real estate experience with you by creating a trusted, innovative, and user-friendly platform. PakEarth uses seamless tools and reliable information to empower buyers, sellers and renters to make confident decisions when finding the best property for you to save your time and drive growth in the property market.
            </p>
            <p className="fw-semibold mt-3">
              Choose PakEarth as your partner in real estate, where trust, expertise, and a customer-first approach come together to turn your property dreams into reality. Explore real estate opportunities by joining PakEarth today.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
       </>
  );
};

export default page;
