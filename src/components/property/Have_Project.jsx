"use client";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap";

const ProjectCTA = () => {
  return (
    <div className="project-cta">
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="10">
            <Card className="cta-card text-center border-0">
              <CardBody>
                <h2 className="cta-title">
                  Have a Project in Mind?
                </h2>

                <p className="cta-text">
                  Let our expert team help you with professional property
                  mapping, precise location visualization, and comprehensive
                  project planning.
                </p>

                <div className="cta-buttons">
                  <Link href={"/contact"} target="_blank"><Button className="btn-primary-custom me-3">
                    🚀 Start Your Project
                  </Button></Link>

                  <Link href={"tel:03164249126"}><Button outline className="btn-outline-custom mt-sm-0 mt-2">
                    📞 Call: +92 300 97 44 991
                  </Button></Link>
                </div>

                <div className="cta-time">
                  🕘 Available Monday to Saturday, 9:00 AM – 6:00 PM
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectCTA;
