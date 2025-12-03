"use client";
import React, { Fragment } from "react";
import FooterThree from "@/layout/footers/FooterThree";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import dynamic from "next/dynamic";
const BodyContent = dynamic(() => import("../../../../components/pages/userPanel"), {
  ssr: false,
});

const UserDashboard = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent active={"Dashboard"} role={"agent"} />
      <FooterThree />
    </Fragment>
  );
};

export default UserDashboard;
