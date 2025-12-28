"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AdminFetchSingleProeprty, ApprovedToggle, FeaturedToggle, UploadMoreImages, RemovePropertyImage, AdminDeleteProperty } from "@/redux-toolkit/action/adminAction";
import ProfileLoader from "../common/Loader";
import { Plus, Trash } from "react-feather";
import { useRouter } from "next/navigation";
import { UpdateFloorPlanImage } from "@/redux-toolkit/action/propertyAction";

const AdminPropertyDetail = ({slug}) => {
    const {propertyloading,singleProperty,featuredloading,approvedloading,delpropertyloading} = useSelector((state)=>state.Admin);
    const {sampleuser} = useSelector((state)=>state.Auth);
    const {removepropertyimageloading,createpropertyloading} = useSelector((state)=>state.Property);
    const dispatch = useDispatch();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [publicID, setPublicID] = useState("")
    const [modal, setModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [images, setImages] = useState([])
    const toggleFeatured = ()=>{
        dispatch(FeaturedToggle(singleProperty?.slug))
    }
    const [floorPlanImage, setFloorPlanImage] = useState(null);
    const [reason, setReason] = useState("");
     const fileInputRef = useRef(null);
     const floorfileInputRef = useRef(null);
     const floorfileInputRef2 = useRef(null);
    const handleRemoveImage = (public_id)=>{
        setPublicID(public_id)
        const slug = singleProperty?.slug
        dispatch(RemovePropertyImage({public_id,slug,setPublicID,setCurrentImageIndex}))
      }
    const handleChange = (e)=>{
        const status = e.target.value;
        dispatch(ApprovedToggle(slug,status))
    }
    const handleFloorChange = (e)=>{
      const file = e.target.files[0];
      setFloorPlanImage(file);
    }
    const handleClick = () => {
    fileInputRef.current.click();
  };
    const handlefloorClick = () => {
    floorfileInputRef.current.click();
  };
    const handlefloorClick2 = () => {
    floorfileInputRef2.current.click();
  };
  const handleUploadFloorPlanImage = ()=>{
      const formData = new FormData();
      formData.append("floorPlanImage", floorPlanImage);
      dispatch(UpdateFloorPlanImage({formData,slug:singleProperty?.slug,setFloorPlanImage,from:"admin"}))
    }
    const handleFileChange = (e) => {
    const files = e.target.files;
    setImages(files);
    setModal(true)
  };
  const router = useRouter();
  const handleUpload = ()=>{
      const formData = new FormData();
      if (images && images.length > 0) {
    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });
  }
    dispatch(UploadMoreImages(formData,singleProperty?.slug,toggle))
    }
  const toggle = () => {
    setModal(!modal);
    setImages([])
  }
  const delToggle = () => {
    setDelModal(!delModal);
  }
  const handleDeleteProperty = ()=>{
    dispatch(AdminDeleteProperty(slug,reason,router,setDelModal))
  }
    
    useEffect(()=>{
        dispatch(AdminFetchSingleProeprty(slug))
    },[dispatch,slug])
  return (
    <>
     <Modal isOpen={modal} toggle={toggle} centered size="lg">
            <ModalHeader toggle={toggle}>
              {/* Reactstrap Modal */}
            </ModalHeader>
    
            <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
              <Button onClick={handleUpload} color="success">
                {createpropertyloading ? <div className=' d-flex align-items-center gap-1'><span style={{width:"15px",height:"15px"}} className='spinner spinner-border'></span> <span>Upload</span></div> : "Upload"}
              </Button>
            </ModalBody>
    
          </Modal>
     <Modal isOpen={delModal} toggle={delToggle} centered size="lg">
            <ModalHeader toggle={delToggle}>
              {/* Reactstrap Modal */}
            </ModalHeader>
    
            <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
              <div className="mb-4">
                <Label>Add Reason</Label>
                <Input
                name="reason"
                value={reason}
                onChange={(e)=>setReason(e.target.value)}
                placeholder="Write reason..."
                />
              </div>
              <Button onClick={handleDeleteProperty} disabled={delpropertyloading} color="danger" className="me-2">
                {delpropertyloading ? <div className=' d-flex align-items-center gap-1'><span style={{width:"15px",height:"15px"}} className='spinner spinner-border'></span> <span>Deleteing...</span></div> : "Delete property"}
              </Button>
              <Button onClick={delToggle} disabled={delpropertyloading} color="light">
                Cancel
              </Button>
            </ModalBody>
    
          </Modal>
    {propertyloading ? (<ProfileLoader/>) : (
        <Container fluid className="py-4" style={{maxWidth:"1080px",margin:"auto"}}>
        <div className=" d-flex p-2 shadow-sm rounded-2 align-items-center gap-2">
            {singleProperty?.isApproved !== "Rejected" && (
                <Button disabled={featuredloading} onClick={toggleFeatured} color={singleProperty?.isFeatured ? "danger" : "success"} style={{width:"100%"}}>{featuredloading ? "Processing..." : <span>Make {singleProperty?.isFeatured ? "UnFeatured" : "Featured"}</span>}</Button>
            )}
            {singleProperty?.isApproved==="Approved" ? <Button color="success" disabled style={{width:"100%"}}>This Property is Approved</Button> : singleProperty?.isApproved==="Rejected" ? (<Button color="danger" disabled style={{width:"100%"}}>This Property is Rejected</Button>) : (
                <div className=" position-relative" style={{width:"100%"}}>
                    <Input
                    disabled={approvedloading}
            type="select"
            onChange={handleChange}
            >
                <option value={""}>Make Approved</option>
                <option value={"Approved"}>Approved</option>
                <option value={"Rejected"}>Rejected</option>
            </Input>
            {approvedloading && (
                <div style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:"6px"}}>
                <div class="spinner-border" role="status" style={{width:"20px",height:"20px"}}>
</div>
            </div>
            )}
            
                </div>
            )}
            <div>
              <Button onClick={delToggle} color="danger"><Trash/></Button>
            </div>
        </div>
      <Row className="g-4 mt-2">
        {/* RIGHT: MAIN INFO */}
        <Col sm="12">
          <Card className="shadow-sm border-0 h-100">
            <CardBody>
              <h3 className="fw-bold mb-2">{singleProperty?.title}</h3>

              <div className="mb-3">
                <Badge color="primary" className="me-2">
                  {singleProperty?.category}
                </Badge>
                <Badge color="dark" className="me-2">
                  {singleProperty?.type}
                </Badge>
                <Badge
                 className="me-2"
                  color={
                    singleProperty?.isApproved === "Approved"
                      ? "success"
                      : singleProperty?.isApproved==="Pending" ? "warning" : "danger"
                  }
                >
                  {singleProperty?.isApproved}
                </Badge>
                {!singleProperty?.isFree && (
                    <Badge
                 className="me-2"
                  color={
                    singleProperty?.isPaid
                      ? "success"
                      : "danger"
                  }
                >
                  {singleProperty?.isPaid ? "Paid" : "No Paid"}
                </Badge>
                )}
                <Badge
                 className="me-2"
                  color={
                    singleProperty?.isFree
                      ? "success"
                      : "danger"
                  }
                >
                  {singleProperty?.isFree ? "Free" : "No Free"}
                </Badge>
                 {singleProperty?.isFeatured && (
                    <Badge
                 className="me-2"
                  color={"success"}
                >
                    Featured
                </Badge>
                )}
              </div>

              <h4 className="text-success fw-bold mb-3">
                PKR {singleProperty?.price.toLocaleString()}
              </h4>

              <p className="text-muted">{singleProperty?.description}</p>

              <Row className="text-center my-4">
                <Col>
                  <strong>{singleProperty?.beds}</strong>
                  <div className="text-muted small">Beds</div>
                </Col>
                <Col>
                  <strong>{singleProperty?.baths}</strong>
                  <div className="text-muted small">Baths</div>
                </Col>
                <Col>
                  <strong>{singleProperty?.rooms}</strong>
                  <div className="text-muted small">Rooms</div>
                </Col>
                <Col>
                  <strong>{singleProperty?.squareFits}</strong>
                  <div className="text-muted small">Sqft</div>
                </Col>
              </Row>

              <hr />

              <Row>
                <Col md="6">
                  <p className="mb-1">
                    <strong>Area Size:</strong> {singleProperty?.areaSize}
                  </p>
                  <p className="mb-1">
                    <strong>Furnished:</strong>{" "}
                    {singleProperty?.furnished ? "Yes" : "No"}
                  </p>
                  <p className="mb-1">
                    <strong>Operating Since:</strong>{" "}
                    {singleProperty?.operatingSince}
                  </p>
                </Col>

                <Col md="6">
                  <p className="mb-1">
                    <strong>Country:</strong> {singleProperty?.country}
                  </p>
                  <p className="mb-1">
                    <strong>City:</strong> {singleProperty?.city}
                  </p>
                  <p className="mb-1">
                    <strong>Location:</strong> {singleProperty?.location}
                  </p>
                </Col>
                <Col sm="4" className="mt-4">
                {/* <h4 style={{fontWeight:"bold"}}>Author</h4> */}
                  <div className=" d-flex justify-content-start align-items-center gap-4">
                    <img 
                    src={singleProperty?.createdBy?.profile ? singleProperty?.createdBy?.profile?.url : singleProperty?.createdBy?.agencyProfile?.url}
                    alt={singleProperty?.createdBy?.name}
                    width={60}
                    height={60}
                    className=" object-fit-cover rounded-circle"
                    />
                    <div className=" d-flex flex-column">
                        <span style={{fontWeight:"bold"}}>{singleProperty?.createdBy?.email}</span>
                        <span>{singleProperty?.createdBy?.name}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        
        <Col sm="12">
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                          <div style={{ position: 'relative', height: 'auto', overflow: 'hidden' }}>
                            <img 
                              src={singleProperty?.images[currentImageIndex]?.url} 
                              alt="Property"
                              style={{ width: '100%', aspectRatio:"16/9", objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                                                {singleProperty?.images.map((_, idx) => (
                                                  <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    style={{
                                                      width: '12px',
                                                      height: '12px',
                                                      borderRadius: '50%',
                                                      border: 'none',
                                                      background: currentImageIndex === idx ? '#fff' : 'rgba(255,255,255,0.5)',
                                                      cursor: 'pointer'
                                                    }}
                                                  />
                                                ))}
                                              </div>
                                             {sampleuser?._id === singleProperty?.createdBy?._id && (
                                               <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '10px' }}>
                                                  <button
                                                    style={{
                                                      borderRadius: '50%',
                                                      border: '1px solid gray',
                                                      background:"red",
                                                      color:"white",
                                                      padding:"4px",
                                                      cursor: 'pointer'
                                                    }}
                                                    onClick={()=>handleRemoveImage(singleProperty?.images[currentImageIndex]?.public_id)}
                                                  >
                                                    {removepropertyimageloading && singleProperty?.images[currentImageIndex]?.public_id === publicID ? <span style={{width:"15px",height:"15px"}} className='spinner spinner-border'></span> : <Trash style={{width:"20px",height:"20px",background:"red",padding:"3px",borderRadius:"50%",color:"white"}}/>}
                                                  </button>
                                              </div>
                                             )}
                          </div>
                          <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                            {singleProperty?.images.map((img, idx) => (
                              <div key={idx} style={{position:"relative"}}>
                                <img
                                key={idx}
                                src={img.url}
                                alt={`Thumbnail ${idx + 1}`}
                                onClick={() => setCurrentImageIndex(idx)}
                                style={{
                                  width: '100%',
                                  aspectRatio:"1/1",
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  border: currentImageIndex === idx ? '3px solid #0d6efd' : '3px solid transparent'
                                }}
                              />
                              </div>
                            ))}
                            {sampleuser?._id === singleProperty?.createdBy?._id && (
                              <div>
                                               <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                  />
                                              <div 
                                              onClick={handleClick}
                                              style={{
                                                    width: '100%',
                                                    height:"100%",
                                                    objectFit: 'cover',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    border: '3px solid #0FAA17',
                                                    display:"flex",
                                                    justifyContent:"center",
                                                    alignItems:"center"
                                                  }}
                                                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f3fff6")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                              >
                                               <Plus/> 
                                              </div>
                                             </div>
                            )}
                          </div>
                        </div>
        </Col>
{/* LEFT: Images */}
        
        
      </Row>
      {/* EXTRA DETAILS */}
      <Row className="g-2">

        <Col lg="6" className=" position-relative">
        {singleProperty?.floorPlanImage && (
          <div className=" position-absolute" style={{top:"10px",right:"10px"}}>
          {floorPlanImage!==null ? <Button color="light" onClick={handleUploadFloorPlanImage}>{createpropertyloading ? "Submitting..." : "Submit"}</Button> : <Button onClick={handlefloorClick2} disabled={createpropertyloading} color="light">Change Image</Button>}
          <input
                                    type="file"
                                    accept="image/*"
                                    ref={floorfileInputRef2}
                                    multiple
                                    onChange={handleFloorChange}
                                    style={{ display: "none" }}
                                  />
        </div>
        )}
        {!singleProperty?.floorPlanImage && (
          <div style={{height:"300px"}} className=" shadow-sm rounded-2 d-flex justify-content-center align-items-center">
          {floorPlanImage !==null ? <Button color="success" onClick={handleUploadFloorPlanImage}>{createpropertyloading ? "SUbmitting..." : "Submit"}</Button> : <Button color="success" onClick={handlefloorClick}>Upload floor plan image</Button>}
             <input
                                    type="file"
                                    accept="image/*"
                                    ref={floorfileInputRef}
                                    multiple
                                    onChange={handleFloorChange}
                                    style={{ display: "none" }}
                                  />
        </div>
        )}
          {singleProperty?.floorPlanImage && (
            <img src={singleProperty?.floorPlanImage?.url} alt="floor plan image" style={{width:"100%",height:"300px" ,borderRadius:"10px"}}/>
          )}
        </Col>
        <Col lg="6">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold mb-3">SEO Information</h5>
              <ListGroup flush>
                <ListGroupItem>
                  <strong>SEO Title:</strong> {singleProperty?.seo_title}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>SEO Description:</strong>{" "}
                  {singleProperty?.seo_description}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Slug:</strong> {singleProperty?.slug}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Keywords:</strong>{" "}
                  <div className="d-flex flex-wrap gap-2">
                {singleProperty?.keywords?.map((item, i) => (
                  <Badge key={i} color="secondary" pill>
                    {item}
                  </Badge>
                ))}
              </div>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold mb-3">Property Brief</h5>
        <div className=" mb-4">{singleProperty?.description}</div>
        <div className="white-space-pre-line">{singleProperty?.aboutProperty}</div>
            </CardBody>
          </Card>
        </Col>

        <Col sm="12">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold mb-3">Amenities</h5>
              <div className="d-flex flex-wrap gap-2">
                {singleProperty?.amenities?.map((item, i) => (
                  <Badge key={i} color="secondary" pill>
                    {item}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    )}
    </>
  );
};

export default AdminPropertyDetail;
