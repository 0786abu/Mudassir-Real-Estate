"use client";
import React from "react";
import { Link, Mail, MapPin, PhoneCall } from "react-feather";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import Exploration from "@/layout/sidebarLayout/Exploration";
import Filter from "@/layout/sidebarLayout/Filter";
import RecentlyAdded from "@/layout/sidebarLayout/RecentlyAdded";
import Img from "@/utils/BackgroundImageRatio";
import GridView from "../../listing/gridView/grid/GridView";

const BodyContent = ({agent}) => {
  return (
    <section className="agent-section property-section agent-profile-wrap">
      <Container>
        <Row className=" ratio_55">
          <Col xl="9" lg="8" className=" property-grid-2">
            <div className="our-agent theme-card">
              <Row>
                <Col sm="6" className=" ratio_landscape">
                  <div className="agent-image bg-size">
                    <Img src={agent?.agencyProfile?.url} className="img-fluid bg-img" alt="" />
                    <span className="label label-shadow">{agent?.numOfProperties} Properties</span>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="our-agent-details">
                    <h3 className="f-w-600">{agent?.agencyName ? agent?.agencyName : agent?.name}</h3>
                    <h6>Real estate Property Agent</h6>
                    <ul>
                      <li>
                        <div className="media">
                          <div className="icons-square">
                            <MapPin />
                          </div>
                          <div className="media-body">
                            <h6>{agent?.address}</h6>
                          </div>
                        </div>
                      </li>
                          {agent?.phone && (
                      <li>
                        <div className="media">
                          <div className="icons-square">
                            <PhoneCall />
                          </div>
                            <div className="media-body">
                            <h6>{agent?.phone}</h6>
                          </div>
                        </div>
                      </li>
                          )}
                      <li>
                        <div className="media">
                          <div className="icons-square">
                            <Mail />
                          </div>
                          <div className="media-body">
                            <h6>{agent?.email}</h6>
                          </div>
                        </div>
                      </li>
                     {agent?.socialMedia?.website && (
                       <li className="with-link">
                        <div className="media">
                          <div className="icons-square">
                            <Link />
                          </div>
                          <div className="media-body">
                            <h6>
                              <a>https://www.sheltos.com</a>
                            </h6>
                          </div>
                        </div>
                      </li>
                     )}
                    </ul>
                  </div>
                    <ul className="agent-social">
 {agent?.socialMedia?.facebook && (
   <li>
    <a href={agent?.socialMedia?.facebook} className="facebook">
      <i className="fab fa-facebook-f"></i>
    </a>
  </li>
 )}
  {agent?.socialMedia?.instagram && (
    <li>
    <a href={agent?.socialMedia?.instagram} className="instagram">
      <i className="fab fa-instagram"></i>
    </a>
  </li>
  )}
 {agent?.socialMedia?.youtube && (
   <li>
    <a href={agent?.socialMedia?.youtube} className="google">
      <i className="fab fa-youtube"></i>
    </a>
  </li>
 )}
  {agent?.socialMedia?.linkedin && (
    <li>
    <a href={agent?.socialMedia?.linkedin} className="linkedin">
      <i className="fab fa-linkedin-in"></i>
    </a>
  </li>
  )}
</ul>
                </Col>
              </Row>
            </div>
            <div className="about-agent theme-card">
              <h3>About the agent</h3>
              <Row>
                <Col sm="12">
                  <p className="font-roboto">
                    {agent?.bio}
                  </p>
                </Col>
              </Row>
            </div>
            <GridView size={2} gridType={"grid-view"} gridBar={true} />
          </Col>
          <Sidebar>
            <Exploration />
            <Filter />
            <RecentlyAdded />
          </Sidebar>
        </Row>
      </Container>
    </section>
  );
};

export default BodyContent;
