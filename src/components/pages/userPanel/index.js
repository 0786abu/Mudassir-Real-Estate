"use client"
import React, { useEffect, useState } from "react";
import { Col, Container, Row, TabContent, TabPane } from "reactstrap";
import CreatePropertyTab from "./createPropertyTab";
import FavoritesTab from "./favouritesTab";
import MyListingTab from "./myListingTab";
import MyProfileTab from "./myProfileTab";
import PrivacyTab from "./privacyTab.js";
import UserDashboardTab from "./userDashboardTab";
import UserPanelSidebar from "./UserPanelSidebar";
import { useDispatch, useSelector } from "react-redux";
import { MyProfileData } from "@/redux-toolkit/action/authAction";
import ProfileLoader from "@/components/common/Loader";
import PropertyDetails from "./proeprtyDetail";
import { toast } from "react-toastify";
import EditProperty from "./EditProperty";

const BodyContent = ({ active }) => {
  const [activeTab, setActiveTab] = useState(active);
  const {user,userloading,socialloading} = useSelector((state)=>state.Auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(MyProfileData());
  },[dispatch])

  return (
    <section style={{minHeight:"60vh"}} className='user-dashboard small-section'>
      {(userloading && !user) ? (<ProfileLoader/>) : (
        <Container>
        <Row>
          <UserPanelSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} loading={userloading} socialloading={socialloading} />
          <Col lg='9'>
           {activeTab === "Dashboard" && <UserDashboardTab />}

  {activeTab === "Listing" && <MyListingTab setActiveTab={setActiveTab} />}

  {activeTab === "CreateProperty" && <CreatePropertyTab />}

  {activeTab === "Profile" && (
    <MyProfileTab user={user} loading={userloading} />
  )}

  {activeTab === "propertyDetail" && <PropertyDetails />}
  {activeTab === "editProperty" && <EditProperty />}
  {activeTab === "Favorites" && <FavoritesTab />}

  {activeTab === "Privacy" && <PrivacyTab />}
          </Col>
        </Row>
      </Container>
      )}
    </section>
  );
};

export default BodyContent;
