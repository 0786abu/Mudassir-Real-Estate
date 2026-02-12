/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */

import { GetLatestPropertiesforSale } from "@/utils/HomePageValues";
import ChildSaleProeprty from "./ChildSaleProeprty";


const SalePropertySection = async() => {
 const properties = await GetLatestPropertiesforSale();
  return (
    <ChildSaleProeprty value={properties} category={"sale"}/>
  );
};

export default SalePropertySection;
