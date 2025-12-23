"use client";

import ProfileLoader from "@/components/common/Loader";
import { AdminProfileData, UploadProfile } from "@/redux-toolkit/action/authAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const AdminProfile = () => {
    const {user,userloading,uploadloading} = useSelector((state)=>state.Auth);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    gender: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    role: "",
    profile: null,
  });
  useEffect(()=>{
    dispatch(AdminProfileData())
  },[dispatch])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setProfile({ ...profile, profile: file});
    setPreview(URL.createObjectURL(file))
  };
  const handleCancel = ()=>{
    setPreview(null);
    setProfile((prev)=>({...prev, profile:user?.profile}))
  }
  const handleUploadImage = ()=>{
    const formData = new FormData();
    formData.append("profilePicture", profile?.profile)
    dispatch(UploadProfile(formData,setPreview))
  }
  useEffect(()=>{
    if(user){
      setProfile({
        name:user?.name,
        email:user?.email,
        profile:user?.profile,
        gender:user?.gender,
        phone:user?.phone,
        city:user?.city,
        adress:user?.adress,
        state:user?.state,
        role:user?.role,
        bio:user?.bio,
      })
    }
  },[user])

  return (
    <Container fluid className="py-4">
      {userloading ? <ProfileLoader/> : (
        <Row className="justify-content-center">
        <Col xl="8">
          <Card className="border-0 shadow-sm rounded-4">
            <CardBody className="p-4">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-semibold mb-0">Admin Profile</h4>

                {!isEdit ? (
                  <Button color="primary" outline onClick={() => setIsEdit(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button color="secondary" outline onClick={() => setIsEdit(false)}>
                    Cancel
                  </Button>
                )}
              </div>

              {/* Profile Image */}
              <div className="profile-image-wrapper">
  <input
    type="file"
    id="profileImage"
    accept="image/*"
    className="d-none"
    onChange={handleImageChange}
  />

  <label htmlFor="profileImage" className="profile-image-label">
    <img
      src={preview ? preview : profile.profile?.url ? profile.profile?.url : "/assets/images/profile.webp"}
      alt="profile"
      className="profile-img"
    />

    {/* Hover Overlay */}
    <div className="image-overlay">
      <i className="fas fa-camera"></i>
      <span>Edit</span>
    </div>
  </label>
</div>
  {preview !== null && (
    <div className=" d-flex justify-content-center my-2 gap-2">
    <Button size="sm" onClick={handleUploadImage} style={{background:"#108A00"}}>{uploadloading ? "Uploading...":"Submit"}</Button>
    <Button color="light" onClick={handleCancel} size="sm">Cancel</Button>
  </div>
  )}

              {/* ================= VIEW MODE ================= */}
              {!isEdit && (
                <>
                  <Row className="gy-3">
                    <Col md="6">
                      <strong>Name</strong>
                      <p>{profile.name}</p>
                    </Col>

                    <Col md="6">
                      <strong>Email</strong>
                      <p>{profile.email}</p>
                    </Col>

                    <Col md="12">
                      <strong>Bio</strong>
                      <p>{profile.bio ? profile.bio : "No Bio Yet"}</p>
                    </Col>

                    <Col md="6">
                      <strong>Gender</strong>
                      <p>{profile.gender ? profile.gender : "No gender selected Yet"}</p>
                    </Col>

                    <Col md="6">
                      <strong>Role</strong>
                      <p>{profile.role}</p>
                    </Col>

                    <Col md="6">
                      <strong>Phone</strong>
                      <p>{profile.phone ? profile.biphoneo : "No phone Yet"}</p>
                    </Col>

                    <Col md="6">
                      <strong>City</strong>
                      <p>{profile.city ? profile.city : "No city added Yet"}</p>
                    </Col>

                    <Col md="6">
                      <strong>State</strong>
                      <p>{profile.state ? profile.state : "No state added Yet"}</p>
                    </Col>

                    <Col md="6">
                      <strong>Address</strong>
                      <p>{profile.address ? profile.address : "No address added Yet"}</p>
                    </Col>
                  </Row>
                </>
              )}

              {/* ================= EDIT MODE ================= */}
              {isEdit && (
                <Form>
                  <div className="text-center mb-4">
                    <input
                      type="file"
                      id="profileImage"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="profileImage" className="change-photo">
                      Change Profile Photo
                    </label>
                  </div>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Bio</Label>
                        <Input
                          type="textarea"
                          rows="3"
                          name="bio"
                          value={profile.bio}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>Gender</Label>
                        <Input
                          type="select"
                          name="gender"
                          value={profile.gender}
                          onChange={handleChange}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>Role</Label>
                        <Input disabled value={profile.role} />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>Phone</Label>
                        <Input
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>City</Label>
                        <Input
                          name="city"
                          value={profile.city}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>State</Label>
                        <Input
                          name="state"
                          value={profile.state}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>Address</Label>
                        <Input
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-end mt-4">
                    <Button color="primary" className="rounded-pill px-4">
                      Save Changes
                    </Button>
                  </div>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      )}
    </Container>
  );
};

export default AdminProfile;
