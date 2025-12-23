
import Link from "next/link";
import React from "react";
import { Camera, Heart } from "react-feather";
import ImageSlider from "../../myproperties/ImageSlider";
import AddToCompareProducts from "./AddToCompareProducts";
import PropertyLabel from "./PropertyLabel";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatPK } from "@/utils/Formatter";


export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

const PropertyBox = ({ data }) => {
    const symbol = '$';
    const currencyValue = 1
    const router = useRouter();
    const NavigateFavourit = () => {
        toast.success('Add Favourites Successful..');
        router.push('/myproperties/favourites')
    }

    return (
        <>
            <div className="property-box">
                <div className="property-image">
                    <ImageSlider images={data.images} />
                    <div className="labels-left">
                        <PropertyLabel labels={data.label} />
                    </div>
                    <div className="seen-data">
                        <Camera />
                        <span>{data?.images?.length || 5}</span>
                    </div>
                    <div className="overlay-property-box">
                        <div className="effect-round like" onClick={() => { NavigateFavourit() }} title="wishlist">
                            <Heart />
                        </div>
                    </div>
                </div>
                <div className="property-details">
                    <span className="font-roboto">{data.location} </span>
                    <Link href={`/properties/${data.slug}`}>
                        <h3>{data.title}</h3>
                    </Link>
                    <h6>
                        Rs. 
                        {formatPK(data.price)}
                    </h6>
                    <p className="font-roboto">{data.details || "This home provides wonderful entertaining spaces with a chef kitchen opening. Elegant retreat in a quiet Coral Gables setting.."} </p>
                    <ul>
                        <li>
                            <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                            Bed : {data.beds || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                            Baths : {data.baths || 5}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                            Sq Ft : {data.squareFits || 5}
                        </li>
                    </ul>
                    <div className="property-btn d-flex">
                        <span>{formatDatenew(data.createdAt)}</span>
                            <button type="button" className="btn btn-dashed btn-pill">
                                Details
                            </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyBox;
