"use client";
import React, { Fragment } from "react";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import dynamic from "next/dynamic";
const BodyContent = dynamic(() => import("../../../../components/pages/userPanel"), {
  ssr: false,
});
export const metadata = {
  title: "User Dashboard | Pak Earth",
  description:
    "User Dashboard on Pak Earth allowing users to manage profiles, view saved properties, track inquiries, and explore real estate opportunities across Pakistan.",
};

const UserDashboard = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent active={"Dashboard"} role={"individual"}/>
    </Fragment>
  );
};

export default UserDashboard;
