/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */

import { GetLatestPropertiesforRent } from "@/utils/HomePageValues";
import ChildSaleProeprty from "./ChildSaleProeprty";


const RentPropertySection = async({category}) => {
 const properties = await GetLatestPropertiesforRent();
  return (
    <ChildSaleProeprty value={properties} category={category}/>
  );
};

export default RentPropertySection;
