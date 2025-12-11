/**
 * It returns a div with a class of property-box, which contains a div with a class of property-image,
 * which contains an ImageSlider component, which contains an array of images, which are passed in as a
 * prop
 * @returns A React component.
 */
"use client"
import Link from "next/link";
import { Camera } from "react-feather";
// import ImageSlider from "../ImageSlider";
import PropertyLabel from "../PropertyLabel";
// import ThumbnailSlider from "../ThumbnailSlider";
import AddToCompareProducts from "../AddToCompareProducts";
import AddToWhishList from "../AddToWhishList";
import { formatPK } from "@/utils/Formatter";
import dynamic from "next/dynamic";

const ImageSlider = dynamic(() => import("../ImageSlider"));
export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }


const PropertyBox = ({ data }) => {

  return (
    <div className="property-box">
      <div className="property-image" style={{ position: "relative" }}>
        {/* {relativeSlider ? (
          <ThumbnailSlider images={data.images} videoData={data.video} />
        ) : ( */}
          <ImageSlider images={data.images} />
        {/* )} */}

        <div className="labels-left">
          <PropertyLabel labels={data.type} />
        </div>

            <div className="seen-data">
              <Camera />
              <span>{data.images?.length || 5}</span>
            </div>
            <div className="overlay-property-box">
              <a className="effect-round" title="Compare">
                <AddToCompareProducts id={data._id} />
              </a>
              <a className="effect-round like" title="wishlist">
                <AddToWhishList id={data._id} />
              </a>
            </div>
      </div>

      <div className="property-details">
        <span className="font-roboto">{data.location} </span>

        <Link href={`/properties/${data.slug}`}>
          <h3>{data.title}</h3>
        </Link>

        <h6>
          Rs. {" "}
          {formatPK(data.price)}
        </h6>

        <p className="font-roboto">
          {data.details ||
            "This home provides wonderful entertaining spaces with a chef kitchen opening..."}
        </p>

        <ul>
          <li>Bed: {data.beds || 5}</li>
          <li>Bath: {data.baths || 5}</li>
          <li>Sq Ft: {data.squareFits || 5}</li>
        </ul>

        <div className="property-btn d-flex">
          <span>{formatDatenew(data.createdAt)}</span>
          <Link href={`/properties/${data.slug}`}>
            <button className="btn btn-dashed btn-pill">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyBox;