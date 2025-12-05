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

const BodyContent = ({ active }) => {
  const [activeTab, setActiveTab] = useState(active);
  const {user,userloading,socialloading} = useSelector((state)=>state.Auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(MyProfileData());
  },[dispatch])

  return (
    <section className='user-dashboard small-section'>
      {(userloading && !user) ? (<ProfileLoader/>) : (
        <Container>
        <Row>
          <UserPanelSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} loading={userloading} socialloading={socialloading} />
          <Col lg='9'>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='Dashboard'>
                <UserDashboardTab />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='Listing'>
                <MyListingTab />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='CreateProperty'>
                <CreatePropertyTab />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='Profile'>
                <MyProfileTab user={user} loading={userloading}/>
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='Favorites'>
                <FavoritesTab />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='Privacy'>
                <PrivacyTab />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
      )}
    </section>
  );
};

export default BodyContent;
