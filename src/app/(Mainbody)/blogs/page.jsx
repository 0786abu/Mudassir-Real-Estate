/**
 * It takes a locale as an argument and returns a props object with the translations for the given
 * locale
 * @returns an object with a property called props. The props property is an object that contains the
 * translations for the current locale.
 */
"use client";
import React, { Fragment } from "react";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import BodyContent from "@/components/pages/blogPage/sidebarPage";
import FooterThree from "@/layout/footers/FooterThree";

const RightSidebar = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent side={"right"} />
      <FooterThree />
    </Fragment>
  );
};

export default RightSidebar;
