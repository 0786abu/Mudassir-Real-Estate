import SalePropertySection from "../slider-filter-search/SaleProperty";
import HomeBannerSection from "./HomeBanner";
import CategorySection from "@/layout/SearchByCategory";
import SponsoredProjects from "@/components/property/SponsoredProjects";
import { Suspense } from "react";
import ProfileLoader from "@/components/common/Loader";
import AdminProperties from "../slider-filter-search/AdminProperties";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import HomePageFilter from "./HomePageFilter";
import PropertyFilter from "../slider-filter-search/BoxFilterHOmePage";
import RentPropertySection from "../slider-filter-search/RentProperties";

const BodyContent = async() => {  
  return (
    <>
      <HomeBannerSection />
      <PropertyFilter/>
      <CategorySection/>
      <Suspense fallback={ <SkeletonLoader/>}>
        <SalePropertySection/>
      </Suspense>
      <Suspense fallback={ <SkeletonLoader/>}>
        <RentPropertySection category="rent" />
      </Suspense>
      <Suspense fallback={ <SkeletonLoader/>}>
        <AdminProperties />
      </Suspense>
      <Suspense fallback={<ProfileLoader/>}>
        <SponsoredProjects/>
      </Suspense>
      <HomePageFilter/>
    </>
  );
};

export default BodyContent;
