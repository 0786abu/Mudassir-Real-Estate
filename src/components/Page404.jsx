"use client";
import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import Link from "next/link";
import NavbarFive from "@/layout/headers/NavbarFive";

const Page404 = () => {
  return (
    <Fragment>
      <section className="error-section small-section">
        <Container>
          <Row>
            <div className="col text-center not-found">
              <img src="/assets/images/inner-pages/2.svg" className="img-fluid" alt="" />
              <h2>Whoops! something went wrong ?</h2>
              <p className="font-roboto">we are sorry but the page you are looking for doesn&apos;t exist or has been removed. please check or search again.</p>
              <div className="btns">
                <Link href="/" className="btn btn-gradient">
                  go to home page
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Page404;
