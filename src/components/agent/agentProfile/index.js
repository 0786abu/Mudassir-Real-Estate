"use client";
import React, { useEffect, useRef } from "react";
import { Link, Mail, MapPin, PhoneCall } from "react-feather";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import Exploration from "@/layout/sidebarLayout/Exploration";
// import Filter from "@/layout/sidebarLayout/Filter";
// import RecentlyAdded from "@/layout/sidebarLayout/RecentlyAdded";
import Img from "@/utils/BackgroundImageRatio";
import GridView from "../../listing/gridView/grid/GridView";
import Pagination from "@/layout/Pagination";

const BodyContent = ({agent,agentProperties,totalProperties,totalPages,page,searchParams}) => {
  const isFirstRender = useRef(true);

  useEffect(() => { 
    // 👇 pehli dafa skip karo
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // 👇 sirf pagination change par scroll
    window.scrollTo({
      top: 1000,
      behavior: "smooth",
    });

  }, [page]);
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
                    <span className="label" style={{background:"#108A00"}}>{agent?.numOfProperties} Properties</span>
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
                          <div className="icons-square" style={{background:"#c2f7bb"}}>
                            <Link style={{color:"#108A00"}}/>
                          </div>
                          <div className="media-body">
                            <h6>
                              <a style={{color:"#108A00"}}>https://www.sheltos.com</a>
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
            <div>
            <GridView properties={agentProperties} from={"agentDetail"} />
            {totalProperties>4 && (
              <Pagination 
              totalPages={totalPages}
              currentPage={page}
              from={"agentDetail"}
              agentID={agent?._id}
              searchParams={searchParams}
              />
            )}
            </div>
          </Col>
          <Sidebar>
            <Exploration owner={{_id:agent?._id}} />
            {/* <Filter /> */}
            {/* <RecentlyAdded /> */}
          </Sidebar>
        </Row>
      </Container>
    </section>
  );
};

export default BodyContent;
