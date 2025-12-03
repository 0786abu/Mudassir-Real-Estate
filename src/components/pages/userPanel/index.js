import React, { useState } from "react";
import { Col, Container, Row, TabContent, TabPane } from "reactstrap";
import CreatePropertyTab from "./createPropertyTab";
import FavoritesTab from "./favouritesTab";
import MyListingTab from "./myListingTab";
import MyProfileTab from "./myProfileTab";
import PrivacyTab from "./privacyTab.js";
import UserDashboardTab from "./userDashboardTab";
import UserPanelSidebar from "./UserPanelSidebar";

const BodyContent = ({ active, role }) => {
  const [activeTab, setActiveTab] = useState(active);

  return (
    <section className='user-dashboard small-section'>
      <Container>
        <Row>
          <UserPanelSidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
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
                <MyProfileTab role={role}/>
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
    </section>
  );
};

export default BodyContent;
