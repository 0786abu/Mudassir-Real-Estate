import React, { useEffect, useState } from "react";
import { Button, Col, Label, Row } from "reactstrap";
import NoSsr from "@/utils/NoSsr";
import { areaSizes, citiesLocationsData, propertyTypesData } from "@/utils/FiltersCities";
import { Plus, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { SendPropertyDataToMyProperty, UpdateProperty } from "@/redux-toolkit/action/propertyAction";
import ProfileLoader from "@/components/common/Loader";

const EditProperty = ({setActivetab}) => {
  const {createpropertyloading,myProperty,singlepropertyloading,selectedSlug} = useSelector((state)=>state.Property)
 const [keywords, setKeywords] = useState([])
  const [keywordInput, setKeywordInput] = useState("");
 const [amenities, setAmenities] = useState([])
  const [amenityInput, setAmenityInput] = useState("");
  const dispatch = useDispatch();
  const [propertyData, setPropertyData] = useState({
    seo_title:"",
    seo_description:"",
    slug:"",
    title:"",
    description:"",
    price:"",
    rooms:"",
    beds:"",
    baths:"",
    squareFits:"",
    areaSize:"",
    category:"",
    type:"",
    city:"",
    location:"",
    address:"",
    state:"",
    furnished: false,
    aboutProperty:"",
    balcony:"",
    operatingSince:"",
    video:""
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    propertyData.amenities = amenities;
    propertyData.keywords = keywords
    dispatch(UpdateProperty(propertyData,setActivetab))
  }

  useEffect(()=>{
    if(myProperty){
      setPropertyData({
        seo_title:myProperty?.seo_title,
        seo_description:myProperty?.seo_description,
        seo_description:myProperty?.seo_description,
        slug:myProperty?.slug,
        title:myProperty?.title,
        description:myProperty?.description,
        price:myProperty?.price,
        rooms:myProperty?.rooms,
        beds:myProperty?.beds,
        baths:myProperty?.baths,
        squareFits:myProperty?.squareFits,
        areaSize:myProperty?.areaSize,
        category:myProperty?.category,
        type:myProperty?.type,
        city:myProperty?.city,
        location:myProperty?.location,
        address:myProperty?.address,
        state:myProperty?.state,
        furnished:myProperty?.furnished,
        aboutProperty:myProperty?.aboutProperty,
        balcony:myProperty?.balcony,
        operatingSince:myProperty?.operatingSince,
        video:myProperty?.video,
      });
      setKeywords(myProperty?.keywords)
      setAmenities(myProperty?.amenities)
    }
  },[myProperty])

useEffect(()=>{
  if(selectedSlug !== null){
    dispatch(SendPropertyDataToMyProperty(selectedSlug))
  }
},[selectedSlug,dispatch])


  function handleAddKeyword() {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  function handleRemoveKeyword(index) {
    setKeywords(keywords.filter((_, i) => i !== index))
  }

  function handleKeywordKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault()
      handleAddKeyword()
    }
  }
  function handleAddAmenity() {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()])
      setAmenityInput("")
    }
  }

  function handleRemoveAmenity(index) {
    setAmenities(amenities.filter((_, i) => i !== index))
  }

  function handleAmenityKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault()
      handleAddAmenity()
    }
  }

  return (
    <NoSsr>
          <div className="dashboard-content">
            {singlepropertyloading ? (<ProfileLoader/>) : (
              <div className="create-tab" id="create-property">
              <div className="property-wizard common-card">
                <div className="common-header">
                  <h5>Create property</h5>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="create-property-form">
                  <div className="form-inputs">
                    <h6>SEO Box</h6>
                    <Row className="gx-2 gx-sm-3">
                      <Col sm="12" className="form-group">
                        <input name="seo_title" value={propertyData.seo_title} onChange={(e)=>setPropertyData({...propertyData, seo_title:e.target.value})} type="text" className="form-control" placeholder="Enter SEO Title (under 70 character)" />
                      </Col>
                      <Col sm="12" className="form-group">
                       <input name="seo_description" value={propertyData.seo_description} onChange={(e)=>setPropertyData({...propertyData, seo_description:e.target.value})} type="text" className="form-control" placeholder="Enter SEO Description (under 150 character)" />
                      </Col>
                      <Col sm="12" className="form-group">
                       <input name="slug" value={propertyData.slug} onChange={(e)=>setPropertyData({...propertyData, slug:e.target.value})} type="text" className="form-control" placeholder="Enter Slug(Most Important) ex. my-first-property-5-kanal" />
                      </Col>
                      <Col sm="12" className="form-group">
                        <div className="">
                  <div className="">
                    <div className="d-flex gap-2">
                      <input
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={handleKeywordKeyPress}
                        placeholder="Add a Multiple SEO Keywords"
                        className="form-control"
                      />
                      <button
                        type="button"
                        className=" bg-black text-white rounded-1"
                        onClick={handleAddKeyword}
                        disabled={!keywordInput.trim() || keywords.includes(keywordInput.trim())}
                      >
                        <Plus className="h-75 w-75" />
                      </button>
                    </div>

                    {keywords?.length > 0 ? (
                      <div className="d-flex mt-2 flex-wrap gap-2">
                        {keywords?.map((keyword, index) => (
                          <div style={{color:"black",fontSize:"15px",fontWeight:"500",color:"#9BA0A4"}} key={index} className="d-flex badge justify-content-center align-items-center border gap-1">
                            <span>{keyword}</span>
                            <button
                              type="button"
                              style={{background:"transparent",border:"none"}}
                              className="h-100 w-100 p-0"
                              onClick={() => handleRemoveKeyword(index)}
                            >
                              <X className="h-75 w-75" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className=" mt-2">No keywords added yet</p>
                    )}
                  </div>
                </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="form-inputs">
                    <h6>Basic information</h6>
                    <Row className="gx-2 gx-sm-3">
                      <Col sm="6" md="4" className="form-group">
                        <input name="title" value={propertyData.title} onChange={(e)=>setPropertyData({...propertyData, title:e.target.value})} type="text" className="form-control" placeholder="Enter Property Title" />
                      </Col>
                      <Col sm="6" md="4">
                      <div className="form-group">
                        <input
                          name="price"
                          type="text"
                          value={propertyData.price}
                          onChange={(e)=>setPropertyData({...propertyData, price:+e.target.value})}
                          className="form-control"
                          placeholder="Property Price in number (ex. 10000000)"
                        />
                      </div>
                      </Col>
                      <Col sm="6" md="4" className="form-group">
                       <select
                       name="category"
                        value={propertyData.category} onChange={(e)=>setPropertyData({...propertyData, category:e.target.value})}
                       className="form-control h-100"
                                //  style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
                                //  value={type}
                               >
                                 <option value="">Property Category</option>
                                 <option value="Sale">Sale</option>
                                 <option value="Rent">Rent</option>
                               </select>
                      </Col>
                      <Col sm="6" md="4" className="form-group">
                       <select
                       name="type"
                        value={propertyData.type} onChange={(e)=>setPropertyData({...propertyData, type:e.target.value})}
                       className="form-control h-100"
                                //  style={{outline:"none",width:"100%",padding:"8px",borderRadius:"4px",border:"0.5px solid #ced4da"}}
                                //  value={type}
                               >
                                 <option value="">Property Type</option>
                                {propertyTypesData.map((item) => (
                           <optgroup key={item.mainType} label={item.mainType}>
                             {item.types.map((sub) => (
                               <option key={sub} value={sub}>
                                 {sub}
                               </option>
                             ))}
                           </optgroup>
                         ))}
                               </select>
                      </Col>
                      
                      <Col sm="6" md="4" className="form-group">
                        <input name="rooms" value={propertyData.rooms} onChange={(e)=>setPropertyData({...propertyData, rooms:+e.target.value})} type="number" className="form-control" label="rooms" placeholder="Enter Number of rooms (ex. 1 or 4 etc.)" />
                      </Col>
                       <Col sm="6" md="4" className="form-group">
                        <input name="beds" type="number" value={propertyData.beds} onChange={(e)=>setPropertyData({...propertyData, beds:+e.target.value})} className="form-control" label="beds" placeholder="Enter Number of beds rooms (ex. 1 or 4 etc.)" />
                      </Col>
                       <Col sm="6" md="4" className="form-group">
                        <input name="baths" type="number" value={propertyData.baths} onChange={(e)=>setPropertyData({...propertyData, baths:+e.target.value})} className="form-control" label="baths" placeholder="Enter Number of bath rooms (ex. 1 or 4 etc.)" />
                      </Col>
                       <Col sm="6" md="4" className="form-group">
                        <input name="squareFits" value={propertyData.squareFits} onChange={(e)=>setPropertyData({...propertyData, squareFits:+e.target.value})} type="number" className="form-control" label="squareFits" placeholder="Enter your property in sqft (ex. 1200 or 1500 etc.)" />
                      </Col>
                       <Col sm="6" md="4" className="form-group">
                        <select
                        name="areaSize"
                         value={propertyData.areaSize} onChange={(e)=>setPropertyData({...propertyData, areaSize:e.target.value})}
                                          className="form-control h-100"
                                        >
                                          <option>Select Area Size</option>
                                          {areaSizes.map((filt,index)=>{
                                                    return <option value={filt} key={index}>{filt}</option>
                                                  })}
                                        </select>
                      </Col>
                       <Col sm="6" md="4" className="form-group">
                        <input name="balcony" value={propertyData.balcony} onChange={(e)=>setPropertyData({...propertyData, balcony:+e.target.value})} type="number" className="form-control" label="balcony" placeholder="Enter number of balconies (optional)" />
                      </Col>
                       <Col sm="6" md="4" className="form-group">
                        <input name="operatingSince" value={propertyData.operatingSince} onChange={(e)=>setPropertyData({...propertyData, operatingSince:+e.target.value})} type="number" className="form-control" label="operatingSince" placeholder="Opertaing since (ex. 2016)" />
                      </Col>
                       <Col sm="6" md="4" className="form-group d-flex justify-content-start align-items-center">
  <div className="form-check d-flex align-items-center">
    <input
     value={propertyData.furnished} onChange={(e)=>setPropertyData({...propertyData, furnished:!propertyData.furnished})}
      name="furnished"
      checked={propertyData.furnished}
      type="checkbox"
      className="form-check-input h-100"
      id="furnishedCheck"
    />
    <label className="form-check-label h-100 ms-2 mt-2" htmlFor="furnishedCheck">
      Furnished
    </label>
  </div>
</Col>
                      <Col sm="12" className="form-group">
                        <textarea type="textarea" value={propertyData.description} onChange={(e)=>setPropertyData({...propertyData, description:e.target.value})} name="description" className="form-control" rows={4} label="Description" placeholder="Enter property description under 160 characters" />
                      </Col>
                      <Col sm="12" className="form-group">
                        <textarea type="textarea" value={propertyData.aboutProperty} onChange={(e)=>setPropertyData({...propertyData, aboutProperty:e.target.value})} name="aboutProperty" className="form-control" rows={6} label="aboutProperty" placeholder="Enter Brief Description About Property" />
                      </Col>
                    </Row>
                  </div>
                  <div className="form-inputs">
                    <h6>Address</h6>
                    <Row className=" gx-3">
                      <Col sm="4" className="form-group">
                       <select
                       name="state"
                        value={propertyData.state} onChange={(e)=>setPropertyData({...propertyData, state:e.target.value})}
                                 className="form-control h-100"
                               >
                                 <option value="">Select state</option>
                                 {["Punjab","Sindh","Islamabad Capital Territory (ICT)","Balochistan","Khyber Pakhtunkhwa (KPK)"].map((filt,index)=>{
                                   return <option value={filt} key={index}>{filt}</option>
                                 })}
                               </select>
                      </Col>
                      <Col sm="4" className="form-group">
                       <select
                       name="city"
                        value={propertyData.city} onChange={(e)=>setPropertyData({...propertyData, city:e.target.value})}
                                 className="form-control h-100"
                               >
                                 <option value="">Select Main City</option>
                                 {citiesLocationsData.map((filt,index)=>{
                                   return <option value={filt.city} key={index}>{filt.city}</option>
                                 })}
                               </select>
                      </Col>
                      <Col sm="4" className="form-group">
                       <select
                       name="location"
                        value={propertyData.location} onChange={(e)=>setPropertyData({...propertyData, location:e.target.value})}
                       className="form-control h-100"
                       >
                         <option value="">Select Location</option>
                         {citiesLocationsData.map((item) => (
                           <optgroup key={item.city} label={item.city}>
                             {item.subCities.map((sub) => (
                               <option key={sub} value={sub}>
                                 {sub}
                               </option>
                             ))}
                           </optgroup>
                         ))}
                       </select>
                      </Col>
                      <Col sm="4" className="form-group">
                        <input
                          name="address"
                          type="text"
                           value={propertyData.address} onChange={(e)=>setPropertyData({...propertyData, address:e.target.value})}
                          className="form-control h-100"
                          label="address"
                          placeholder="Enter your current address"
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="form-inputs">
                    <Row className="gx-3">
                      <Col sm="12" className="form-group">
                        <input name="video" value={propertyData.video} onChange={(e)=>setPropertyData({...propertyData, video:e.target.value})} type="text" className="form-control" placeholder="Enter youtube video link"  />
                      </Col>
                      <Col sm="12" className="form-group">
                        <Label>Enter Property Amenities</Label>
                        <div className="">
                  <div className="">
                    <div className="d-flex gap-2">
                      <input
                        value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        onKeyPress={handleAmenityKeyPress}
                        placeholder="Add a Multiple Property Amenities in tags"
                        className="form-control"
                      />
                      <button
                        type="button"
                        className=" bg-black text-white rounded-1"
                        onClick={handleAddAmenity}
                        disabled={!amenityInput.trim() || amenities.includes(amenityInput.trim())}
                      >
                        <Plus className="h-75 w-75" />
                      </button>
                    </div>

                    {amenities?.length > 0 ? (
                      <div className="d-flex mt-2 flex-wrap gap-2">
                        {amenities?.map((amenityy, index) => (
                          <div style={{color:"black",fontSize:"15px",fontWeight:"500",color:"#9BA0A4"}} key={index} className="d-flex badge justify-content-center align-items-center border gap-1">
                            <span>{amenityy}</span>
                            <button
                              type="button"
                              style={{background:"transparent",border:"none"}}
                              className="h-100 w-100 p-0"
                              onClick={() => handleRemoveAmenity(index)}
                            >
                              <X className="h-75 w-75" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className=" mt-2">No Amenities added yet</p>
                    )}
                  </div>
                </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-end">
                    <Button disabled={createpropertyloading} type="submit" className="btn btn-gradient color-2 btn-pill">
                      {createpropertyloading ? (<div className="d-flex align-items-center gap-2">
                      <span className="spinner-border text-success spinner-border-sm"></span> <span>Update property</span>
                      </div>) : "Update property"}
                    </Button>
                  </div>
                </div>
                </form>
              </div>
            </div>
            )}
          </div>
    </NoSsr>
  );
};

export default EditProperty;
