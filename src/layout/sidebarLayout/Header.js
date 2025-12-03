/**
 * It renders a header with a title, a dropdown, and a grid/list toggle
 * @returns The return statement is used to return a value from a function.
 */
import React, { useState } from "react";
import { AlignCenter } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import AdvancedSearch from "../advancedSearch/AdvancedSearch";
import useMobileSize from "@/utils/useMobileSize";

const Header = ({ grid, mapModal, tabHeader, title, AdvancedSearchShow, productCount, setMapModal }) => {
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const { propertyStatus } = useSelector((state) => state.inputsReducer);
  const mobileSize = useMobileSize("AdvancedSearch");
  const dispatch = useDispatch();
   

  return (
    <div className="filter-panel">
      <div className="top-panel">
        {tabHeader ? (
          <div className="filters respon-filter-content filter-button-group">
            <ul>
              <li className={propertyStatus === "Property Status" || !propertyStatus?.length ? "active" : ""} onClick={() => dispatch({ type: "propertyStatus", payload: "Property Status" })}>
                <span>All Property</span>
              </li>
              <li className={propertyStatus === "For Sale" ? "active" : ""} onClick={() => dispatch({ type: "propertyStatus", payload: "For Sale" })}>
                <span>For Sale</span>
              </li>
              <li className={propertyStatus === "For Rent" ? "active" : ""} onClick={() => dispatch({ type: "propertyStatus", payload: "For Rent" })}>
                <span>For rent</span>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2>{title}</h2>
            <span className="show-result">
              Showing{" "}
              <span>
                {(title === "Agency Listing" ? 9 : 6) * (grid?.toPage || 1) - (title === "Agency Listing" ? 9 : 6)}-{(title === "Agency Listing" ? 9 : 6) * (grid?.toPage || 1) > productCount ? productCount : (title === "Agency Listing" ? 9 : 6) * (grid?.toPage || 1)} of {productCount}
              </span>{" "}
              Listings
            </span>
          </div>
        )}

        <ul className="grid-list-filter d-flex justify-content-end">
          {mapModal && (
            <li>
              <a
                onClick={() => {
                  setMapModal(!mapModalOpen);
                  setMapModalOpen(!mapModalOpen);
                }}>
                View on map
                <span className="arrow-define">Click to view</span>
              </a>
            </li>
          )}
          <li className=" d-flex justify-content-end">
            {(AdvancedSearchShow || mobileSize) && (
              <div className="filter-bottom-title">
                <h6 className="mb-0 font-roboto" onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}>
                  Advance search <AlignCenter className="float-end ms-2" />
                </h6>
              </div>
            )}
          </li>

        </ul>
      </div>
      <AdvancedSearch advancedSearchOpen={advancedSearchOpen} setAdvancedSearchOpen={setAdvancedSearchOpen} />
    </div>
  );
};

export default Header;
