import Link from "next/link";
import React from "react";
import { Col } from "reactstrap";
import { Logo3 } from "../../../components/elements/Logo";

const FooterContactUsDetails = () => {
  return (
    <Col xl="3">
      <div className="footer-details text-center">
        <Logo3 />
        <p>Elegant retreat in a quiet Coral Gables setting. This home provides wonderful entertaining spaces with a chef kitchen opening</p>
      </div>
    </Col>
  );
};

export default FooterContactUsDetails;
