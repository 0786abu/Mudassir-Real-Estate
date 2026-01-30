import Link from "next/link";
import React from "react";
import { Col } from "reactstrap";
import { Logo3 } from "../../../components/elements/Logo";

const FooterContactUsDetails = () => {
  return (
    <Col xl="3">
      <div className="footer-details bg-transparent text-start">
        <Logo3 />
        <p className="mb-0">PakEarth  is a dedicated platform for property ads, created to bridge the gap between property seller and buyer. With an extensive network and a user-friendly interface, we provide a space where individuals and businesses can post Free Classified Ad and find residential plots, apartments, commercial spaces and agricultural lands efficiently. </p>
      </div>
    </Col>
  );
};

export default FooterContactUsDetails;
