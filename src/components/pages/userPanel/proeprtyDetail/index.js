import React, { useEffect, useRef, useState } from 'react';
import { Home, MapPin, Bed, Bath, Maximize, Calendar, Eye, DollarSign, Check, Star, Play, Edit, Trash2, Share2, Cross } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPK } from '@/utils/Formatter';
import { Col, Row } from 'reactstrap';
import { Plus, Trash } from 'react-feather';
import { RemovePropertyImage, UpdateFloorPlanImage, UploadMoreImages } from '@/redux-toolkit/action/propertyAction';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Image from 'next/image';


const PropertyDetailDashboard = ({setActivetab}) => {
  const {myProperty,createpropertyloading,removepropertyimageloading} = useSelector((state)=>state.Property);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [publicID, setPublicID] = useState("")

  const [images, setImages] = useState([]);
  const [floorPlanImage, setFloorPlanImage] = useState(null);

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('en-PK', {
  //     style: 'currency',
  //     currency: 'PKR',
  //     minimumFractionDigits: 0
  //   }).format(price);
  // };

    const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
    const fileInputRef2 = useRef(null);
  const handleClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleUpload = ()=>{
    const formData = new FormData();
    if (images && images.length > 0) {
  Array.from(images).forEach((file) => {
    formData.append("images", file);
  });
}
  dispatch(UploadMoreImages(formData,myProperty.slug,toggle))
  }


  const handleRemoveImage = (public_id)=>{
    setPublicID(public_id)
    const slug = myProperty.slug
    dispatch(RemovePropertyImage({public_id,slug,setPublicID}))
  }

  const toggle = () => {
    setModal(!modal);
    setImages([])
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    setImages(files);
    setModal(true)
  };
  const handleUploadFloorPlanImage = ()=>{
    const formData = new FormData();
    formData.append("floorPlanImage", floorPlanImage);
    dispatch(UpdateFloorPlanImage({formData,slug:myProperty.slug,setFloorPlanImage}))
  }
  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setFloorPlanImage(file);
  };
  const CancelUploadImage = () => {
    setFloorPlanImage(null);
  };
  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
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
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.75rem' }}>{myProperty.title}</h2>
              <p style={{ color: '#6c757d', marginBottom: 0, display: 'flex', alignItems: 'center' }}>
                <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                {myProperty.address}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={()=>setActivetab("editProperty")} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid #0d6efd', background: 'white', color: '#0d6efd', borderRadius: '6px', cursor: 'pointer' }}>
                <Edit size={16} style={{ marginRight: '0.5rem' }} />
                Edit
              </button>
              <button style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid #198754', background: 'white', color: '#198754', borderRadius: '6px', cursor: 'pointer' }}>
                <Share2 size={16} style={{ marginRight: '0.5rem' }} />
                Share
              </button>
              <button style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid #dc3545', background: 'white', color: '#dc3545', borderRadius: '6px', cursor: 'pointer' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ background: '#198754', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}>
            <Check size={14} style={{ marginRight: '0.25rem' }} />
            Approved
          </span>
          <span style={{ background: '#F8F9FA', color: 'black', padding: '0.5rem 1rem', borderRadius: '6px' }}>
            {myProperty.category}
          </span>
          <span style={{ background: '#6c757d', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px' }}>
            {myProperty.type}
          </span>
          <span style={{ background: '#ffc107', color: '#000', padding: '0.5rem 1rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}>
            <Eye size={14} style={{ marginRight: '0.25rem' }} />
            {myProperty.views} Views
          </span>
        </div>

        <div>
          <Row>
            {/* Image Gallery */}
            <Col md="8">
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
                  <img 
                    src={myProperty.images[currentImageIndex].url} 
                    alt="Property"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                    {myProperty.images.map((_, idx) => (
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
                  {myProperty.images.map((img, idx) => (
                    <div key={idx} onClick={()=>handleRemoveImage(img.public_id)} style={{position:"relative"}}>
                      <img
                      key={idx}
                      src={img.url}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setCurrentImageIndex(idx)}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: currentImageIndex === idx ? '3px solid #0d6efd' : '3px solid transparent'
                      }}
                    />
                    <button title='remove image permanently' style={{position:"absolute",background:"transparent",border:"none", top:"2px",right:"2px"}}>{removepropertyimageloading && img.public_id === publicID ? <span style={{width:"15px",height:"15px"}} className='spinner spinner-border'></span> : <Trash style={{width:"20px",height:"20px",background:"red",padding:"3px",borderRadius:"50%",color:"white"}}/>}</button>
                    </div>
                  ))}
                 <div>
                   <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
                  <div 
                  onClick={handleClick}
                  style={{
                        width: '100%',
                        height: '80px',
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
                </div>
              </div>

              {/* Tabs Section */}
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
                <div style={{ borderBottom: '2px solid #e9ecef', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    {['overview', 'amenities', 'location',"seo-field","Floor Plan Image"].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                          padding: '1rem 0',
                          border: 'none',
                          background: 'none',
                          color: activeTab === tab ? '#0d6efd' : '#6c757d',
                          borderBottom: activeTab === tab ? '3px solid #0d6efd' : '3px solid transparent',
                          cursor: 'pointer',
                          fontWeight: activeTab === tab ? 'bold' : 'normal',
                          textTransform: 'capitalize',
                          transition: 'all 0.3s'
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {activeTab === 'overview' && (
                  <div>
                    <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>About This Property</h5>
                    <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>{myProperty.aboutProperty}</p>
                    <p style={{ color: '#6c757d' }}>{myProperty.description}</p>
                    
                    <h5 style={{ fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>Property Details</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Property Type:</strong> {myProperty.type}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Area Size:</strong> {myProperty.areaSize}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Square Feet:</strong> {myProperty.squareFits.toLocaleString()} sq ft
                        </div>
                      </div>
                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Furnished:</strong> {myProperty.furnished ? 'Yes' : 'No'}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Operating Since:</strong> {myProperty.operatingSince}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Balconies:</strong> {myProperty.balcony}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'Floor Plan Image' && (
                  <div>
                    
                      <div>
                        <Image src={myProperty.floorPlanImage.url} alt='Floor Plan Image' height={400} width={400} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover"}}/>
                      </div>
                    <div>
                      {!myProperty?.floorPlanImage && (
                        <h4>No Floor Plan Image Added</h4>
                      )}
                      {floorPlanImage === null ? <Button onClick={handleClick2} color='success' className='mt-2'>{myProperty?.floorPlanImage ? "Update" : "Add"} Floor Plan Image</Button> : <div>
                        <Button disabled={createpropertyloading} onClick={handleUploadFloorPlanImage} color='success' className=' mt-2'>{createpropertyloading ? <><span style={{width:"15px",height:"15px"}} className='spinner spinner-border'></span> Submit</> : "Submit"}</Button>
                        <Button disabled={createpropertyloading} onClick={CancelUploadImage} color='light' className='ms-2 mt-2'>Cancel</Button>
                        </div>}
                      <input
        type="file"
        accept="image/*"
        ref={fileInputRef2}
        onChange={handleFileChange2}
        style={{ display: "none" }}
      />
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div>
                    <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Premium Amenities</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {myProperty.amenities.map((amenity, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                          <Check size={18} style={{ color: '#198754', marginRight: '0.5rem', flexShrink: 0 }} />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div>
                    <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Location Details</h5>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> {myProperty.address}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Area:</strong> {myProperty.location}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>City:</strong> {myProperty.city}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>State:</strong> {myProperty.state}</p>
                    <p style={{ marginBottom: '1.5rem' }}><strong>Country:</strong> {myProperty.country}</p>
                    <div style={{ height: '300px', background: '#e9ecef', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={48} style={{ color: '#6c757d' }} />
                    </div>
                  </div>
                )}
                {activeTab === 'seo-field' && (
                  <div>
                    <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Seo Field</h5>
                    <p style={{ marginBottom: '0.5rem' }}><strong>SEO Title:</strong> {myProperty.seo_title}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>SEO Description:</strong> {myProperty.seo_description}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Slug:</strong> {myProperty.slug}</p>
                    <div className='mt-4'>
                      <h5 style={{fontWeight:"bold"}}>Keywords:</h5>
                      {myProperty.keywords?.map((keyword,index)=>{
                        return <span style={{fontSize:"15px",fontWeight:"400"}} key={index} class="badge text-bg-light">{keyword}</span>
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Col>

            {/* Sidebar */}
            <Col md="4">
              {/* Price Card */}
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                PKR 
                <h3 style={{ color: '#198754', fontWeight: 'bold', marginBottom: '0.25rem' }}>{formatPK(myProperty.price)}</h3>
                <p style={{ color: '#6c757d', fontSize: '0.875rem', marginBottom: 0 }}>Total Price</p>
              </div>

              {/* Quick Stats */}
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Quick Stats</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Home size={20} style={{ color: '#0d6efd', marginRight: '0.5rem' }} />
                    <span>Rooms</span>
                  </div>
                  <strong>{myProperty.rooms}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bed size={20} style={{ color: '#0d6efd', marginRight: '0.5rem' }} />
                    <span>Bedrooms</span>
                  </div>
                  <strong>{myProperty.beds}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bath size={20} style={{ color: '#0d6efd', marginRight: '0.5rem' }} />
                    <span>Bathrooms</span>
                  </div>
                  <strong>{myProperty.baths}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Maximize size={20} style={{ color: '#0d6efd', marginRight: '0.5rem' }} />
                    <span>Area</span>
                  </div>
                  <strong>{myProperty.areaSize}</strong>
                </div>
              </div>

              {/* Video Tour */}
              {myProperty.video && (
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Video Tour</h5>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', background: '#000' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                      <Play size={48} style={{ color: 'white', opacity: 0.8 }} />
                    </div>
                  </div>
                  <button style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={16} style={{ marginRight: '0.5rem' }} />
                    Watch Video Tour
                  </button>
                </div>
              )}

            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailDashboard;