"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/utils/getData";
import FeaturedPropertySection from "../classic/FeaturedProperty";
import SalePropertySection from "../slider-filter-search/SaleProperty";
import AboutSection from "../classic/About";
import BrandSection from "../classic/Brand";
import HomeBannerSection from "./HomeBanner";
import CategorySection from "@/layout/SearchByCategory";
import { useDispatch, useSelector } from "react-redux";
import { AdminProperties, FeaturedProperties, LatestProperties } from "@/redux-toolkit/action/propertyAction";
import BudgetSection from "@/components/property/BudgetSection";

const BodyContent = () => {
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
  
  return (
    <>
      <HomeBannerSection />
      <CategorySection/>
      <SalePropertySection value={latestsproperties} loading={latestpropertyloading} />
      <FeaturedPropertySection value={featuredProperties} loading={featurepropertyloading} />
      <SalePropertySection value={adminProperties} loading={adminpropertyloading} from="adminProperties" />
      {/* <VideoSection /> */}
      {/* <TestimonialSection value={clientData?.OurHappyClientInClassicLayout} /> */}
      {/* <SubscribeSection /> */}
      <AboutSection />
      <BudgetSection/>
      <BrandSection />
    </>
  );
};

export default BodyContent;
