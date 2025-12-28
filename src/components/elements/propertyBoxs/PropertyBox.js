            
/**
 * It returns a div with a class of property-box, which contains a div with a class of property-image,
 * which contains an ImageSlider component, which contains an array of images, which are passed in as a
 * prop
 * @returns A React component.
 */
"use client"
import Link from "next/link";
import { Camera, Edit, Trash } from "react-feather";
import PropertyLabel from "../PropertyLabel";
// import AddToCompareProducts from "../AddToCompareProducts";
import { formatPK } from "@/utils/Formatter";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFavouriteProperty } from "@/redux-toolkit/action/favouritesAction";
import { useState } from "react";
import { SendPropertyDataToMyProperty } from "@/redux-toolkit/action/propertyAction";
import AddToWhishList from "../AddToWhishList";
import { setSelectedSlug } from "@/redux-toolkit/slice/propertySlice";
import { useRouter } from "next/navigation";

const ImageSlider = dynamic(() => import("../ImageSlider"),{ssr:false});

export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }


const PropertyBox = ({ data,from,fromPanel,setActiveTab, fromTo }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {addfavloading,favProperties} = useSelector((state)=>state.Favourites);
  const [itemID, setItemID] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  
  const handleRemoveFav = (id)=>{
    setItemID(id)
    dispatch(RemoveFavouriteProperty({id:data?._id}))
  }
   const handleViewDetails = () => {
    if (fromPanel) {
      setActiveTab("propertyDetail");
      dispatch(setSelectedSlug(data.slug))
    }
  };
  const handleAdminViewDetail = ()=>{
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard/allProperties/${data.slug}`)
  }
   const handleEditProperty = () => {
    if (fromPanel) {
      setActiveTab("editProperty");
      dispatch(setSelectedSlug(data.slug))
    }
  };
   const handleAdminEditProperty = () => {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard/allProperties/${data.slug}/edit`)
  };

  return (
    <>
    {data?.propertyID  ? (
      <div className="property-box" style={{position:"relative"}}>
        {from==="Favourites" && (
          <div className="trash-icon" style={{position:"absolute", top:"4px", zIndex:"100", right:"4px",padding:"10px",borderRadius:"50%"}}>
          {(addfavloading && itemID === data._id) ? (
            <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
          ) : (
            <span>
              <Trash />
            </span>
          )}
        </div>
        )}
      <div className="property-image" style={{ position: "relative" }}>
        {/* {relativeSlider ? (
          <ThumbnailSlider images={data.images} videoData={data.video} />
        ) : ( */}
          <ImageSlider images={data.propertyID.images} />
        {/* )} */}

        <div className="labels-left">
          <PropertyLabel labels={data.propertyID.type} />
        </div>
        

            <div className="seen-data">
              <Camera />
              <span>{data.propertyID.images?.length || 5}</span>
            </div>
      </div>

      <div className="property-details">
        <span className="font-roboto">{data.propertyID.location} </span>

        <Link href={`/properties/${data.propertyID.slug}`}>
          <h3 >{data.propertyID.title}</h3>
        </Link>

        <h6>
          Rs. {" "}
          {formatPK(data.propertyID.price)}
        </h6>

        <p className="font-roboto">
          {data.propertyID.details ||
            "This home provides wonderful entertaining spaces with a chef kitchen opening..."}
        </p>

        <ul>
          <li>Bed: {data.propertyID.beds || 5}</li>
          <li>Bath: {data.propertyID.baths || 5}</li>
          <li>Sq Ft: {data.propertyID.squareFits || 5}</li>
        </ul>

        <div className="property-btn d-flex">
          <span>{formatDatenew(data.propertyID.createdAt)}</span>
          <Link href={`/properties/${data.propertyID.slug}`}>
            <button onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style={{
              background:isHover ? "#14A800" : "",
              color:isHover ? "#108A00" : ""
            }} className="btn rounded-pill border border-1">Details</button>
          </Link>
        </div>
      </div>
    </div>
    ) : (
      <div className="property-box">
      <div className="property-image" style={{ position: "relative" }}>
        {/* {relativeSlider ? (
          <ThumbnailSlider images={data.images} videoData={data.video} />
        ) : ( */}
          <ImageSlider images={data.images} />
        {/* )} */}

        <div className="labels-left" style={{top:"20px"}}>
          <PropertyLabel labels={data.type} />
        </div>
        {(fromPanel==="user-panel") && (
          <div className="labels-left" style={{top:"50px"}}>
          <span className={`label text-bg-${data.isApproved==="Approved" ? "success": data.isApproved==="No Approved" ? "danger" : "warning"}`}>{data.isApproved}</span>
        </div>
        )}
        {(fromPanel==="user-panel" && data.isFree) && (
          <div className="labels-left" style={{top:"80px"}}>
          <span className={`label label-success`}>{data.isFree ? "Free" : "No Free"}</span>
        </div>
        )}
        {(fromPanel==="user-panel" && !data.isFree)  && (
          <div className="labels-left" style={{top:"110px"}}>
          <span className={`label label-${data.isPaid ? "success" : "danger"}`}>{data.isPaid ? "Paid" : "No Paid"}</span>
        </div>
        )}
        {(fromPanel==="user-panel" && data.isFeatured) && (
          <div className="labels-left" style={{top:"140px"}}>
          <span className={`label label-success`}>{"Featured Property"}</span>
        </div>
        )}
        {(fromPanel==="user-panel" || (from==="admin" && fromTo==="myListing")) && (
          <div onClick={from==="admin" ? handleAdminEditProperty : handleEditProperty} className="labels-right" style={{top:"20px"}}>
          <span className={`label label-success`}><Edit/></span>
        </div>
        )}

            {!fromPanel && (
              <div className="seen-data">
              <Camera />
              <span>{data.images?.length || 5}</span>
            </div>
            )}
            <div className="overlay-property-box">
              {/* <a className="effect-round" title="Compare">
                <AddToCompareProducts id={data._id} />
              </a> */}
              <a className="effect-round like" title="wishlist">
                <AddToWhishList property={data} loading={addfavloading} favourites={favProperties} />
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
          {data.beds>0 && (
            <li>Bed: {data.beds || 5}</li>
          )}
          {data.baths>0 && (
            <li>Bath: {data.baths || 5}</li>
          )}
          <li>Sq Ft: {data.squareFits || 5}</li>
        </ul>

        <div className="property-btn d-flex">
          <span>{formatDatenew(data.createdAt)}</span>
           {fromPanel ? (
        <button
          onClick={from==="admin" ? handleAdminViewDetail : handleViewDetails}
          className="btn rounded-pill border border-1"
           onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style={{
              background:isHover ? "#14A800" : "",
              color:isHover ? "white" : "black"
            }}
        >
          View Details
        </button>
      ) : from==="admin" ? (
        <Link href={`/admin/dashboard/allProperties/${data.slug}`}>
          <button onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style={{
              background:isHover ? "#14A800" : "",
              color:isHover ? "white" : "black"
            }} className="btn rounded-pill border border-1">Details</button>
        </Link>
      ) : (
        <Link href={`/properties/${data.slug}`}>
          <button onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style={{
              background:isHover ? "#14A800" : "",
              color:isHover ? "white" : "black"
            }} className="btn rounded-pill border border-1">Details</button>
        </Link>
      )}
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default PropertyBox;