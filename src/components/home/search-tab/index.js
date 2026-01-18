import FeaturedPropertySection from "../classic/FeaturedProperty";
import SalePropertySection from "../slider-filter-search/SaleProperty";
import AboutSection from "../classic/About";
import BrandSection from "../classic/Brand";
import HomeBannerSection from "./HomeBanner";
import CategorySection from "@/layout/SearchByCategory";
import BudgetSection from "@/components/property/BudgetSection";
import SponsoredProjects from "@/components/property/SponsoredProjects";
import { GetAdminProperties, GetAgents, GetFeaturedProperties, GetLatestProperties, GetSponsoredProjects } from "@/utils/HomePageValues";
import { Suspense } from "react";
import ProfileLoader from "@/components/common/Loader";
import ContentLoader from "react-content-loader";

const BodyContent = async() => {  
  const projects = await GetSponsoredProjects();
     const properties = await GetLatestProperties();
     const featuredProperties = await GetFeaturedProperties();
     const adminProperties = await GetAdminProperties();
     const Agents = await GetAgents();
      
  return (
    <>
      <HomeBannerSection />
      <CategorySection/>
      <Suspense fallback={ Array.from({ length: 4 }).map((_, index) => (
         <div className=" col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
           <ContentLoader className="skeleton-svg">
             <rect className="skeleton-img" />
             <rect className="skeleton-c1" />
             <rect className="skeleton-c2" />
             <rect className="skeleton-c3" />
           </ContentLoader>
         </div>
       ))}>
        <SalePropertySection value={properties}/>
      </Suspense>
      <Suspense fallback={<ProfileLoader/>}>
        <FeaturedPropertySection value={featuredProperties}/>
      </Suspense>
      <Suspense fallback={ Array.from({ length: 4 }).map((_, index) => (
         <div className=" col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
           <ContentLoader className="skeleton-svg">
             <rect className="skeleton-img" />
             <rect className="skeleton-c1" />
             <rect className="skeleton-c2" />
             <rect className="skeleton-c3" />
           </ContentLoader>
         </div>
       ))}>
        <SalePropertySection properties={adminProperties} from="adminProperties" />
      </Suspense>
      {/* <VideoSection /> */}
      {/* <TestimonialSection value={clientData?.OurHappyClientInClassicLayout} /> */}
      {/* <SubscribeSection /> */}
      <Suspense fallback={<ProfileLoader/>}>
        <SponsoredProjects projects={projects}/>
      </Suspense>
      <Suspense fallback={<ProfileLoader/>}>
        <AboutSection agents={Agents} />
      </Suspense>
      <BudgetSection/>
      <BrandSection />
    </>
  );
};

export default BodyContent;
