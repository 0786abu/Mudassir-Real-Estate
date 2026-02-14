            
/**
 * It returns a div with a class of property-box, which contains a div with a class of property-image,
 * which contains an ImageSlider component, which contains an array of images, which are passed in as a
 * prop
 * @returns A React component.
 */
"use client"
import Link from "next/link";
import { Camera, Phone } from "react-feather";
import { formatPK } from "@/utils/Formatter";
import dynamic from "next/dynamic";
import { useState } from "react";
import PropertyLabel from "@/components/elements/PropertyLabel";
import { Badge, Button } from "reactstrap";
import { BsWhatsapp } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";
const ImageSlider = dynamic(() => import("../../../components/elements/ImageSlider"),{ssr:false});

export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }


const Projectbox = ({ data, from }) => {
  const [isHover, setIsHover] = useState(false);
  const [callHover, setCallHover] = useState(false);
  const [WhatsAppHover, setWhatsAppHover] = useState(false);
  return (
    <>
      <div className="property-box my-5">
      <div className="property-image" style={{ position: "relative" }}>
          <ImageSlider images={data.images} />

        <div className="labels-left">
          <PropertyLabel labels={data.type} />
        </div>
        {data.isSponsored && (
          <div className="labels-left-sp">
          <span className={`label text-bg-warning`}>Sponsored</span>
        </div>
        )}

              <div className="seen-data">
              <Camera />
              <span>{data.images?.length || 5}</span>
            </div>
      </div>

      <div className="property-details" style={{width:"100%"}}>

        <Link href={`/properties/${data.slug}`} className="property-card-title">
          <h3 style={{fontSize:"18px"}}>{data.projectTitle}</h3>
        </Link>

        <h6 style={{fontSize:"16px"}}>
          {formatPK(data.minItemPrice)}{" "}<span style={{fontSize:"10px"}}>PKR</span> - {formatPK(data.maxItemPrice)}{" "}<span style={{fontSize:"10px"}}>PKR</span>
        </h6>

          <span className="font-roboto d-block">{data.location} </span>
          {data.offering?.length > 0 && (
            <div className="d-flex my-3 align-items-center gap-2 flex-wrap">
            <span>Offers: </span>
            <div className=" d-flex gap-2 flex-wrap">
            {data.offering.slice(0,4).map((offer,index)=>{
                return <Badge key={index} color="dark">{offer}</Badge>
            })}
          </div>
          </div>
          )}
          <div className="d-flex gap-2 my-2">
            <Link href={`${data.projectOwnerWhatsappAPI}`}><button className="listing-social-icon-group"><BsWhatsapp size={22} className="sub-listing-icon"/></button></Link>
            <Link href={`tel:${data.projectOwnerPhone}`}><button className="listing-social-icon-group"><span className="sub-listing-span"><Phone size={22} className="sub-listing-icon"/> Call</span></button></Link>
          </div>
        <div className="property-btn d-flex">
          <span style={{fontSize:"11px"}}>{formatDistanceToNowStrict(new Date(data.createdAt), { addSuffix: true })}</span>
        <Link href={`${from==="admin" ? `/admin/dashboard/allProjects/${data.slug}` : `/projects/${data.slug}`}`}>
          <button onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style={{
              background:isHover ? "#14A800" : "",
              color:isHover ? "white" : "black"
            }} className="btn rounded-pill border border-1">{from==="admin" ? "View Detail" : "Details"}</button>
        </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Projectbox;