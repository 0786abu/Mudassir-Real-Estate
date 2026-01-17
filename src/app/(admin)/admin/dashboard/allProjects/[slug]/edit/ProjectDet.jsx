"use client";
import React, { useEffect, useState } from "react";
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
import { citiesLocationsData, propertyTypesData } from "@/utils/FiltersCities";
import { useDispatch, useSelector } from "react-redux";
import { AdminFetchProject, AdminUpdateProjectDetails, CreateProjectAdmin } from "@/redux-toolkit/action/projectAction";
import { Plus, X } from "lucide-react";
import FeaturesForm from "../../../addProject/Features";
import OfferingForm from "../../../addProject/Offering";
import RichTextEditor from "../../../addProject/TextEditor";
import ProfileLoader from "@/components/common/Loader";


const EditProject = ({slug}) => {
  const {createprojectloading,project,projectloading} = useSelector((state)=>state.Project)
  const [formData, setFormData] = useState({
    seo_title:"",
    seo_description:"",
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
    offering:[],
    features: {
        plotFeatures: [],
        forFamily_Lifestyle: [],
        forWork_Connectivity: [],
        forSafety_Maintenance: [],
        others: [],
    }
});
const [cityData, setCityData] = useState(null);
const [keywords, setKeywords] = useState([])
const [keywordInput, setKeywordInput] = useState("")
  function handleAddKeyword() {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  function handleRemoveKeyword(index) {
    setKeywords(keywords.filter((_, i) => i !== index))
  }
const handleCityChange = (e) => {
  const value = e.target.value;

  const selectedCity = citiesLocationsData.find(
    (item) => item.city === value
  );

  setCityData(selectedCity ? [selectedCity] : null);

  setFormData((prev) => ({
    ...prev,
    city: value,
    location: "", // 🔥 reset location
  }));
};

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
    formData.keywords = keywords;
    formData.detailedDescription
dispatch(AdminUpdateProjectDetails(slug,formData))
  };
  useEffect(()=>{
    dispatch(AdminFetchProject(slug))
  },[dispatch])
useEffect(() => {
  if (!project) return;

  const selectedCity = citiesLocationsData.find(
    (item) => item.city === project.city
  );

  setCityData(selectedCity ? [selectedCity] : null);

  setFormData({
    seo_title: project.seo_title || "",
    seo_description: project.seo_description || "",
    slug: project.slug || "",
    projectTitle: project.projectTitle || "",
    city: project.city || "",
    location: project.location || "",
    type: project.type || "",
    minItemPrice: project.minItemPrice || "",
    maxItemPrice: project.maxItemPrice || "",
    map: project.map || "",
    projectOwnerPhone: project.projectOwnerPhone || "",
    projectOwnerEmail: project.projectOwnerEmail || "",
    projectOwnerWhatsappAPI: project.projectOwnerWhatsappAPI || "",
    offering: project.offering || [],
    features: project.features || {},
  });
  setKeywords(project?.keywords)
  setDetailedDescription(project.detailedDescription || "");
}, [project]);

  const hasSubCities =
  Array.isArray(cityData?.[0]?.subCities) &&
  cityData[0].subCities.length > 0;

  return (
    <Container className="py-5">
     {projectloading ? <ProfileLoader /> : (
         <Card className="shadow-sm border-0 rounded-4">
        <CardBody>
          <h3 className="text-center fw-bold mb-4">Update Project</h3>

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

  {hasSubCities ? (
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
      {cityData[0].subCities.map((city, index) => (
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

            </Row>
            <FeaturesForm formData={formData} setFormData={setFormData} />
            <OfferingForm formData={formData} setFormData={setFormData} />
            {/* FEATURED / SPONSORED */}
            <Row className="mt-4">
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
                {createprojectloading ? "Updating..." : "Update"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
     )}
    </Container>
  );
};

export default EditProject;
