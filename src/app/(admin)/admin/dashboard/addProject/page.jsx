"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import FloorPlansForm from "./FloorPlans";
import PaymentPlansForm from "./PaymentPlans";
import FeaturesForm from "./Features";
import OfferingForm from "./Offering";
import { areaSizes, citiesLocationsData, propertyTypesData } from "@/utils/FiltersCities";
import RichTextEditor from "./TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { CreateProjectAdmin } from "@/redux-toolkit/action/projectAction";
import { Plus, X } from "lucide-react";

const createSubItem = () => ({
  subItemTitle: "",
  minPrice: "",
  maxPrice: "",
  areaSize: "",
  beds: "",
  bathrooms: "",
});

const createItem = () => ({
  itemTitle: "",
  parentMinPrice: "",
  parentMaxPrice: "",
  subItems: [createSubItem()],
});

const CreateProject = () => {
  const {createprojectloading} = useSelector((state)=>state.Project)
  const [formData, setFormData] = useState({
    seo_title:"",
    seo_description:"",
    slug:"",
    projectTitle: "",
    city: "",
    location: "",
    type: "",
    minItemPrice: "",
    maxItemPrice: "",
    map: "",
    projectOwnerPhone: "",
    projectOwnerEmail: "",
    projectOwnerWhatsappAPI: "",
    isFeatured: "false",
    isSponsored: "false",
    items: [createItem()],
    images:[],
    floorPlans:[],
    paymentPlans:[],
    offering:[],
    features: {
    plotFeatures: [],
    forFamily_Lifestyle: [],
    forWork_Connectivity: [],
    forSafety_Maintenance: [],
    others: [],
  },
    developedBy:{
      logo:null,
      developer:"",
      description:""
    },
    marketingBy:{
      logo:null,
      platform:"",
      description:""
    },
    projectLogo:null
  });
  const [keywords, setKeywords] = useState([])
  const [keywordInput, setKeywordInput] = useState("");
  const [cityData, setCityData] = useState(null);
  function handleAddKeyword() {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  function handleRemoveKeyword(index) {
    setKeywords(keywords.filter((_, i) => i !== index))
  }
  const handleCityChange = (e)=>{
    const {name,value} = e.target;
    setFormData((prev)=>({...prev, [name]:value}))
    const checkCity = citiesLocationsData?.filter((city)=>city.city === value);
    setCityData(checkCity)
  }

  function handleKeywordKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault()
      handleAddKeyword()
    }
  }
  const [detailedDescription, setDetailedDescription] = useState("");
  const dispatch = useDispatch();
    const handleSubmit = async (e) => {
    e.preventDefault();
     const payload = new FormData();

    // Simple fields
    payload.append("projectTitle", formData.projectTitle);
    payload.append("seo_title", formData.seo_title);
    payload.append("seo_description", formData.seo_description);
    payload.append("slug", formData.slug);
    payload.append("city", formData.city);
    payload.append("location", formData.location);
    payload.append("type", formData.type);
    payload.append("minItemPrice", formData.minItemPrice);
    payload.append("maxItemPrice", formData.maxItemPrice);
    payload.append("detailedDescription", detailedDescription);
    payload.append("isFeatured", formData.isFeatured);
    payload.append("isSponsored", formData.isSponsored);
    payload.append("map", formData.map);
    payload.append("projectOwnerPhone", formData.projectOwnerPhone);
    payload.append("projectOwnerEmail", formData.projectOwnerEmail);
    payload.append("projectOwnerWhatsappAPI", formData.projectOwnerWhatsappAPI);

    // JSON-stringified fields
    payload.append("items", JSON.stringify(formData.items));
    payload.append("features", JSON.stringify(formData.features));
    payload.append("floorPlans", JSON.stringify(formData.floorPlans));
    payload.append("paymentPlans", JSON.stringify(formData.paymentPlans));
    payload.append("offering", JSON.stringify(formData.offering));
    payload.append("developedBy", JSON.stringify({
      developer: formData.developedBy.developer,
      description: formData.developedBy.description,
      // logo will be appended separately as file
    }));
    payload.append("marketingBy", JSON.stringify({
      platform: formData.marketingBy.platform,
      description: formData.marketingBy.description,
      // logo will be appended separately as file
    }));

    // Single file uploads
    if (formData.projectLogo) {
      payload.append("projectLogo", formData.projectLogo);
    }

    if (formData.developedBy.logo) {
      payload.append("developedByLogo", formData.developedBy.logo); // rename to match backend if needed
    }

    if (formData.marketingBy.logo) {
      payload.append("marketingByLogo", formData.marketingBy.logo); // rename to match backend if needed
    }

  keywords.forEach((keyword) => {
    payload.append("keywords", keyword);
  });
  formData.images.forEach((file) => {
    payload.append("images", file);
  });
    // ---------- Floor Plans ----------
payload.append(
  "floorPlans",
  JSON.stringify(
    formData.floorPlans.map(fp => ({
      floorName: fp.floorName
    }))
  )
);

formData.floorPlans.forEach(fp => {
  if (fp.floorImage) {
    payload.append("floorPlanImages", fp.floorImage);
  }
});

// ---------- Payment Plans ----------
payload.append(
  "paymentPlans",
  JSON.stringify(
    formData.paymentPlans.map(pp => ({
      paymentName: pp.paymentName
    }))
  )
);

formData.paymentPlans.forEach(pp => {
  if (pp.paymentImage) {
    payload.append("paymentPlanImages", pp.paymentImage);
  }
});

dispatch(CreateProjectAdmin({formData:payload}))
  };
  const handleImagesChange = (e) => {
  const files = Array.from(e.target.files);
  setFormData(prev => ({ ...prev, images: files }));
};
  const handleProjectLogoImageChange = (e)=>{
    const file = e.target.files[0];
    setFormData((prev)=>({...prev,projectLogo:file}))
  }
  const handleDevelopedByLogoChange = (e)=>{
    const file = e.target.files[0];
    setFormData((prev)=>({...prev,developedBy:{...prev.developedBy,logo:file}}))
  }
  const handleMarketingByLogoChange = (e)=>{
    const file = e.target.files[0];
    setFormData((prev)=>({...prev,marketingBy:{...prev.marketingBy,logo:file}}))
  }

  /* ================= ITEMS ================= */
  const addItem = () => {
    setFormData((p) => ({
      ...p,
      items: [...p.items, createItem()],
    }));
  };

  const removeItem = (itemIndex) => {
    setFormData((p) => ({
      ...p,
      items: p.items.filter((_, i) => i !== itemIndex),
    }));
  };

  const updateItem = (index, field, value) => {
    setFormData((p) => {
      const items = [...p.items];
      items[index] = { ...items[index], [field]: value };
      return { ...p, items };
    });
  };

  /* ================= SUB ITEMS ================= */
  const addSubItem = (itemIndex) => {
    setFormData((p) => {
      const items = [...p.items];
      const subItems = [...items[itemIndex].subItems, createSubItem()];

      items[itemIndex] = {
        ...items[itemIndex],
        subItems,
      };

      return { ...p, items };
    });
  };

  const removeSubItem = (itemIndex, subIndex) => {
    setFormData((p) => {
      const items = [...p.items];
      const subItems = items[itemIndex].subItems.filter((_, i) => i !== subIndex);

      items[itemIndex] = {
        ...items[itemIndex],
        subItems,
      };

      return { ...p, items };
    });
  };

  const updateSubItem = (itemIndex, subIndex, field, value) => {
    setFormData((p) => {
      const items = [...p.items];
      const subItems = [...items[itemIndex].subItems];

      subItems[subIndex] = {
        ...subItems[subIndex],
        [field]: value,
      };

      items[itemIndex] = {
        ...items[itemIndex],
        subItems,
      };

      return { ...p, items };
    });
  };

  /* ================= SUBMIT ================= */


  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0 rounded-4">
        <CardBody>
          <h3 className="text-center fw-bold mb-4">Create Project</h3>

          <Form onSubmit={handleSubmit}>
            <div className="form-inputs">
                                <h6>SEO Box</h6>
                                <Row className="gx-2 gx-sm-3">
                                  <Col sm="12" className="form-group">
                                    <input name="seo_title" value={formData.seo_title} onChange={(e)=>setFormData({...formData, seo_title:e.target.value})} type="text" className="form-control" placeholder="Enter SEO Title (under 70 character)" />
                                  </Col>
                                  <Col sm="12" className="form-group">
                                   <input name="seo_description" value={formData.seo_description} onChange={(e)=>setFormData({...formData, seo_description:e.target.value})} type="text" className="form-control" placeholder="Enter SEO Description (under 150 character)" />
                                  </Col>
                                  <Col sm="12" className="form-group">
                                   <input name="slug" value={formData.slug} onChange={(e)=>setFormData({...formData, slug:e.target.value})} type="text" className="form-control" placeholder="Enter Slug(Most Important) ex. my-first-project-5-kanal" />
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
                                    style={{background:"#14a800"}}
                                    disabled={!keywordInput.trim() || keywords.includes(keywordInput.trim())}
                                  >
                                    <Plus className="h-75 w-75" />
                                  </button>
                                </div>
            
                                {keywords.length > 0 ? (
                                  <div className="d-flex mt-2 flex-wrap gap-2">
                                    {keywords.map((keyword, index) => (
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
            {/* BASIC INFO */}
            <Row>
              {[
                ["projectTitle", "Project Title"],
              ].map(([name, label]) => (
                <Col md={6} key={name}>
                  <FormGroup>
                    <Label>{label}</Label>
                    <Input
                      name={name}
                      value={formData[name]}
                      onChange={(e)=>setFormData({...formData, projectTitle:e.target.value})}
                      placeholder={`Please enter ${label}`}
                      
                    />
                  </FormGroup>
                </Col>
              ))}
              <Col md={6}>
                  <FormGroup>
                    <Label>Project Type</Label>
                    <Input
                      name={formData.type}
                      value={formData.type}
                      onChange={(e)=>setFormData({...formData, type:e.target.value})}
                      type="select"
                      className="form-control"
                      
                    >
                      <option value={""}>Select Type</option>
                      {propertyTypesData.map((item,index) => (
    <optgroup key={index} label={item.mainType}>
      {item.types.map((sub,index) => (
        <option key={index} value={sub}>
          {sub}
        </option>
      ))}
    </optgroup>
  ))}
                    </Input>
                  </FormGroup>
                </Col>
            </Row>
            <Row className="mb-2">
              <Col lg="6">
              <FormGroup><Label>City</Label>
              <Input
              type="select"
              name="city"
              onChange={handleCityChange}
              value={formData.city}
              className="form-control"
              >
                <option value={""}>Select City</option>
                {citiesLocationsData.map((city,index)=>{
                  return <option key={index} value={city.city}>{city.city}</option>
                })}
              </Input>
              </FormGroup>
              </Col>
              <Col lg="6">
              <FormGroup>
                <Label>Address</Label>
             
               {(cityData === null || cityData && cityData[0]?.subCities?.length>0) ? (
                 <Input
                   type="select"
                   name="location"
                   value={formData.location}
                   onChange={(e) =>
                     setFormData({ ...formData, location: e.target.value })
                   }
                   className="form-control"
                 >
                   <option value="">Select Location</option>
                   {cityData===null && <option value="">please select first city</option>}
                   {cityData && cityData[0].subCities.map((city, index) => (
                     <option key={index} value={city}>
                       {city}
                     </option>
                   ))}
                 </Input>
               ) : (
                 <Input
                   type="text"
                   name="location"
                   value={formData.location}
                   onChange={(e) =>
                     setFormData({ ...formData, location: e.target.value })
                   }
                   placeholder="Enter Address"
                   className="form-control"
                 />
               )}
              </FormGroup>
              </Col>
            </Row>

            {/* PRICE */}
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Min Price</Label>
                  <Input
                    type="number"
                    name="minItemPrice"
                    value={formData.minItemPrice}
                      onChange={(e)=>setFormData({...formData, minItemPrice:e.target.value})}
                    placeholder="Enter min price of overall prices"
                    
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Max Price</Label>
                  <Input
                    type="number"
                    name="maxItemPrice"
                    value={formData.maxItemPrice}
                      onChange={(e)=>setFormData({...formData, maxItemPrice:e.target.value})}
                    placeholder="Enter max price overall prices"
                    
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Project Logo</Label>
                  <Input
                    type="file"
                    name="projectLogo"
                    onChange={handleProjectLogoImageChange}
                    
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Project Images</Label>
                  <Input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImagesChange}
                    
                  />
                </FormGroup>
              </Col>
        <Col sm="12" className="border p-2 rounded-2">
        <h5 className="fw-bold mb-3">Developed By</h5>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Developer Name</Label>
              <Input
                type="text"
                name="developer"
                value={formData.developedBy.developer}
                onChange={(e)=>setFormData({...formData,developedBy:{...formData.developedBy,developer:e.target.value}})}
                placeholder="Enter Developer Name"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Developer Logo</Label>
              <Input
                type="file"
                name="logo"
                className="form-control"
                onChange={handleDevelopedByLogoChange}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="textarea"
                name="description"
                value={formData.developedBy.description}
                onChange={(e)=>setFormData({...formData,developedBy:{...formData.developedBy,description:e.target.value}})}
                placeholder="Enter Description"
                rows={3}
              />
            </FormGroup>
          </Col>
        </Row>
        </Col>

        <Col sm="12" className="border p-2 rounded-2 mt-4">
        <h5 className="fw-bold mb-3">Marketing By</h5>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Platform Name</Label>
              <Input
                type="text"
                name="platform"
                value={formData.marketingBy.platform}
                onChange={(e)=>setFormData({...formData,marketingBy:{...formData.marketingBy,platform:e.target.value}})}
                placeholder="Enter Platform Name"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Marketing Logo</Label>
              <Input
                type="file"
                name="logo"
                onChange={handleMarketingByLogoChange}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="textarea"
                value={formData.marketingBy.description}
                onChange={(e)=>setFormData({...formData,marketingBy:{...formData.marketingBy,description:e.target.value}})}
                name="description"
                placeholder="Enter Description"
                rows={3}
              />
            </FormGroup>
          </Col>
        </Row>
        </Col>

            </Row>

            {/* ITEMS */}
            <h5 className="fw-bold mt-4">Items</h5>

            {formData.items.map((item, i) => (
              <Card key={i} className="mb-3 border">
                <CardBody>
                  <Row className="align-items-center">
                    <Col md={4}>
                      {/* <Input
                        value={item.itemTitle}
                        onChange={(e) =>
                          updateItem(i, "itemTitle", e.target.value)
                        }
                      /> */}
                      <Input
                      name={formData.type}
                      value={item.itemTitle}
                      onChange={(e) =>
                          updateItem(i, "itemTitle", e.target.value)
                        }
                      type="select"
                      className="form-control"
                      
                    >
                      <option value={""}>Select Type</option>
                      {propertyTypesData.map((item,index) => (
    <optgroup key={index} label={item.mainType}>
      {item.types.map((sub,index) => (
        <option key={index} value={sub}>
          {sub}
        </option>
      ))}
    </optgroup>
  ))}
                    </Input>
                    </Col>
                    <Col md={3}>
                      <Input
                        type="number"
                        placeholder="Min Price"
                        value={item.parentMinPrice}
                        onChange={(e) =>
                          updateItem(i, "parentMinPrice", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <Input
                        type="number"
                        placeholder="Max Price"
                        value={item.parentMaxPrice}
                        onChange={(e) =>
                          updateItem(i, "parentMaxPrice", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        color="danger"
                        outline
                        onClick={() => removeItem(i)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>

                  {/* SUB ITEMS */}
                  <h6 className="mt-3">Sub Items</h6>

                  {item.subItems.map((sub, s) => (
                    <Row key={s} className="g-2 align-items-center mb-2">
                      <Col md={2}>
                        <Input
                          placeholder="Title"
                          value={sub.subItemTitle}
                          onChange={(e) =>
                            updateSubItem(
                              i,
                              s,
                              "subItemTitle",
                              e.target.value
                            )
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Input
                          type="number"
                          placeholder="Min"
                          value={sub.minPrice}
                          onChange={(e) =>
                            updateSubItem(i, s, "minPrice", e.target.value)
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={sub.maxPrice}
                          onChange={(e) =>
                            updateSubItem(i, s, "maxPrice", e.target.value)
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Input
                        type="select"
                          placeholder="Area"
                          value={sub.areaSize}
                          className="form-control"
                          onChange={(e) =>
                            updateSubItem(i, s, "areaSize", e.target.value)
                          }
                        >
                          <option value={""}>Selecte area size</option>
                          {areaSizes.map((item,index)=>{
                            return <option key={index} value={item}>{item}</option>
                          })}
                        </Input>
                      </Col>
                      <Col md={1}>
                        <Input
                          placeholder="Beds"
                          value={sub.beds}
                          onChange={(e) =>
                            updateSubItem(i, s, "beds", e.target.value)
                          }
                        />
                      </Col>
                      <Col md={1}>
                        <Input
                          placeholder="Baths"
                          value={sub.bathrooms}
                          onChange={(e) =>
                            updateSubItem(i, s, "bathrooms", e.target.value)
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          size="sm"
                          color="danger"
                          outline
                          onClick={() => removeSubItem(i, s)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => addSubItem(i)}
                  >
                    + Add Sub Item
                  </Button>
                </CardBody>
              </Card>
            ))}

            <Button color="success" className="mb-4" outline onClick={addItem}>
              + Add Item
            </Button>
            <FloorPlansForm formData={formData} setFormData={setFormData} />
            <PaymentPlansForm formData={formData} setFormData={setFormData} />
            <FeaturesForm formData={formData} setFormData={setFormData} />
            <OfferingForm formData={formData} setFormData={setFormData} />
            {/* FEATURED / SPONSORED */}
            <Row className="mt-4">
              <Col md={6}>
                <Label>Featured</Label>
                <Input
                  type="select"
                  name="isFeatured"
                  value={formData.isFeatured}
                  onChange={(e)=>setFormData({...formData,isFeatured:e.target.value})}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Input>
              </Col>
              <Col md={6}>
                <Label>Sponsored</Label>
                <Input
                  type="select"
                  name="isSponsored"
                  value={formData.isSponsored}
                  onChange={(e)=>setFormData({...formData,isSponsored:e.target.value})}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Input>
              </Col>
              <Col md={6} className="mt-4">
            <FormGroup>
              <Label>Project owner email</Label>
              <Input
                type="email"
                name="projectOwnerEmail"
                placeholder="Enter owner email"
                value={formData.projectOwnerEmail}
                onChange={(e) => setFormData({...formData, projectOwnerEmail: e.target.value})}
              />
            </FormGroup>
          </Col>
              <Col md={6} className="mt-4">
            <FormGroup>
              <Label>Project owner phone</Label>
              <Input
                type="number"
                name="projectOwnerPhone"
                placeholder="Enter owner phone number"
                value={formData.projectOwnerPhone}
                onChange={(e) => setFormData({...formData, projectOwnerPhone: e.target.value})}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Project owner whatsappapi</Label>
              <Input
                type="text"
                name="projectOwnerWhatsappAPI"
                placeholder="Enter owner whatsappAPI"
                value={formData.projectOwnerWhatsappAPI}
                onChange={(e) => setFormData({...formData, projectOwnerWhatsappAPI: e.target.value})}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Map link</Label>
              <Input
                type="text"
                name="map"
                value={formData.map}
                placeholder="Enter map link"
                onChange={(e) => setFormData({...formData, map: e.target.value})}
              />
            </FormGroup>
          </Col>
            </Row>
            <Row>
              <Col md={12} className="mt-3">
                <RichTextEditor
        value={detailedDescription}
        onChange={setDetailedDescription}
      />
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button disabled={createprojectloading} size="lg" color="success" outline>
                {createprojectloading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CreateProject;
