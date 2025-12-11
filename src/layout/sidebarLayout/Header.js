/**
 * It renders a header with a title, a dropdown, and a grid/list toggle
 * @returns The return statement is used to return a value from a function.
 */
"use client"
import React, { useState } from "react";
import { AlignCenter } from "react-feather";
import AdvancedSearch from "../advancedSearch/AdvancedSearch";
import useMobileSize from "@/utils/useMobileSize";

const Header = ({ title, totalProperties, favProperties, from }) => {
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const mobileSize = useMobileSize("AdvancedSearch");
   

  return (
    <div className="filter-panel">
      <div className="top-panel">
          <div>
            <h2>{title}</h2>
            <span className="show-result">
              Showing{" "}
              <span>{totalProperties ? totalProperties : favProperties}
              </span>{" "}
              Listings
            </span>
          </div>

       {!from && (
         <ul className="grid-list-filter d-flex justify-content-end">
          <li className=" d-flex justify-content-end">
            {(mobileSize) && (
              <div className="filter-bottom-title">
                <h6 className="mb-0 font-roboto" onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}>
                  Advance search <AlignCenter className="float-end ms-2" />
                </h6>
              </div>
            )}
          </li>

        </ul>
       )}
      </div>
     {!from && (
       <AdvancedSearch advancedSearchOpen={advancedSearchOpen} setAdvancedSearchOpen={setAdvancedSearchOpen} />
     )}
    </div>
  );
};

export default Header;
