"use client"
import React, { Fragment, useEffect, useState } from "react";
import { getData } from "@/utils/getData";
import AboutSection from "../../../home/slider-filter-search/About";
import AboutUsSection from "./AboutUs";

const BodyContent = () => {
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getData(`/api/client-agent`)
      .then((res) => {
        setClientData(res.data);
      })
      .catch((error) => console.error("Error", error));
  }, []);
  return (
    <Fragment>
      <AboutUsSection />
      <AboutSection value={clientData?.MeetOurAgent} />
      {/* <div className='bg-light'>
        <TestimonialSection value={clientData?.WhatPeopleSay} />
      </div> */}
      {/* <BlogSection value={value?.LatestBlogInCorporate} /> */}
    </Fragment>
  );
};

export default BodyContent;
