"use client";
import ProfileLoader from "@/components/common/Loader";
import { AdminFetchProject, AdminProjectFeaturedToggle, AdminProjectSponsoredToggle, DeleteFloorPlan, DeletePaymentPlan } from "@/redux-toolkit/action/projectAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Table,
  Button
} from "reactstrap";
import Inventory from "./Inventory";
import { Edit, Trash } from "lucide-react";
import { formatPK } from "@/utils/Formatter";
import FloorPlansModal from "./FloorPlan";
import PaymentPlans from "./paymentPlan";
import Slider from "react-slick";
import { Camera } from "react-feather";
import Link from "next/link";
import DevelopedBy from "./DevelopedBy";
import MarketingBy from "./MarketingBy";

export default function AdminProjectDetail({ slug }) {
    const {project,projectloading,updateItemsloading,delfloorplanloading,delpaymentplanloading,toggleloading,devplatloading} = useSelector((state)=>state.Project);
     const [active, setActive] = useState({});
     const [paymentID, setPaymentID] = useState("");
     const [open,setOpen] = useState(false);
     const [open1,setOpen1] = useState(false);
     const [toggleState, setToggleState] = useState("");
     const toggle = ()=>setOpen(!open)
     const toggle1 = ()=>setOpen1(!open1)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(AdminFetchProject(slug));
    },[dispatch])

    const settings = {
    dots: true,
    infinite: project?.images?.length>1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
    useEffect(()=>{
      if(project){
        setActive(project?.floorPlans[0])
      }
    },[project])
   
    const handleDeleteFloorPlan = (floor)=>{
      dispatch(DeleteFloorPlan(slug,setActive,floor,project?.floorPlans))
    }
    const handleDeletePaymentPlan = (payment)=>{
      setPaymentID(payment)
      dispatch(DeletePaymentPlan(slug,payment))
    }
    const handleFeaturedToggle = ()=>{
      setToggleState("featured");
      dispatch(AdminProjectFeaturedToggle(slug))
    }
    const handleSponsoredToggle = ()=>{
      setToggleState("sponsored");
      dispatch(AdminProjectSponsoredToggle(slug))
    }
  return (
   <>
    {projectloading ? <ProfileLoader/> : (
         <Container fluid className="py-4">

      {/* HEADER */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold">{project?.projectTitle}</h2>
          <p className="text-muted mb-0">
            {project?.location}, {project?.city}
          </p>
        </Col>
        <Col className="text-end">
          {project?.isFeatured && (
            <Badge color="primary" className="me-2">Featured</Badge>
          )}
          {project?.isSponsored && (
            <Badge color="success">Sponsored</Badge>
          )}
        </Col>
      </Row>

      {/* PROJECT MEDIA */}
      <Card className="mb-4 shadow-sm">
        <CardHeader className="fw- d-flex justify-content-between align-items-center gap-2">
          <h4>Project Media</h4>
          <div className="d-flex align-items-center gap-2">
            <Link target="_blank" size="sm" href={`/admin/dashboard/allProjects/${project?.slug}/edit`}><Button outline><Edit/></Button></Link>
            <Link target="_blank" size="sm" href={`/projects/${project?.slug}`}><Button outline>View on Public</Button></Link>
          </div>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <img
            src={project?.projectLogo?.url}
            alt="logo"
            height="70"
            className="mb-3"
          />
          <span><Camera/> {project?.images?.length}</span>
          </div>

          <Card className="border-0 overflow-hidden rounded-3">
      <Slider {...settings}>
        {project?.images?.map((img, index) => (
          <div key={img._id || index}>
            <img
              src={img.url}
              alt={`Project Banner ${index + 1}`}
              className="img-fluid w-100"
              style={{
                height: "420px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>
    </Card>
        </CardBody>
      </Card>

      {/* BASIC INFO */}
      <Card className="mb-4 shadow-sm">
        <CardHeader className="fw-semibold">Basic Information</CardHeader>
        <CardBody>
          <Table bordered responsive>
            <tbody>
              <tr>
                <th>Type</th>
                <td>{project?.type}</td>
              </tr>
              <tr>
                <th>Price Range</th>
                <td>
                  PKR {formatPK(project?.minItemPrice)} –{" "}
                  {formatPK(project?.maxItemPrice)}
                </td>
              </tr>
              <tr>
                <th>Offerings</th>
                <td>{project?.offering?.join(", ")}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Card className="mb-4 shadow-sm">
        <CardHeader className="fw-semibold">Toggle Section</CardHeader>
        <CardBody>
          <div className=" d-md-flex align-items-center gap-4">
            <Button style={{width:"100%"}} onClick={handleFeaturedToggle} color={project?.isFeatured===true ? "danger" : "success"}>{toggleloading && toggleState==="featured" && <span className=" spinner-border" role="status" style={{width:"16px",height:"16px"}}></span>}{" "}{project?.isFeatured===true ? "Mark as unFeatured" : "Mark as featured"}</Button>
            <Button style={{width:"100%"}} onClick={handleSponsoredToggle} color={project?.isSponsored===true ? "danger" : "success"}>{toggleloading && toggleState==="sponsored" && <span className=" spinner-border" role="status" style={{width:"16px",height:"16px"}}></span>}{" "}{project?.isSponsored===true ? "Mark as unSponsored" : "Mark as sponsored"}</Button>
          </div>
        </CardBody>
      </Card>

      {/* DEVELOPER */}
      <DevelopedBy developedBy={project?.developedBy} slug={slug} loading={devplatloading} />

      {/* MARKETING */}
     <MarketingBy marketingBy={project?.marketingBy} slug={slug} loading={devplatloading}/>

      {/* INVENTORY */}
      <Inventory mainItems={project?.items} slug={slug} loader={updateItemsloading}/>

      {/* FLOOR PLANS (LAST SECTION) */}
      {/* <Card className="mb-4 shadow-sm">
        <CardHeader className="fw-semibold">Floor Plans</CardHeader>
        <CardBody>
          <Row>
            {project?.floorPlans.map((f, i) => (
              <Col md="6" key={i} className="mb-3">
                <h6 className="fw-semibold">{f.floorName}</h6>
                <img
                  src={f.image}
                  className="img-fluid rounded border"
                />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card> */}
          <FloorPlansModal isOpen={open} toggle={toggle} slug={slug} loading={updateItemsloading}/>
      {project?.floorPlans?.length>0 && (
      <div className="fp-wrapper mt-4">
      <div className="d-flex justify-content-between align-items-center gap-2">
        <h2 className="fp-title">Floor Plans</h2>
        <Button color="success" onClick={toggle} size="sm">Add Floor Plans</Button>
      </div>

      <div className="fp-card">
        {/* TOP TABS */}
        <div className="fp-tabs">
          {project?.floorPlans?.map((item) => (
            <button
              key={item._id}
              className={`fp-tab ${
                active?._id === item._id ? "active" : ""
              }`}
              onClick={() => setActive(item)}
            >
              {item.floorName}
            </button>
          ))}
        </div>

        {/* IMAGE */}
        <div className="fp-image position-relative">
          <button disabled={delfloorplanloading} style={{position:"absolute",top:"8px",right:"8px"}} className=" rounded-circle bg-transparent border-0" onClick={()=>handleDeleteFloorPlan(active.floorImage.public_id)}>{delfloorplanloading ? <span className="spinner-border text-white" role="status"></span> : <Trash style={{background:"red",color:"white",width:"36px",height:"36px"}} className="p-2 rounded-circle"/>}</button>
          <img src={active?.floorImage?.url} alt={active?.floorName} />
        </div>
      </div>
    </div>
    )}

      {/* PAYMENT PLANS (LAST SECTION) */}
      <PaymentPlans open={open1} toggle={toggle1} slug={slug} loading={updateItemsloading}/>
      <Card className="shadow-sm">
        <CardHeader className="fw-semibold d-flex justify-content-between align-items-center gap-2">
          <h3>Payment Plans</h3>
          <Button onClick={toggle1} color="success" size="sm">Add payment plans</Button>
        </CardHeader>
        <CardBody>
          <Row>
            {project?.paymentPlans?.map((p, i) => (
              <Col md="4" key={i} className="mb-3">
                <Card className="border">
                  <CardBody className=" text-center position-relative">
                 <button disabled={delpaymentplanloading} style={{position:"absolute",top:"8px",right:"8px"}} className=" rounded-circle bg-transparent border-0" onClick={()=>handleDeletePaymentPlan(p.paymentImage.public_id)}>{delpaymentplanloading && paymentID === p.paymentImage.public_id ? <span className="spinner-border text-black" role="status"></span> : <Trash style={{background:"red",color:"white",width:"36px",height:"36px"}} className="p-2 rounded-circle"/>}</button>
                    <h6 className="fw-semibold">{p.paymentName}</h6>
                    <img
                      src={p.paymentImage.url}
                      className="img-fluid rounded"
                    />
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>

    </Container>
    )}
   </>
  );
}
