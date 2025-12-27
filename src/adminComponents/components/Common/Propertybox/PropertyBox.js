import React, { useState } from "react";
import { Camera, Heart, Trash } from "react-feather";
import ImageSlider from "../../myproperties/ImageSlider";
import { useRouter } from "next/navigation";
import { formatPK } from "@/utils/Formatter";
import { RemoveFavouriteProperty } from "@/redux-toolkit/action/favouritesAction";
import { useDispatch, useSelector } from "react-redux";


export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

const PropertyBox = ({ data }) => {
    const {addfavloading} = useSelector((state)=>state.Favourites);
    const router = useRouter();
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);
    const [itemID, setItemID] = useState("");
    const handlePush = (slug)=>{
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/properties/${slug}`)
    }
    const handleRemoveFav = ()=>{
        setItemID(data?._id)
        dispatch(RemoveFavouriteProperty({id:data?._id}))
      }
    return (
        <>
            <div className="property-box">
                <div className="property-image position-relative">
                    <ImageSlider images={data.propertyID.images} />
                    <div className="seen-data">
                        <Camera />
                        <span>{data?.propertyID?.images?.length || 5}</span>
                    </div>
                    <div className="seen-category">
                        <span>{data?.propertyID?.type}</span>
                    </div>
                    <div className="overlay-property-box">
                        <div className="effect-round like" title="wishlist">
                            {addfavloading && itemID===data._id ? (
                                <div className="spinner-border" style={{width:"25px",height:"25px"}} role="status">
</div>
                            ) : <Trash onClick={handleRemoveFav}/>}
                        </div>
                    </div>
                </div>
                <div className="property-details">
                    <span className="font-roboto">{data.propertyID.location} </span>
                        <h3 style={{cursor:"pointer"}} onClick={()=>handlePush(data.propertyID.slug)}>{data.propertyID.title}</h3>
                    <h6>
                        Rs. 
                        {formatPK(data.propertyID.price)}
                    </h6>
                    <p className="font-roboto">{data.details || "This home provides wonderful entertaining spaces with a chef kitchen opening. Elegant retreat in a quiet Coral Gables setting.."} </p>
                    <ul>
                        <li>
                            <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                            Bed : {data.propertyID.beds || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                            Baths : {data.propertyID.baths || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                            Sq Ft : {data.propertyID.squareFits || 5}
                        </li>
                    </ul>
                    <div className="property-btn d-flex">
                        <span>{formatDatenew(data.createdAt)}</span>
                            <button
          onClick={()=>handlePush(data.propertyID.slug)}
          className="btn rounded-pill border border-1"
           onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style={{
              background:isHover ? "#14A800" : "",
              color:isHover ? "white" : "black"
            }}
        >
          View Details
        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyBox;
