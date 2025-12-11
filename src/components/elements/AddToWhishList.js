import { AddToFavourites } from "@/redux-toolkit/action/favouritesAction";
import { Fragment, useState } from "react";
import { Heart } from "react-feather";
import { useDispatch } from "react-redux";

const AddToWhishList = ({ property,loading,favourites }) => {
  const dispatch = useDispatch();
  const [addedID, setAddedID] = useState("");
  const isLiked = favourites?.some((item)=>item.propertyID._id === property._id)

  const handleAddToFavourite = (id) => {
    setAddedID(id)
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
      {(loading && addedID === property?._id) ? (
        <div className="spinner-border h-50 w-50" role="status">
  <span className="sr-only">Loading...</span>
</div>
      ) : (
        <Heart
        onClick={()=>handleAddToFavourite(property?._id)}
        fill={isLiked ? "red" : "none"}
        stroke={isLiked ? undefined : "black"}
        style={{ cursor: "pointer" }}
      />
      )}
    </Fragment>
  );
};

export default AddToWhishList;
