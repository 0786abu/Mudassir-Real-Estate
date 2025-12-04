import React, { useEffect, useState } from "react";
import { Mail, MapPin } from "react-feather";
import { Row } from "reactstrap";
import ChangeDetails from "./ChangeDetails";
import EditProfile from "./EditProfile";
import VerifiedPhoneNumber from "./VerifiedPhoneModal";

export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

const MyProfileTab = ({user,loading}) => {
  const [modal, setModal] = useState();
  const [profileDetail, setProfileDetail] = useState();

  useEffect(()=>{
    if(user){
      setProfileDetail(user);
    }
  },[user])
   
  return (
    <div className="dashboard-content">
      <div className="my-profile" id="profile">
        <div className="profile-info">
          <div className="common-card">
            <div className="user-name media">
              <div className="media-body">
                <h5>
                  {user?.name} <span style={{marginRight:"4px"}} className="label label-success">{user?.role}</span>
                  
                </h5>
              </div>
              <span className="label label-light label-flat" onClick={() => setModal("editProfile")}>
                Edit
              </span>
            </div>
            <ul className="user-detail">
              <li>
                <MapPin />
                <span> {user?.city ? user?.city : "Not yet"}</span>
              </li>
              <li>
                <Mail />
                <span>{user?.email}</span>
              </li>
              <li style={{margin:"0px 4px", color:"white", background:"orange"}} className="label label-success">Email: {user?.isEmailVerified ? "verified" : "unVerified"}</li>
                 <li style={{margin:"0px 4px", color:"white",background:"blue"}} className="label label-success">Phone: {user?.isPhoneVerified ? "verified" : "unVerified"}</li>
            </ul>
            <p className="font-roboto">
              {user?.bio ? user?.bio : <span className="user-bio">Not bio yet</span>}
            </p>
          </div>
          <div className="common-card">
            <Row>
              <div className="col-xxl-6 col-xl-7">
                <div className="information-detail">
                  <div className="common-header">
                    <h5>About</h5>
                  </div>
                  <div className="information">
                    <ul>
                      <li>
                        <span>Gender :</span>
                        <p>{user?.gender ? user?.gender : "Still not selected"}</p>
                      </li>
                      <li>
                        <span>Birthday :</span>
                        <p>{user?.DOB ? formatDatenew(user?.DOB) : "Still not Added"}</p>
                      </li>
                      <li>
                        <span>Phone number :</span>
                        <a>{ (user?.phone && !user?.isPhoneVerified) ? <>{user?.phone} Still not Verified <span style={{color:"blue"}} onClick={()=>setModal("phone")}>Edit Phone</span></> : !user?.phone ? <>Still not added <span onClick={()=>setModal("phone")} style={{color:"blue"}}>Add Phone</span></> : user?.phone }</a>
                      </li>
                      <li>
                        <span>State :</span>
                        <p>{user?.state ? user?.state : "Still not Added"}</p>
                      </li>
                      <li>
                        <span>Address :</span>
                        <p>{user?.address ? user?.address : "Still not Added"}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="information-detail">
                  <div className="common-header">
                    <h5>Login Details</h5>
                  </div>
                  <div className="information">
                    <ul>
                      <li>
                        <span>Change Password :</span>
                        {/* <a>{Array(profileDetail.password.length).fill("*").join("")}</a> */}
                        <span className="label label-light label-flat" onClick={() => setModal("changePass")}>
                          Edit
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-0">
                <div className="about-img d-xl-block d-none">
                  <img src="/assets/images/inner-pages/2.png" className="img-fluid" alt="" />
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
      <EditProfile toggle={"editProfile" === modal ? true : false} loading={loading} setModal={setModal} profileDetail={profileDetail} setProfileDetail={setProfileDetail} />
      <ChangeDetails
        toggle={"changePass" === modal ? true : false}
        setModal={setModal}
      />
      <VerifiedPhoneNumber
        toggle={"phone" === modal ? true : false}
        setModal={setModal}
        alreadyphone={user?.phone}
      />

    </div>
  )
};

export default MyProfileTab;
