"use client"
import React, { useState } from 'react'
import { Button, Col, Form, Input, Row } from 'reactstrap';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AdminAddUserAgent } from '@/redux-toolkit/action/adminAction';
// import DropZones from '@/components/Common/Dropzones';

const AddUserForm = ({from}) => {
    const [userData, setUserData] = useState({
        name:"",
        email:"",
        password:"",
        from:from
    });
    const {registerloading} = useSelector((state)=>state.Auth);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [previewProfile, setPreviewProfile] = useState(null);
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setProfile(file);
        setPreviewProfile(URL.createObjectURL(file));
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserData((prev)=>({
            ...prev,[name]:value
        }))
    }
    const resetAll = ()=>{
        setUserData((prev)=>({
            ...prev,name:"",email:"",password:""
        }));
        setProfile(null);
        setPreviewProfile(null);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password",userData.password);
        formData.append("profile",profile);
        formData.append("from",userData.from);
        dispatch(AdminAddUserAgent(formData,resetAll))
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                    <Row className="gx-3">
                         {previewProfile && (
                             <div className=' m-auto mb-4 position-relative' style={{width:"100px",height:"100px"}}>
                            <Image 
                            src={previewProfile}
                            alt='preview user'
                            fill
                            className=' rounded-circle object-fit-cover'
                            />
                          </div>
                         )}
                        <Col sm="12" className="form-group">
                            <Input name="name" type="text" value={userData.name} onChange={handleChange} className="form-control" placeholder="Enter Your Name" label="First Name" />
                        </Col>
                        <Col sm="12" className="form-group">
                            <Input name="email" type="email" value={userData.email} onChange={handleChange} className="form-control" placeholder="Enter Your Email" label="Email Address" />
                        </Col>
                        <Col sm="12" className="form-group">
                            <Input name="password" type="text" value={userData.password} onChange={handleChange} className="form-control" placeholder="Enter Your Password" label="Password" />
                        </Col>
                        <Col sm="12" className="form-group">
                            <Input type="file" name="profile" onChange={handleImageChange} className="form-control" rows={4} label="Description" />
                        </Col>
                    </Row>
                    <div className="dropzone-admin mb-0">
                        <Col sm='12' className="form-btn">
                            <Button disabled={registerloading} type="submit" className="btn btn-gradient btn-pill">{registerloading ? "Submitting..." : "Submit"}</Button>
                            <Button onClick={resetAll} className="btn btn-dashed btn-pill">Reset All</Button>
                        </Col>
                    </div>
                </Form>
        </div>
    )
}

export default AddUserForm