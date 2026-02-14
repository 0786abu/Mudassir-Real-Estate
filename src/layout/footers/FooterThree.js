 "use client";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { FooterData } from "../../data/footerData";
import FooterLink from "./elements/FooterLink";
import FooterContactUsDetails from "./footerThreeElements/FooterContactUsDetails";
import SubFooterTwo from "./elements/SubFooterTwo";
import { useDispatch, useSelector } from "react-redux";
import { CreateSubscribeEmail } from "@/redux-toolkit/action/emailAction";
import Image from "next/image";
import { MapPin } from "lucide-react";

const FooterThree = () => {
  const {createemailloading} = useSelector((state)=>state.Email);
  const [isActive, setIsActive] = useState();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(CreateSubscribeEmail(email,setEmail))
  }
  return (
    <footer>
      <div className="footer footer-bg">
        <Container>
          <Row>
            <FooterContactUsDetails />
            <Col xl="9">
              <Row>
                <FooterLink value={FooterData.usefulLinks} isActive={isActive} setIsActive={setIsActive} />
                <Col lg="2" md="3" className="">
                <div className="d-flex text-white flex-column gap-1">
                  <h4 className=" fw-semibold">Offices</h4>
                  <div className="officess">
                    <h6 className=" text-decoration-underline">Head office</h6>
                    <div className="d-flex align-items-start gap-1">
                    <MapPin className="mt-1" size={20}/>
                    <p>E-28 Architect society, Lahore</p>
                  </div>
                  </div>
                  <div className="officess">
                    <h6 className=" text-decoration-underline">Sub office</h6>
                    <div className="d-flex align-items-start gap-1">
                    <MapPin className="mt-1" size={20}/>
                    <p>Block no 10 D, plat no 05, sector G 9/2, Islamabad</p>
                  </div>
                  </div>
                </div>
                </Col>
                <Col lg="3" xl="6">
                  <div className="footer-links">
                    <h5
                      className={`footer-title ${isActive === "subscribe" ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsActive("subscribe");
                        isActive === "subscribe" && setIsActive();
                      }}>
                      subscribe
                      <span className="according-menu">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </h5>
                    <div className={`footer-content ${isActive === "subscribe" ? "d-block" : "d-none d-md-block"}`}>
                      
                      <form onSubmit={handleSubmit}>
                        <div className="input-group">
                          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email Address" required />
                          <span className="input-group-apend">
                            <button type="submit" className="input-group-text" style={{background:"#14a800"}} id="basic-addon2">
                              {createemailloading ? <span className=" spinner-border" style={{width:"16px",height:"16px"}} role="status"></span> : <i className="fas fa-paper-plane"></i>}
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                       <ul className="agent-social">
   <li>
    <a href={"#"}>
      {/* <i className="fab fa-facebook-f"></i> */}
      <Image src={"/assets/images/facebook.png"} alt="facebook" width={20} height={20} />
    </a>
  </li>
    <li>
    <a href={"#"}>
      {/* <i className="fab fa-instagram"></i> */}
      <Image src={"/assets/images/Instagram.png"} alt="instagram" width={20} height={20} />
    </a>
  </li>
   <li>
    <a href={"#"}>
      {/* <i className="fab fa-youtube"></i> */}
      <Image src={"/assets/images/Youtube.png"} alt="youtube" width={20} height={20} />
    </a>
  </li>
    <li>
    <a href={"#"}>
      {/* <i className="fab fa-linkedin-in"></i> */}
      <Image src={"/assets/images/Linkedin.png"} alt="linkedin" width={20} height={20} />
    </a>
  </li>
    <li>
    <a href={"#"}>
      {/* <i className="fab fa-linkedin-in"></i> */}
      <Image src={"/assets/images/Twitter.png"} alt="twitter" width={20} height={20} />
    </a>
  </li>
</ul>
                  </div>
                  <div className="d-flex gap-2">
                    <Image src={"/assets/images/app-store.svg"} alt="app store icon" width={150} height={60} />
                    <Image src={"/assets/images/play-store.svg"} alt="play store icon" width={150} height={60} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <SubFooterTwo />
    </footer>
  );
};

export default FooterThree;
