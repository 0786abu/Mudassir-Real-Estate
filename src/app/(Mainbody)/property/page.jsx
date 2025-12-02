/**
 * It takes a locale as an argument and returns a props object with the translations for the given
 * locale
 * @returns an object with a property called props.
 */
"use client";
import React, { Fragment } from "react";
import BodyContent from "@/components/property/stickyTabOrClassic";
import FooterThree from "@/layout/footers/FooterThree";


const StickyTabOrClassic = () => {
  return (
    <Fragment>
      <BodyContent side={"right"} />
      <FooterThree />
    </Fragment>
  );
};

export default StickyTabOrClassic;
