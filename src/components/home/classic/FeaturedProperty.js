/**
 * It takes an array of objects and returns a slider with each object as a slide
 * @returns An array of objects.
 */

import { GetFeaturedProperties } from "@/utils/HomePageValues";
import ChildFeaturedProperties from "./ChildFeaturedProperties";


const FeaturedPropertySection = async() => {
 const featuredProperties = await GetFeaturedProperties();
  return (
    <ChildFeaturedProperties value={featuredProperties}/>
  );
};

export default FeaturedPropertySection;
