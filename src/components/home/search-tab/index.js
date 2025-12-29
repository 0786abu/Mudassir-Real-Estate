"use client";
import React, { useEffect, useState } from "react";
import { AppPropertyData } from "@/data/appPropertyData";
import { getData } from "@/utils/getData";
import FeaturedPropertySection from "../classic/FeaturedProperty";
// import LatestPropertySection from "../classic/LatestProperty";
import PropertyServicesSection from "../classic/PropertyServices";
// import SubscribeSection from "../classic/Subscribe";
// import TestimonialSection from "../classic/Testimonial";
// import VideoSection from "../classic/Video";
import SalePropertySection from "../slider-filter-search/SaleProperty";
import AboutSection from "../classic/About";
import BrandSection from "../classic/Brand";
import HomeBannerSection from "./HomeBanner";
import CategorySection from "@/layout/SearchByCategory";
import { useDispatch, useSelector } from "react-redux";
import { AdminProperties, FeaturedProperties, LatestProperties } from "@/redux-toolkit/action/propertyAction";

const BodyContent = () => {
  const [clientData, setClientData] = useState();
  const {latestsproperties,latestpropertyloading,featuredProperties,featurepropertyloading,adminProperties,adminpropertyloading} = useSelector((state)=>state.Property);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(LatestProperties())
  },[dispatch])
  useEffect(()=>{
    dispatch(FeaturedProperties())
  },[dispatch])
  useEffect(()=>{
    dispatch(AdminProperties())
  },[dispatch])
  

  useEffect(() => {
    getData(`/api/client-agent`)
      .then((res) => {
        setClientData(res.data);
      })
      .catch((error) => console.error("Error", error));
  }, []);
  return (
    <>
      <HomeBannerSection />
      <CategorySection/>
      <SalePropertySection value={latestsproperties} loading={latestpropertyloading} />
      <FeaturedPropertySection value={featuredProperties} loading={featurepropertyloading} />
      <PropertyServicesSection value={AppPropertyData.PropertyServicesInClassic} />
      <SalePropertySection value={adminProperties} loading={adminpropertyloading} from="adminProperties" />
      {/* <VideoSection /> */}
      {/* <TestimonialSection value={clientData?.OurHappyClientInClassicLayout} /> */}
      {/* <SubscribeSection /> */}
      <AboutSection value={clientData?.OurAgentInClassicLayout} />
      <BrandSection />
    </>
  );
};

export default BodyContent;
