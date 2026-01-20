"use client";
import React, { Fragment } from "react";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import dynamic from "next/dynamic";
const BodyContent = dynamic(() => import("../../../../components/pages/userPanel"), {
  ssr: false,
});
export const metadata = {
  title: "Agent Dashboard | Pak Earth",
  description:
    "Agent Dashboard on Pak Earth where real estate agents can manage property listings, view inquiries, track performance, and handle client communications efficiently.",
};


const UserDashboard = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent active={"Dashboard"} role={"agent"} />
    </Fragment>
  );
};

export default UserDashboard;
