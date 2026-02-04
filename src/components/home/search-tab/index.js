import SalePropertySection from "../slider-filter-search/SaleProperty";
import HomeBannerSection from "./HomeBanner";
import CategorySection from "@/layout/SearchByCategory";
import BudgetSection from "@/components/property/BudgetSection";
import SponsoredProjects from "@/components/property/SponsoredProjects";
import { Suspense } from "react";
import ProfileLoader from "@/components/common/Loader";
import AdminProperties from "../slider-filter-search/AdminProperties";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import HomePageFilter from "./HomePageFilter";

const BodyContent = async() => {  
  return (
    <>
      <HomeBannerSection />
      <CategorySection/>
      <Suspense fallback={ <SkeletonLoader/>}>
        <SalePropertySection/>
      </Suspense>
      <Suspense fallback={ <SkeletonLoader/>}>
        <AdminProperties />
      </Suspense>
      <Suspense fallback={<ProfileLoader/>}>
        <SponsoredProjects/>
      </Suspense>
      <HomePageFilter/>
      <BudgetSection/>
      {/* <BrandSection /> */}
    </>
  );
};

export default BodyContent;
