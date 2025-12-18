/**
 * It takes an array of objects and returns a new array of objects with the same keys but with the
 * values of the keys being the values of the keys in the original array of objects
 * @returns An array of objects.
 */
import Link from "next/link";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { Button, Col, Container, Row } from "reactstrap";
import { MeetOurAgent, PropertyServicesDetail } from "@/constValues/constValues";
import { about3 } from "@/data/slickSlider";
import Img from "@/utils/BackgroundImageRatio";
import NoSsr from "@/utils/NoSsr";
import SocialAccounts from "../../elements/SocialAccounts";
import { useDispatch, useSelector } from "react-redux";
import { FetchAgents } from "@/redux-toolkit/action/agentAction";
import ProfileLoader from "@/components/common/Loader";
import { Link2 } from "react-feather";

const About = () => {
  const {agents,agentloading} = useSelector((state)=>state.Agent);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(FetchAgents())
  },[dispatch])
  return (
    <section className="about-section slick-between">
      {agentloading ? (<ProfileLoader/>) : (
        <Container>
        <Row className="ratio_asos">
          <Col>
            <div className="title-3 text-start">
              <h2>{MeetOurAgent}</h2>
              <p className="font-roboto">{PropertyServicesDetail}</p>
            </div>
            <NoSsr>
              <Slider className="arrow-gradient arrow-right" {...about3}>
                {agents &&
                  agents?.slice(0,6)?.map((data, i) => (
                    <div key={i} className=" position-relative">
                      
                      <div className="about-box wow fadeInUp">
                        <div className="bg-size agent-image">
                          <Img src={data.agencyProfile?.url} className="bg-img" />
                          <div className="overlay-agent">
                          {/* <div style={{position:"absolute", bottom:"4px",right:"4px"}}><Link2/> </div> */}
                            <div className="agent-details">
                              <Link href="/agent/agent-profile">
                                <h6 className="d-flex">
                                  {data.agencyName || data.name}
                                  <span className="label-heart ms-2">
                                    <i className="fas fa-heart"></i>
                                  </span>
                                </h6>
                              </Link>
                              <h5>{data.city}</h5>
                              <p className="font-roboto">{data.bio.slice(0,80)}...</p>
                              <span className="font-roboto">{data.email}</span>
                              <SocialAccounts socialMedia={data.socialMedia} />
                              <Link href={`/agents/${data._id}`}>
                              <Button style={{background:"#F34451",color:"white"}} className="mt-2">View detail</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </NoSsr>
          </Col>
        </Row>
      </Container>
      )}
    </section>
  );
};

export default About;
