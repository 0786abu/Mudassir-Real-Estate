"use client";
import React, { Fragment } from "react";
import FooterThree from "@/layout/footers/FooterThree";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import dynamic from "next/dynamic";
const BodyContent = dynamic(() => import("../../../../../components/pages/userPanel"), {
  ssr: false,
});

const CreateProperty = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent active={"CreateProperty"} />
      <FooterThree />
    </Fragment>
  );
};

export default CreateProperty;
