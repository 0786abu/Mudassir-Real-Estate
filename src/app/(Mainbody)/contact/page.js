/**
 * It takes a locale and an array of namespaces, and returns an object with the translations for those
 * namespaces
 * @returns The return value of the function is an object with a props property.
 */
import React, { Fragment } from "react";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import BodyContent from "@/components/contact/contactUs2";

const ContactUs1 = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent />
    </Fragment>
  );
};

export default ContactUs1;
