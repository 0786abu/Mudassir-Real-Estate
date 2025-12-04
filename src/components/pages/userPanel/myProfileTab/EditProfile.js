import { AgentUpdateProfile, UserUpdateProfile } from "@/redux-toolkit/action/authAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const pakistanStates = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan"
];



const EditProfile = ({ toggle, loading, setModal, profileDetail }) => {
  const [inputs, setInputs] = useState();
  const dispatch = useDispatch();
  const {registerloading} = useSelector((state)=>state.Auth);
  useEffect(()=>{
    if(profileDetail){
      setInputs(profileDetail)
    }
  },[profileDetail]);
 const handleChange = (event) => {
  const { name, value } = event.target;

  setInputs((prev) => {
    const updated = { ...prev };

    if (value.trim() === "") {
      delete updated[name];   // 💥 field remove — DB me nahi jaegi
    } else {
      updated[name] = value;  // normal value
    }

    return updated;
  });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs?.name);
    if(inputs?.gender){
      formData.append("gender", inputs?.gender);
    }
    if(inputs?.DOB){
      formData.append("DOB", inputs?.DOB);
    }
    if(inputs?.address){
      formData.append("address", inputs?.address);
    }
    if(inputs?.city){
      formData.append("city", inputs?.city);
    }
   if(inputs.state && inputs.state !== ""){
  formData.append("state", inputs.state);
}
    formData.append("bio", inputs?.bio);
    if(profileDetail?.role==="agent"){
      if(inputs?.whatsappAPI){
        formData.append("whatsappAPI", inputs?.whatsappAPI);
      }
      if(inputs?.agencyName){
        formData.append("agencyName", inputs?.agencyName);
      }
    }
    if(profileDetail?.role==="individual"){
      dispatch(UserUpdateProfile(formData,setModal))
    }else{
      dispatch(AgentUpdateProfile(formData,setModal))
    }
  };

  return (
   <div>
    {loading ? (<div className="dashboard-container">Wait...</div>) : (
       <div className="modal fade edit-profile-modal" id="edit-profile">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <Modal className="modal-content" isOpen={toggle} size="lg">
          <ModalHeader className="modal-header">
            <p className="modal-title">Edit Profile</p>
            <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}>
              <span aria-hidden="true">×</span>
            </Button>
          </ModalHeader>
          <ModalBody className="modal-body">
            <Form id="modal-form" onSubmit={handleSubmit}>
              <Row className=" gx-3">
                <Col md="6" className="form-group">
                  <Label htmlFor="first">Name</Label>
                  <Input name="name" type="text" className="form-control" id="first" placeholder="Name" value={inputs?.name || ""} onChange={handleChange} />
                </Col>
                {profileDetail?.role==="agent" && (
                  <Col md="6" className="form-group">
                  <Label htmlFor="first">Agency Name</Label>
                  <Input name="agencyName" type="text" className="form-control" id="first" placeholder="Agency name" value={inputs?.agencyName || ""} onChange={handleChange} />
                </Col>
                )}
                <div className="form-group col-md-6">
                  <Label htmlFor="gender">Gender</Label>
                  <select name="gender" id="gender" className="form-control" value={inputs?.gender} onChange={handleChange}>
                    <option value={""}>Select gender</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Male"}>Male</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <Label>Birthday</Label>
                  <Input name="DOB" type="date" className="form-control" placeholder="18 april" id="datepicker" value={inputs?.DOB || ""} onChange={handleChange} />
                </div>
                <div className="form-group col-6">
                  <Label htmlFor="inputAddress">Address</Label>
                  <Input name="address" type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={inputs?.address || ""} onChange={handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">City</label>
                  <input name="city" type="text" className="form-control" id="inputCity" value={inputs?.city || ""} onChange={handleChange} />
                </div>
                {profileDetail?.role==="agent" ? (
                    <div className="form-group col-md-6">
                  <label htmlFor="inputCity">Whatsapp Api</label>
                  <input name="whatsappAPI" type="text" className="form-control" id="inputCity" value={inputs?.whatsappAPI || ""} onChange={handleChange} />
                </div>
                ) : ""}
                <div className="form-group col-md-6">
                  <label htmlFor="inputState">State</label>
                  <select name="state" id="inputState" className="form-control" value={inputs?.state} onChange={handleChange}>
                    <option value="">Select state</option>
                    {pakistanStates.map((state,index)=>{
                      return <option key={index} value={state}>{state}</option>
                    })}
                  </select>
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputCity">Bio</label>
                  <textarea name="bio" type="text" className="form-control" id="inputCity" placeholder="Enter bio..." value={inputs?.bio || ""} onChange={handleChange} />
                </div>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <Button
              type="button"
              className="btn btn-dashed btn-pill"
              data-bs-dismiss="modal"
              onClick={() => {
                setModal(false);
              }}>
              Cancel
            </Button>
            <Button type="submit" disabled={registerloading} className="btn btn-gradient btn-pill" data-bs-dismiss="modal" form="modal-form">
              {registerloading ? "Loading..." : "Save changes"}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
    )}
   </div>
  );
};

export default EditProfile;
