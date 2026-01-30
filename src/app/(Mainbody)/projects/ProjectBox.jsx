            
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

        <div className="labels-left" style={{top:"20px"}}>
          <PropertyLabel labels={data.type} />
        </div>
        {data.isSponsored && (
          <div className="labels-left" style={{top:"50px"}}>
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
          <h3>{data.projectTitle}</h3>
        </Link>

        <h6 style={{fontSize:"13px"}}>
          PKR {" "}
          {formatPK(data.minItemPrice)} - {formatPK(data.maxItemPrice)}
        </h6>

          <span className="font-roboto d-block">{data.location} </span>
          <div className="d-flex my-3 align-items-center gap-2 flex-wrap">
            <span>Offers: </span>
            <div className=" d-flex gap-2 flex-wrap">
            {data.offering.slice(0,4).map((offer,index)=>{
                return <Badge key={index}>{offer}</Badge>
            })}
          </div>
          </div>
          <div className="d-flex gap-2 my-2">
            <Link href={`tel:${data.projectOwnerPhone}`}><Button size="sm" onMouseEnter={()=>setCallHover(true)} onMouseLeave={()=>setCallHover(false)} style={{background:callHover ? "#108a00" : "#14A800"}}><span><Phone/></span> <span>Call</span></Button></Link>
            <Link href={`${data.projectOwnerWhatsappAPI}`}><Button size="sm" onMouseEnter={()=>setWhatsAppHover(true)} onMouseLeave={()=>setWhatsAppHover(false)} style={{background:WhatsAppHover ? "#108a00" : "#14A800"}}><BsWhatsapp size={22}/></Button></Link>
          </div>
        <div className="property-btn d-flex">
          <span>{formatDatenew(data.createdAt)}</span>
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