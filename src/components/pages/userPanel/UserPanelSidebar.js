/**
 * It takes the file from the input field and displays it in the image tag
 * @returns A Col component with a div inside of it.
 */
"use client"
import Image from "next/image";
import React, { useState } from "react";
import { Camera } from "react-feather";
import { BiEdit } from "react-icons/bi";
import { BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { RiGlobalLine } from "react-icons/ri";
import { Button, Col, Nav, NavItem, NavLink } from "reactstrap";
import SocialLinksModal from "./myProfileTab/SocialLinksModal";
import { useDispatch, useSelector } from "react-redux";
import { UploadProfile } from "@/redux-toolkit/action/authAction";
import { TbTrash } from "react-icons/tb";

const UserPanelSidebar = ({ activeTab, setActiveTab, user, loading, socialloading }) => {
   const [modal, setModal] = useState(false);
   const {uploadloading} = useSelector((state)=>state.Auth);
   const [preview, setPreview] = useState();
   const [profilePicture, setProfilePicture] = useState();
   const dispatch = useDispatch();
   const handleChange = (e)=>{
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file))
   }
   const handleSubmit = ()=>{
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    dispatch(UploadProfile(formData,setPreview))
   }
   const cancelUpload = ()=>{
    setPreview("")
   }

  const toggle = () => setModal(!modal);
  return (
    <Col lg='3'>
        <div><SocialLinksModal socialMedia={user?.socialMedia} toggle={toggle} modal={modal} socialloading={socialloading}/></div>
        
      <div className='sidebar-user sticky-cls'>
        <div className='user-profile'>
          <div className='media'>
            <div className='change-pic'>
              <Image width={80} height={80} src={preview ? preview : user?.role==="agent" ? (user?.agencyProfile ? user?.agencyProfile?.url : '/assets/images/avatar/3.jpg') : (user?.profile ? user?.profile?.url : "/assets/images/avatar/3.jpg")} className='img-fluid update_img' style={{width:"60px",height:"60px",objectFit:"cover"}} alt='' />
              <div className='change-hover'>
                <button type='button' className='btn'>
                  <Camera />
                </button>
                <input
                  className='updateimg'
                  type='file'
                  name='img'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='media-body'>
              <h5>{loading ? "......":user?.name}</h5>
              <h6 className='font-roboto'>{loading ? "......":user?.email}</h6>
              <h6 className='font-roboto mb-0'>{loading ? "....." : user?.phone ? user?.phone : "No Phone no. Yet"}</h6>
            </div>
          </div>
          {preview && (
          <div style={{marginBottom:"10px",dispatch:"flex",justifyContent:"center",alignItems:"center", gap:"10px"}}>
          <Button size="sm" onClick={handleSubmit} className="btn btn-gradient" style={{marginRight:"10px"}}>{uploadloading ? "Uploading...":"upload Image"}</Button>
          <Button size="sm" onClick={cancelUpload}><TbTrash/> Cancle</Button>
        </div>
        )}
            {user?.role==="agent" && (
          <div className='connected-social'>
            <h6>Connect with</h6>
              <div className=" d-flex align-content-center gap-2">
                {user?.socialMedia && (
                <ul className=''>
              {user?.socialMedia?.facebook && (
                <li>
                <a href={user?.socialMedia?.facebook} className='facebook'>
                 <FaFacebookSquare size={20} className="social-icon1"/>
                </a>
              </li>
              )}
              {user?.socialMedia?.instagram && (
              <li>
  <a href={user?.socialMedia?.instagram} className="instagram">
    <GrInstagram size={20} className="social-icon2" />
  </a>
</li>
               )} 
              
              {user?.socialMedia?.linkedin && (
                <li>
                <a href={user?.socialMedia?.linkedin} className='google'>
                  <BsLinkedin size={20} className="social-icon3"/>
                </a>
              </li>
              )}
              {user?.socialMedia?.youtube && (
                <li>
                <a href={user?.socialMedia?.youtube} className='linkedin'>
                  <BsYoutube size={20} className="social-icon4"/>
                </a>
              </li>
              )}
             {user?.socialMedia?.website && (
               <li>
                <a href={user?.socialMedia?.website} className='website'>
                  <RiGlobalLine size={20} className="social-icon5"/>
                </a>
              </li>
             )}
            </ul>
              )}
              <button onClick={toggle} className="social-button">{!user?.socialMedia ? "Add Social Network":(<><BiEdit size={20}/> Edit</>)}</button>
              </div>
          </div>
            )}
        </div>
        <div className='dashboard-list'>
          <Nav tabs className='right-line-tab'>
            <NavItem>
              <NavLink className={activeTab === "Dashboard" ? "active" : ""} onClick={() => setActiveTab("Dashboard")}>
                Dashboard
              </NavLink>
            </NavItem>
              <NavItem>
                <NavLink className={activeTab === "Listing" ? "active" : ""} onClick={() => setActiveTab("Listing")}>
                  My Properties
                </NavLink>
              </NavItem>
            <NavItem>
              <NavLink className={activeTab === "CreateProperty" ? "active" : ""} onClick={() => setActiveTab("CreateProperty")}>
                create property
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "Profile" ? "active" : ""} onClick={() => setActiveTab("Profile")}>
                My profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "Favorites" ? "active" : ""} onClick={() => setActiveTab("Favorites")}>
                favourites
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "payments" ? "active" : ""} onClick={() => setActiveTab("payments")}>
                Payments
              </NavLink>
            </NavItem>
            {/* {user?.role==="agent" && (
              <NavItem>
              <NavLink className={activeTab === "Privacy" ? "active" : ""} onClick={() => setActiveTab("Privacy")}>
                Privacy
              </NavLink>
            </NavItem>
            )} */}
          </Nav>
        </div>
      </div>
    </Col>
  );
};

export default UserPanelSidebar;
