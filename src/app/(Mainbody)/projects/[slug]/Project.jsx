"use client";

import {
  Row,
  Col,
  Badge,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { useState } from "react";
import dynamic from "next/dynamic";
import Img from "@/utils/BackgroundImageRatio";
import { mainPropertySlider } from "@/data/slickSlider";
import { Camera, Check, Grid, Home, Phone } from "react-feather";
import Image from "next/image";
import { formatPK } from "@/utils/Formatter";
import { Bath, Bed, Earth, MapPin,
  Briefcase,
  ShieldCheck,
  Layers,
  Send, } from "lucide-react";
import Link from "next/link";
import Form from "./Form";

const Slider = dynamic(() => import("react-slick"), { ssr: false });


const FeatureBlock = ({ icon, title, items, color }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="feature-block">
      <div className={`feature-icon ${color}`}>
        {icon}
      </div>

      <h5>{title}</h5>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Check size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getEmbedMapUrl = (googleMapsUrl) => {
  try {
    const match = googleMapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    if (!match) return "";

    const lat = match[1];
    const lng = match[2];

    return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
  } catch (error) {
    return "";
  }
};

export default function ProjectDetail({project}) {
  const [active, setActive] = useState(project.floorPlans[0]);
  const [open, setOpen] = useState(() => {
  if (!project?.items || project?.items.length === 0) return [];
  return [project?.items[0]?._id || project?.items[0]?._id];
});
const [detailedCount, setDetailedCount] = useState(1500)
const PaymentPlanSlider =  {
    dots: true,
    infinite: project.paymentPlans?.length > 1 ? true : false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const toggle = (id) => {
    setOpen((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleDetailedDescription = ()=>{
    if(detailedCount===project?.detailedDescription?.length){
      setDetailedCount(1500)
    }else{
      setDetailedCount(project?.detailedDescription?.length)
    }
  }

  return (
    <div className=" m-lg-5 m-md-4 m-3">
      <div className=" d-flex flex-column flex-md-row justify-content-between align-items-md-center align-content-start">
        <div className=" d-flex align-items-center gap-3 mb-3">
          <Image
          src={project?.projectLogo?.url}
          alt="project logo image"
          priority
          height={80}
          width={120}
          className=" object-fit-cover rounded-2 border"
          />
          <div className="d-flex flex-column align-items-center">
            <span>{project?.projectTitle}</span>
            <Badge className=" ms-2" color="primary">{project?.city}, {project?.location}</Badge>
          </div>
        </div>
        <div>
          <h3>{formatPK(project?.minItemPrice)}{" "}<span style={{fontSize:"11px"}}>PKR</span> to {formatPK(project?.maxItemPrice)}{" "}<span style={{fontSize:"11px"}}>PKR</span></h3>
        </div>
      </div>
      <section className="ratio_40 breadcrumb-section p-0 single-property-images-2 position-relative">
        <div style={{position:"absolute",top:"20px",right:"20px",zIndex:"100",background:"black",color:"white",padding:"6px 15px",borderRadius:"5px",display:"flex",alignItems:"center"}}>
                      <Camera />
                      <span className="ms-2">{project?.images?.length || 5}</span>
                    </div>
        <Slider className="main-property-slider arrow-image" {...mainPropertySlider}>
          {project?.images?.map((item, index) => (
            <div key={index}>
              <div>
                <Img src={item.url} className="bg-img" alt="" />
              </div>
            </div>
          ))}
        </Slider>
    </section>
    <Row className="mtt">
      {/* left-Side */}
      <Col lg="8" >
        <div className=" d-md-flex mt-lg-0 justify-content-between gap-4 ">
          <div className="d-flex align-items-center gap-2">
          <Earth style={{width:"30px",height:"30px",color:"#108a00"}}/>
          <div>
            <span style={{fontSize:"18px"}}>Offering</span>
            <div className="d-flex align-items-center flex-wrap gap-2">
              {project?.offering?.map((off,index)=>{
                return <Badge color="dark" key={index}>{off}</Badge>
              })}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Image 
          src={project?.developedBy?.logo?.url}
          alt="developer"
          width={60}
          height={60}
          className=" object-fit-cover border rounded-2 p-1"
          />
          <div className=" d-flex flex-column align-items-start">
            <span style={{fontSize:"18px"}}>Developer</span>
            <span style={{fontSize:"18px"}}>{project?.developedBy?.developer}</span>
          </div>
        </div>
        </div>
        <Accordion open={open} toggle={toggle} className="project-accordion">
      {project?.items?.map((item) => {
        const itemId = item._id || item._id; // ✅ FIXED

        return (
          <AccordionItem
            key={itemId} // ✅ UNIQUE STRING KEY
            className="project-accordion-item"
          >
            {/* HEADER */}
            <AccordionHeader
              targetId={itemId}
              className="project-accordion-header"
            >
              <div className="header-content">
                <div className="title">
                  <Home size={20} />
                  <span>{item.itemTitle}</span>
                </div>

                <strong className="price">
                  {formatPK(item.parentMinPrice)}{" "}<span style={{fontSize:"11px"}}>PKR</span> to{" "}
                  {formatPK(item.parentMaxPrice)}{" "}<span style={{fontSize:"11px"}}>PKR</span>
                </strong>
              </div>
            </AccordionHeader>

            {/* BODY */}
            <AccordionBody accordionId={itemId}>
              <div className="accordion-body-wrapper">
                {item.subItems?.map((sub) => {
                  const subId = sub._id || sub._id;

                  return (
                    <div key={subId} className="subitem-card">
                      <div className="subitem-top">
                        <h6>{sub.subItemTitle}</h6>
                        <Badge color="success">
                          {formatPK(sub.minPrice)}{" "}<span style={{fontSize:"9px"}}>PKR</span>  to{" "}
                          {formatPK(sub.maxPrice)}{" "}<span style={{fontSize:"9px"}}>PKR</span>
                        </Badge>
                      </div>

                      <div className="subitem-features">
                        <div className="feature">
                          <Grid size={20} />
                            <span>areaSize: {sub.areaSize}</span>
                        </div>

                        <div className="feature">
                          <Bed size={20} />
                          <span>Beds: {sub.beds ?? "–"}</span>
                        </div>

                        <div className="feature">
                          <Bath size={20} />
                            <span>Baths: {sub.bathrooms ?? "–"}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </AccordionItem>
        );
      })}
    </Accordion>
     <Row className="my-5">
        <Col>
          <div
            dangerouslySetInnerHTML={{ __html: project.detailedDescription.slice(0,detailedCount) }}
          />
          <span onClick={handleDetailedDescription} className=" text-info" style={{cursor:"pointer"}}>{project?.detailedDescription?.length===detailedCount ? "Show less" : "Show more"}</span>
        </Col>
      </Row>
      <div className="project-features">
      <FeatureBlock
        icon={<Layers />}
        title="Plot Features"
        items={project?.features.plotFeatures}
        color="green"
      />

      <FeatureBlock
        icon={<Home />}
        title="Family & Lifestyle"
        items={project?.features.forFamily_Lifestyle}
        color="blue"
      />

      <FeatureBlock
        icon={<Briefcase />}
        title="Business & Communication"
        items={project?.features.forWork_Connectivity}
        color="red"
      />

      <FeatureBlock
        icon={<ShieldCheck />}
        title="Safety & Maintenance"
        items={project?.features.forSafety_Maintenance}
        color="purple"
      />

      <FeatureBlock
        icon={<MapPin />}
        title="Nearby Facilities"
        items={project?.features.others}
        color="gray"
      />
    </div>
     <Row className="my-5">
        <Col>
          <h3 className="mb-3">Location Map</h3>
         <GoogleMapEmbed
  mapUrl={project.map}
/>

        </Col>
      </Row>
      
      </Col>
      {/* right-Side */}
      <Col lg="4">
      <div className="position-sticky" style={{top:"20px"}}>
        <Form projectOwnerPhone={project.projectOwnerPhone} projectID={project?._id}/>
      </div>
      </Col>
    </Row>
    {project.floorPlans?.length>0 && (
      <div className="fp-wrapper mt-4">
      <h2 className="fp-title">Floor Plans</h2>

      <div className="fp-card">
        {/* TOP TABS */}
        <div className="fp-tabs">
          {project.floorPlans.map((item) => (
            <button
              key={item._id}
              className={`fp-tab ${
                active._id === item._id ? "active" : ""
              }`}
              onClick={() => setActive(item)}
            >
              {item.floorName}
            </button>
          ))}
        </div>

        {/* IMAGE */}
        <div className="fp-image">
          <img src={active.floorImage.url} alt={active.floorName} />
        </div>
      </div>
    </div>
    )}

    <div className="payment-section">
      <h2 className="section-title">Payment Plan</h2>

      <Slider {...PaymentPlanSlider}>
        {project.paymentPlans.map((plan, index) => (
          <div key={index} className="plan-card">
            <div className="image-wrapper">
              <img src={plan.paymentImage.url} alt={plan.paymentName} />
            </div>
            <h3 className="plan-title">{plan.paymentName}</h3>
          </div>
        ))}
      </Slider>
    </div>

    <section className="stakeholders-wrapper">
      <StakeholderCard
        title="Marketed By"
        logo={project.marketingBy.logo.url}
        name={project.marketingBy.platform}
        description={project.marketingBy.description}
      />

      <StakeholderCard
        title="Developed By"
        logo={project.developedBy.logo.url}
        name={project.developedBy.developer}
        description={project.developedBy.description}
      />
    </section>

    </div>
  );
}

const StakeholderCard = ({ title, logo, name, description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="stakeholder-card">
      <h3 className="stakeholder-title">{title}</h3>

      <div className="stakeholder-body">
        {/* LOGO */}
        <div className="stakeholder-logo-box">
          <Image
            src={logo}
            alt={name}
            width={90}
            height={90}
            className="stakeholder-logo"
          />
        </div>

        {/* CONTENT */}
        <div className="stakeholder-content">
          <h4 className="stakeholder-name">{name}</h4>

          <p
            className={`stakeholder-description ${
              expanded ? "stakeholder-description--expanded" : ""
            }`}
          >
            {description}
          </p>

          <button
            className="stakeholder-show-more"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </div>
  );
};
const GoogleMapEmbed = ({ mapUrl }) => {
  const embedUrl = getEmbedMapUrl(mapUrl);

  if (!embedUrl) return <p>Invalid Google Maps link</p>;

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: "12px" }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};
