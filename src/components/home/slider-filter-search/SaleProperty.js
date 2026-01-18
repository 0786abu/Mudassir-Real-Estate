/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */

import { GetLatestProperties } from "@/utils/HomePageValues";
import ChildSaleProeprty from "./ChildSaleProeprty";


const SalePropertySection = async() => {
 const properties = await GetLatestProperties();
  return (
    <ChildSaleProeprty value={properties}/>
  );
};

export default SalePropertySection;
