/**
 * It fetches data from the API and then renders the data in the UI
 * @returns The return value of the function is the value of the last expression in the function body.
 */
import React, { useEffect, useState } from "react";
import { AppPropertyData } from "@/data/appPropertyData";
import { getData } from "@/utils/getData";
import FeaturedPropertySection from "../classic/FeaturedProperty";
import LatestPropertySection from "../classic/LatestProperty";
import PropertyServicesSection from "../classic/PropertyServices";
import SubscribeSection from "../classic/Subscribe";
import TestimonialSection from "../classic/Testimonial";
import VideoSection from "../classic/Video";
import SalePropertySection from "../slider-filter-search/SaleProperty";
import AboutSection from "../classic/About";
import BrandSection from "../classic/Brand";
import HomeBannerSection from "./HomeBanner";
import CategorySection from "@/layout/SearchByCategory";
import { useDispatch, useSelector } from "react-redux";
import { FeaturedProperties, LatestProperties } from "@/redux-toolkit/action/propertyAction";

const BodyContent = () => {
  const [value, setValue] = useState();
  const [clientData, setClientData] = useState();
  const {latestsproperties,latestpropertyloading,featuredProperties,featureproeprtyloading} = useSelector((state)=>state.Property);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(LatestProperties())
  },[dispatch])
  useEffect(()=>{
    dispatch(FeaturedProperties())
  },[dispatch])
  

  useEffect(() => {
    getData(`/api/property`)
      .then((res) => {
        setValue(res.data);
      })
      .catch((error) => console.error("Error", error));
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
      <FeaturedPropertySection value={featuredProperties} loading={featureproeprtyloading} />
      <PropertyServicesSection value={AppPropertyData.PropertyServicesInClassic} />
      <LatestPropertySection value={value?.LatestPropertyInClassicLayout} />
      <VideoSection />
      <TestimonialSection value={clientData?.OurHappyClientInClassicLayout} />
      <SubscribeSection />
      <AboutSection value={clientData?.OurAgentInClassicLayout} />
      <BrandSection />
    </>
  );
};

export default BodyContent;
