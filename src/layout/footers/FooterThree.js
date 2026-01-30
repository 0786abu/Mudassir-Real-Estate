 "use client";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { FooterData } from "../../data/footerData";
import FooterLink from "./elements/FooterLink";
import FooterContactUsDetails from "./footerThreeElements/FooterContactUsDetails";
import SubFooterTwo from "./elements/SubFooterTwo";
import { useDispatch, useSelector } from "react-redux";
import { CreateSubscribeEmail } from "@/redux-toolkit/action/emailAction";

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
                <FooterLink value={FooterData.feature} isActive={isActive} setIsActive={setIsActive} />
                <FooterLink value={FooterData.social} isActive={isActive} setIsActive={setIsActive} />
                <Col lg="3" xl="4">
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
    <a href={"facebook.com"} className="facebook">
      <i className="fab fa-facebook-f"></i>
    </a>
  </li>
    <li>
    <a href={"instagram.com"} className="instagram">
      <i className="fab fa-instagram"></i>
    </a>
  </li>
   <li>
    <a href={"youtube.com"} className="google">
      <i className="fab fa-youtube"></i>
    </a>
  </li>
    {/* <li>
    <a href={agent?.socialMedia?.linkedin} className="linkedin">
      <i className="fab fa-linkedin-in"></i>
    </a>
  </li> */}
</ul>
                  </div>
                </Col>
              </Row>
              {/* <FooterBlog /> */}
            </Col>
          </Row>
        </Container>
      </div>
      <SubFooterTwo />
    </footer>
  );
};

export default FooterThree;
