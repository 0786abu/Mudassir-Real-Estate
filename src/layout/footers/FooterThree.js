 "use client";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { FooterData } from "../../data/footerData";
import FooterLink from "./elements/FooterLink";
import FooterBlog from "./footerThreeElements/FooterBlog";
import FooterContactUsDetails from "./footerThreeElements/FooterContactUsDetails";
import SubFooterTwo from "./elements/SubFooterTwo";

const FooterThree = () => {
  const [isActive, setIsActive] = useState();
  return (
    <footer>
      <div className="footer footer-bg">
        <Container>
          <Row>
            <FooterContactUsDetails />
            <Col xl="9">
              <Row>
                <FooterLink value={FooterData.usefulLinks} isActive={isActive} setIsActive={setIsActive} />
                <FooterLink value={FooterData.feature} isActive={isActive} setIsActive={setIsActive} />
                <FooterLink value={FooterData.social} isActive={isActive} setIsActive={setIsActive} />
                <Col lg="3" xl="4">
                  <div className="footer-links">
                    <h5
                      className={`footer-title ${isActive === "subscribe" ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsActive("subscribe");
                        isActive === "subscribe" && setIsActive();
                      }}>
                      subscribe
                      <span className="according-menu">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </h5>
                    <div className={`footer-content ${isActive === "subscribe" ? "d-block" : "d-none d-md-block"}`}>
                      <p className="mb-0">PakEarth  is a dedicated platform for property ads, created to bridge the gap between property seller and buyer. With an extensive network and a user-friendly interface, we provide a space where individuals and businesses can post Free Classified Ad and find residential plots, apartments, commercial spaces and agricultural lands efficiently. </p>
                      <form>
                        <div className="input-group">
                          <input type="email" className="form-control" placeholder="Email Address" required />
                          <span className="input-group-apend">
                            <button type="submit" className="input-group-text" id="basic-addon2">
                              <i className="fas fa-paper-plane"></i>
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* <FooterBlog /> */}
            </Col>
          </Row>
        </Container>
      </div>
      <SubFooterTwo />
    </footer>
  );
};

export default FooterThree;
