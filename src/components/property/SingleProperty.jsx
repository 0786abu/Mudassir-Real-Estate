"use client";
import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AdminFetchSingleProeprty, ApprovedToggle, FeaturedToggle } from "@/redux-toolkit/action/adminAction";
import ProfileLoader from "../common/Loader";

const AdminPropertyDetail = ({slug}) => {
    const {propertyloading,singleProperty,featuredloading,approvedloading} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const toggleFeatured = ()=>{
        dispatch(FeaturedToggle(singleProperty?.slug))
    }

    const handleChange = (e)=>{
        const status = e.target.value;
        dispatch(ApprovedToggle(slug,status))
    }
    
    useEffect(()=>{
        dispatch(AdminFetchSingleProeprty(slug))
    },[dispatch,slug])
  return (
    <>
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
                          </div>
                        </div>
        </Col>
{/* LEFT: Images */}
        
        
      </Row>
      {/* EXTRA DETAILS */}
      <Row className="g-2">
        

        <Col lg="6">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold mb-3">Property Brief</h5>
        <div className=" mb-4">{singleProperty?.description}</div>
        <div className="white-space-pre-line">{singleProperty?.aboutProperty}</div>
            </CardBody>
          </Card>
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
