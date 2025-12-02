/**
 * It takes a locale as an argument and returns a props object with the translations for the given
 * locale
 * @returns an object with a property called props.
 */
"use client";
import React, { Fragment } from "react";
import BodyContent from "@/components/property/tabPanelPages";
import FooterThree from "@/layout/footers/FooterThree";

const ThumbnailImage = () => {
  return (
    <Fragment>
      <BodyContent />
      <FooterThree />
    </Fragment>
  );
};

export default ThumbnailImage;
