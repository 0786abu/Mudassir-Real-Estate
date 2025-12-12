import { AddToFavourites } from "@/redux-toolkit/action/favouritesAction";
import { Fragment, useState } from "react";
import { Heart } from "react-feather";
import { useDispatch } from "react-redux";

const AddToWhishList = ({ property,loading,favourites }) => {
  const dispatch = useDispatch();
  const isLiked = favourites?.some((item)=>item.propertyID._id === property._id);

  const handleAddToFavourite = () => {
        const favData = {
          propertyID: {
            _id: property?._id,
            title: property?.title,
            slug: property?.slug,
            price: property?.price,
            location: property?.location,
            images: property?.images,
            description: property?.description,
            category: property?.category,
            type: property?.type,
            beds: property?.beds,
            baths: property?.baths,
            squareFits: property?.squareFits,
            city: property?.city,
          }
        }
        dispatch(AddToFavourites(favData))
      }

  return (
    <Fragment>
        <button onClick={handleAddToFavourite} disabled={loading} style={{background:"transparent",border:"none"}}>
          <Heart
        style={{cursor:loading ? "not-allowed" : "pointer"}}
        
        fill={isLiked ? "red" : "none"}
        stroke={isLiked ? undefined : "black"}
      />
        </button>
    </Fragment>
  );
};

export default AddToWhishList;
