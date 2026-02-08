import Link from "next/link";
import React from "react";
import { Container, Row } from "reactstrap";

const SubFooterTwo = () => {
  return (
    <div className="sub-footer footer-light">
      <Container>
        <Row>
          <div className="col-xl-6 col-md-6">
            <div className="copy-right">
              <p className="mb-0">Copyright 2012 - 2026, All Right Reserved PakEarth</p>
            </div>
          </div>
          <div className="col-xl-6 col-md-6 text-end">
            <ul className="sub-footer-link">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/terms-&-conditions">Terms</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default SubFooterTwo;
