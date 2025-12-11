"use client"
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import Pagination from "@/layout/Pagination";
import Header from "@/layout/sidebarLayout/Header";
import GridLayout from "../../../listing/elements/GridLayout";
import ProfileLoader from "@/components/common/Loader";

const FavoritesTab = () => {
  const {favProperties,favloading,addfavloading} = useSelector((state)=>state.Favourites);
  return (
    <div className='dashboard-content'>
      <div className='tab-listing' id='favouritesTab'>
        <div className='property-section'>
          <div className='property-grid-2 ratio_63'>
           {favloading ? (<ProfileLoader/>) : (
             <section className='property-section p-0'>
              <Container>
                <div className='property-grid-2 property-grid-slider'>
                  <Header title={"Favorites Listing"} />
                  <div className={`property-wrapper-grid list-view`}>
                    <GridLayout favProperties={favProperties} addfavloading={addfavloading} from="Favourites" />
                  </div>
                  {/* <Pagination toPage={grid.toPage} gridDispatch={gridDispatch} totalPages={grid.totalPages} /> */}
                </div>
              </Container>
            </section>
           )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesTab;
