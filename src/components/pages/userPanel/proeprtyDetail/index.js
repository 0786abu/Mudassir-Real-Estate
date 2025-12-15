import React, { useEffect, useRef, useState } from 'react';
import { Home, MapPin, Bed, Bath, Maximize, Calendar, Eye, DollarSign, Check, Star, Play, Edit, Trash2, Share2, Cross, CircleEllipsis } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPK } from '@/utils/Formatter';
import { Col, Input, Label, Row } from 'reactstrap';
import { Plus, Trash } from 'react-feather';
import { RemovePropertyImage, SendPropertyDataToMyProperty, UpdateFloorPlanImage, UploadMoreImages } from '@/redux-toolkit/action/propertyAction';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Image from 'next/image';
import { paymentMethods } from '@/utils/FiltersCities';
import { CreatePayment } from '@/redux-toolkit/action/paymentAction';
import ProfileLoader from '@/components/common/Loader';



function getYouTubeEmbedUrl(url) {
  if(url){
    const id = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${id}`;
  }
}


const PropertyDetailDashboard = ({setActivetab}) => {
  const {myProperty,singlepropertyloading,createpropertyloading,removepropertyimageloading,selectedSlug} = useSelector((state)=>state.Property);
  const {createpaymentloading} = useSelector((state)=>state.Payment);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [publicID, setPublicID] = useState("");
  const [paidModal, setPaidModal] = useState(false);
  const [makePayment, setMakePayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState(null);
  const [screenShot, setScreenShot] = useState(null);

  const handleChange = (e)=>{
    const file = e.target.files[0];
    setScreenShot(file);
  }

  useEffect(()=>{
    if(myProperty){
      setTimeout(() => {
        if(myProperty?.isPaid===false && myProperty?.isFree===false && myProperty?.isRequestedForPayment===false){
        setPaidModal(true);
      }
      }, 200);
    }
  },[myProperty])

  useEffect(()=>{
    if(selectedSlug !==null){
      dispatch(SendPropertyDataToMyProperty(selectedSlug))
    }
  },[selectedSlug,dispatch])
  const [images, setImages] = useState([]);
  const [floorPlanImage, setFloorPlanImage] = useState(null);

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('en-PK', {
  //     style: 'currency',
  //     currency: 'PKR',
  //     minimumFractionDigits: 0
  //   }).format(price);
  // };
  const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

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
  dispatch(UploadMoreImages(formData,myProperty?.slug,toggle))
  }


  const handleRemoveImage = (public_id)=>{
    setPublicID(public_id)
    const slug = myProperty?.slug
    dispatch(RemovePropertyImage({public_id,slug,setPublicID,setCurrentImageIndex}))
  }

  const handleSubmitPayment = ()=>{
    const formData = new FormData();
    formData.append("paymentMethod", selectedMethod?.key ?? "");
    formData.append("propertyID", myProperty?._id);
    formData.append("amount", amount);
    formData.append("screenshot", screenShot ?? "");
    if(selectedBank !==null && selectedMethod?.type==="bank"){
      formData.append("bankDetails", selectedBank);
    };
    dispatch(CreatePayment({formData,setMakePayment,setPaidModal}))
  }

  const toggle = () => {
    setModal(!modal);
    setImages([])
  }
  const paidToggle = () => {
    setPaidModal(!paidModal);
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    setImages(files);
    setModal(true)
  };
  const handleUploadFloorPlanImage = ()=>{
    const formData = new FormData();
    formData.append("floorPlanImage", floorPlanImage);
    dispatch(UpdateFloorPlanImage({formData,slug:myProperty?.slug,setFloorPlanImage}))
  }
  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setFloorPlanImage(file);
  };
  const CancelUploadImage = () => {
    setFloorPlanImage(null);
  };
  useEffect(()=>{
    window.scrollTo({top:0, behavior:"smooth"})
  },[])
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
      {/* paid modal */}
      <Modal isOpen={paidModal} toggle={paidToggle} centered size="lg">
        <ModalHeader toggle={paidToggle}>
          {/* Reactstrap Modal */}
        </ModalHeader>

        <ModalBody style={{textAlign:"center"}}>
          {makePayment ? (
            <div>
              <Row>
                <Col md={"6"}>
                <div className=' d-flex align-items-start flex-column'>
                  <label>Payment method</label>
                <select
                className='form-control'
  onChange={(e) =>
    setSelectedMethod(
      paymentMethods.find(m => m.key === e.target.value)
    )
  }
>
  <option value="">Select Payment Method</option>
  {paymentMethods.map(method => (
    <option key={method.key} value={method.key}>
      {method.label}
    </option>
  ))}
</select>
              </div>
              </Col>
              <Col md={"6"}>
              <div className=' d-flex flex-column align-items-start'>
                <Label>Amount</Label>
                <Input value={amount ?? ""} onChange={(e)=>setAmount(+e.target.value)} placeholder='Enter Amount' type='number'/>
              </div>
              </Col>
              <Col md={"12"} className='mt-4'>
              <div className=' d-flex flex-column align-items-start'>
                <Label>ScreenShot</Label>
                <Input placeholder='Enter Amount' onChange={handleChange} type='file'/>
              </div>
              </Col>
              <Col md="12" className='mt-4'>
              {selectedMethod?.type === "mobile" && (
  <div>
    <p><b>Method:</b> {selectedMethod.label}</p>
    <p><b>Account Name:</b> {selectedMethod.accountName}</p>
    <p><b>Number:</b> {selectedMethod.number}</p>
  </div>
)}
              </Col>
              <Col xs="12">
              {selectedMethod?.type === "bank" && (
  <div>
    <h4>Select Bank</h4>

   <div className=' d-flex mt-4 align-items-center justify-content-start gap-2'>
     {selectedMethod.banks.map((bank, index) => (
      <label key={index} style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="radio"
          name="bank"
          value={bank.bankName}
          checked={selectedBank?.bankName === bank.bankName}
          onChange={() => setSelectedBank(bank)}
        />

        <span style={{ marginLeft: "8px" }}>
          <b>{bank.bankName}</b> <br />
          Account Title: {bank.accountTitle} <br />
          Account #: {bank.accountNumber} <br />
          IBAN: {bank.iban}
        </span>
      </label>
    ))}
   </div>
  </div>
)}
              </Col>
              </Row>
              <div className='d-flex justify-content-end mt-4'>
               <div>
                 <Button disabled={createpaymentloading} onClick={handleSubmitPayment} color="success">
            {createpaymentloading ? (<div className='d-flex align-items-center gap-1'><span style={{width:"15px",height:"15px"}} className='spinner spinner-border'></span> <span>Submit</span></div>) : "Submit"}
          </Button>
          <Button disabled={createpaymentloading} className='ms-2' onClick={()=>setMakePayment(!makePayment)} color="light">
            Cancel
          </Button>
               </div>
              </div>
            </div>
          ) : "Make a payemnt for live and show your property on public"}
        </ModalBody>
        {!makePayment && (
          <ModalFooter>
          <Button onClick={()=>setMakePayment(!makePayment)} color="success">
            Proceed to Payment
          </Button>
          <Button onClick={paidToggle} color="light">
            Pay later
          </Button>
        </ModalFooter>
        )}

      </Modal>
      {/* paid modal */}
       <Modal className='video-modal' centered size='lg' isOpen={modal2} toggle={toggle2} modalTransition={{ timeout: 100 }}>
              <ModalBody className='m-0 p-0'>
                <Button onClick={toggle2} type='button' className='btn-close' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </Button>
                {/* <iframe src='https://www.youtube.com/embed/3H6Evu2hPpE?si=KS_WdXxa_vWBn4o1' allowFullScreen></iframe> */}
                <iframe
        src={getYouTubeEmbedUrl(myProperty?.video && myProperty?.video)}
        allowFullScreen
        width="100%"
        height="450"
      ></iframe>
              </ModalBody>
            </Modal>
      {singlepropertyloading ? (<ProfileLoader/>) : (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 0.5rem' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h5><span className="badge text-bg-success">Featured Property</span></h5>
              <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.75rem' }}>{myProperty?.title}</h2>
              <p style={{ color: '#6c757d', marginBottom: 0, display: 'flex', alignItems: 'center' }}>
                <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                {myProperty?.address}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(myProperty?.isPaid===false && myProperty?.isFree===false && myProperty?.isRequestedForPayment === false) && (
                <button onClick={paidToggle} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid #198754', background: 'white', color: '#198754', borderRadius: '6px', cursor: 'pointer' }}>
                <Edit size={16} style={{ marginRight: '0.5rem' }} />
                Make payment
              </button>
              )}
              {(myProperty?.isRequestedForPayment === true && myProperty?.isApproved==="Pending") && (
                <button onClick={paidToggle} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid #198754', backgroundColor:"#198754", color: 'white', borderRadius: '6px', cursor: 'pointer' }}>
                Payment Requested
              </button>
              )}
              <button onClick={()=>setActivetab("editProperty")} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid #0d6efd', background: 'white', color: '#0d6efd', borderRadius: '6px', cursor: 'pointer' }}>
                <Edit size={16} style={{ marginRight: '0.5rem' }} />
                Edit
              </button>
              <button style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid #dc3545', background: 'white', color: '#dc3545', borderRadius: '6px', cursor: 'pointer' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span title='This property is pending for approval' style={{ background: myProperty?.isApproved==="Approved" ? '#198754' : myProperty?.isApproved==="No Approved" ? 'red' : "#FFC107", color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}>
            {myProperty?.isApproved==="Approved" ? <Check size={14} style={{ marginRight: '0.25rem' }} /> : myProperty?.isApproved==="No Approved" ? <Plus size={14} style={{ marginRight: '0.25rem', rotate:"45deg" }} /> : <CircleEllipsis style={{ marginRight: '0.25rem' }}/>}
            {myProperty?.isApproved}
          </span>
          {myProperty?.isFree && (
            <span title={`This property is free for you`} style={{ background: '#F8F9FA', color: 'black', padding: '0.5rem 1rem', borderRadius: '6px' }}>
            {"This property is Free"}
          </span>
          )}
          <span title={`Property Category is ${myProperty?.category}`} style={{ background: '#F8F9FA', color: 'black', padding: '0.5rem 1rem', borderRadius: '6px' }}>
            {myProperty?.category}
          </span>
          <span title={`Property Type is ${myProperty?.type}`} style={{ background: '#6c757d', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px' }}>
            {myProperty?.type}
          </span>
          <span title={`Total Property Views is ${myProperty?.views}`} style={{ background: '#ffc107', color: '#000', padding: '0.5rem 1rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}>
            <Eye size={14} style={{ marginRight: '0.25rem' }} />
            {myProperty?.views} Views
          </span>
          {!myProperty?.isFree && (
            <span style={{ background: myProperty?.isPaid ? '#198754' : "red", color: 'white', padding: '0.5rem 1rem', borderRadius: '6px' }}>
            {myProperty?.isPaid ? "Paid" : "No Paid"}
          </span>
          )}
        </div>

        <div>
          <Row>
            {/* Image Gallery */}
            <Col md="8">
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
                  <img 
                    src={myProperty?.images[currentImageIndex]?.url} 
                    alt="Property"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                    {myProperty?.images.map((_, idx) => (
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
                        onClick={()=>handleRemoveImage(myProperty?.images[currentImageIndex]?.public_id)}
                      >
                        {removepropertyimageloading && myProperty?.images[currentImageIndex]?.public_id === publicID ? <span style={{width:"15px",height:"15px"}} className='spinner spinner-border'></span> : <Trash style={{width:"20px",height:"20px",background:"red",padding:"3px",borderRadius:"50%",color:"white"}}/>}
                      </button>
                  </div>
                </div>
                <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                  {myProperty?.images.map((img, idx) => (
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
                </div>
              </div>

              {/* Tabs Section */}
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
                <div style={{ borderBottom: '2px solid #e9ecef', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex',flexWrap:"wrap", gap: '10px' }}>
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
                    <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>{myProperty?.aboutProperty}</p>
                    <p style={{ color: '#6c757d' }}>{myProperty?.description}</p>
                    
                    <h5 style={{ fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>Property Details</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Property Type:</strong> {myProperty?.type}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Area Size:</strong> {myProperty?.areaSize}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Square Feet:</strong> {myProperty?.squareFits.toLocaleString()} sq ft
                        </div>
                      </div>
                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Furnished:</strong> {myProperty?.furnished ? 'Yes' : 'No'}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Operating Since:</strong> {myProperty?.operatingSince}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong>Balconies:</strong> {myProperty?.balcony}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'Floor Plan Image' && (
                  <div>
                    
                      {myProperty?.floorPlanImage && (
                        <div>
                        <Image src={myProperty?.floorPlanImage?.url} alt='Floor Plan Image' height={400} width={400} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover"}}/>
                      </div>
                      )}
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
                      {myProperty?.amenities.map((amenity, idx) => (
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
                    <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> {myProperty?.address}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Area:</strong> {myProperty?.location}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>City:</strong> {myProperty?.city}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>State:</strong> {myProperty?.state}</p>
                    <p style={{ marginBottom: '1.5rem' }}><strong>Country:</strong> {myProperty?.country}</p>
                    <div style={{ height: '300px', background: '#e9ecef', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={48} style={{ color: '#6c757d' }} />
                    </div>
                  </div>
                )}
                {activeTab === 'seo-field' && (
                  <div>
                    <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Seo Field</h5>
                    <p style={{ marginBottom: '0.5rem' }}><strong>SEO Title:</strong> {myProperty?.seo_title}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>SEO Description:</strong> {myProperty?.seo_description}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Slug:</strong> {myProperty?.slug}</p>
                    <div className='mt-4'>
                      <h5 style={{fontWeight:"bold"}}>Keywords:</h5>
                      {myProperty?.keywords?.map((keyword,index)=>{
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
                <h3 style={{ color: '#198754', fontWeight: 'bold', marginBottom: '0.25rem' }}>{formatPK(myProperty?.price)}</h3>
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
                  <strong>{myProperty?.rooms}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bed size={20} style={{ color: '#0d6efd', marginRight: '0.5rem' }} />
                    <span>Bedrooms</span>
                  </div>
                  <strong>{myProperty?.beds}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bath size={20} style={{ color: '#0d6efd', marginRight: '0.5rem' }} />
                    <span>Bathrooms</span>
                  </div>
                  <strong>{myProperty?.baths}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Maximize size={20} style={{ color: '#0d6efd', marginRight: '0.5rem' }} />
                    <span>Area</span>
                  </div>
                  <strong>{myProperty?.areaSize}</strong>
                </div>
              </div>

              {/* Video Tour */}
              {myProperty?.video && (
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Video Tour</h5>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', background: '#000' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                      <Play size={48} style={{ color: 'white', opacity: 0.8 }} />
                    </div>
                  </div>
                  <button onClick={toggle2} style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={16} style={{ marginRight: '0.5rem' }} />
                    Watch Video Tour
                  </button>
                </div>
              )}

            </Col>
          </Row>
        </div>
      </div>
      )}
    </div>
  );
};

export default PropertyDetailDashboard;