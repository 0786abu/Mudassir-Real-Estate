"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import Header from "@/layout/sidebarLayout/Header";
import GridLayout from "../../../listing/elements/GridLayout";
import ProfileLoader from "@/components/common/Loader";
import { GetFavouritesData } from "@/redux-toolkit/action/favouritesAction";

const FavoritesTab = () => {
  const {favProperties,favloading,addfavloading} = useSelector((state)=>state.Favourites);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetFavouritesData());
  },[dispatch])
  return (
    <div className='dashboard-content'>
      <div className='tab-listing' id='favouritesTab'>
        <div className='property-section'>
          <div className='property-grid-2 ratio_63'>
           {favloading ? (<ProfileLoader/>) : (
             <section className='property-section p-0'>
              <Container>
                <div className='property-grid-2 property-grid-slider'>
                  <Header title={"Favorites Listing"} favProperties={favProperties} from={"Favourites"} />
                  <div className={`property-wrapper-grid list-view`}>
                    <GridLayout favourites={favProperties} addfavloading={addfavloading} from="Favourites" />
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
