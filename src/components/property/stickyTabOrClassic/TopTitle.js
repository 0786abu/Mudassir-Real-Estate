import React, { useCallback, useEffect, useState } from "react";
import { Facebook, Instagram, Twitter } from "react-feather";
import { Container } from "reactstrap";
import { formatPK } from "@/utils/Formatter";
import { useDispatch, useSelector } from "react-redux";
import { AddToFavourites } from "@/redux-toolkit/action/favouritesAction";
//  <a
//         href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Share on Facebook
//       </a>

//       {/* Twitter */}
//       <a
//         href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=Check this out!`}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Share on Twitter
//       </a>

const TopTitle = ({ property, favourites }) => {
  const {addfavloading} = useSelector((state)=>state.Favourites)
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    const isLiked = favourites?.some(fav => fav.propertyID?._id === property?._id);
    setLike(isLiked);
  },[favourites, property?._id])
  const url = typeof window !== "undefined" && window.location.href;

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
    <div className="single-property-section">
      <Container>
        <div className="single-title">
          <div className="left-single">
            <div className="d-md-flex ">
              <span className=" d-md-none d-block mb-1">
                <span className="label label-shadow">For {property?.category}</span>
              </span>
              <h2 className="mb-0">{property?.title || "Orchard House"}</h2>
              <span className=" d-md-block d-none">
                <span className="label label-shadow ms-2">For {property?.category}</span>
              </span>
            </div>
            <p className="mt-1">{property?.address}</p>
            <ul>
              <li>
                <div>
                  <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                  <span>{property?.beds || 4} Bedrooms</span>
                </div>
              </li>
              <li>
                <div>
                  <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                  <span>{property?.baths || 4} Bathrooms</span>
                </div>
              </li>
              <li>
                <div>
                  <img src="/assets/images/svg/icon/sofa.svg" className="img-fluid" alt="" />
                  <span>{property?.rooms || 4} {property?.rooms===1 ? "Room" : "Rooms"}</span>
                </div>
              </li>
              <li>
                <div>
                  <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                  <span>{property?.squareFits || 5000} Sq ft</span>
                </div>
              </li>
            </ul>
            <div className="share-buttons">
              <div className="d-inline-block">
                <a className="btn btn-gradient btn-pill">
                  <i className="fas fa-share-square"></i>
                  share
                </a>
                <div className="share-hover">
                  <ul>
                    <li>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className="icon-facebook" target="_blank" rel="noreferrer">
                        <Facebook></Facebook>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" className="icon-twitter" target="_blank" rel="noreferrer">
                        <Twitter></Twitter>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank" className="icon-instagram" rel="noreferrer">
                        <Instagram></Instagram>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <button disabled={addfavloading} onClick={handleAddToFavourite} className="btn btn-dashed btn-pill ms-md-2 ms-1 save-btn">
                <i style={{color:like ? "red" : "inherit"}} className={`${like ? "fas" : "far"} fa-heart`}></i>
                {addfavloading ? "Saving..." : like ? "Saved" : "Save"}
              </button>
            </div>
          </div>
          <div className="right-single">
            <h2 className="price">
            Rs.{" "}
            {formatPK(property?.price)}
              <span>/ start From</span>
            </h2>
            <div className="feature-label">
              <span className="" style={{fontWeight:"bold"}}>Property Type: </span>
              <span className="btn btn-dashed btn-pill">{property?.type}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopTitle;
