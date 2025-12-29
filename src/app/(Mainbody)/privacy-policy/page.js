"use client";
import React, { Fragment, useState } from "react";
import { Container } from "reactstrap";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import NavbarThree from "@/layout/headers/NavbarThree";

const PrivacyPolicy = () => {
  const [active, setActive] = useState("1");
  return (
    <Fragment>
      <Breadcrumb />
      <section className='user-dashboard terms-section'>
        <Container>
          <div className='row log-in'>
            {/* <div className='col-xl-3 col-lg-4'>
              <div className='sidebar-user sticky-cls'>
                <div className='dashboard-list'>
                  <h5>Related Topics</h5>
                  <ul className='nav nav-tabs right-line-tab'>
                    <li className='nav-item'>
                      <a className={`nav-link ${active === "1" ? "active" : ""}`} onClick={() => setActive("1")} href='#intro'>
                        Information
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className={`nav-link ${active === "2" ? "active" : ""}`} href='#howuse' onClick={() => setActive("2")}>
                        How We Use
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className={`nav-link ${active === "3" ? "active" : ""}`} href='#thirdparty' onClick={() => setActive("3")}>
                        Third-Party Privacy
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className={`nav-link ${active === "4" ? "active" : ""}`} href='#advertising' onClick={() => setActive("4")}>
                        Advertising
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className={`nav-link ${active === "5" ? "active" : ""}`} href='#dpr' onClick={() => setActive("5")}>
                        GDPR Privacy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div className='col-xl-9 col-lg-8 col-12'>
              <div className='theme-card'>
                <h2>Privacy policy</h2>
                <div className='terms-wrap'>
                  <div className='terms-wrapper'>
                    <p>Welcome to PakEarth.com! Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our real estate ad posting website.</p>
                  </div>
                  <div className='terms-wrapper' id='intro'>
                    <h4>Information we collect</h4>
                    <div className="mt-3">
                     <h4>a. Personal Information</h4>
                     <ul className="term-list mt-2">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Address (If provided)</li>
                      <li>Payment details (if applicable)</li>
                    </ul>
                    </div>
                    <div className="mt-3">
                     <h4>b. Non-Personal Infomartion</h4>
                     <ul className="term-list mt-2">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Device information</li>
                      <li>Website usage data (cookies, log files, analytics, etc.)</li>
                      <li>Information from affiliate websites or third-party sources</li>
                    </ul>
                    </div>
                  </div>
                  <div className='terms-wrapper' id='howuse'>
                    <h4>How we use your information</h4>
                    <p>We use your information to:</p>
                    <ul className="term-list">
                      <li>Facilitate property listings and transactions</li>
                      <li>Communicate with you regarding listings, inquiries, or support requests
</li>
                      <li>Personalize and enhance your experience on the Website</li>
                      <li>Process payments and prevent fraudulent activities</li>
                      <li>Comply with legal requirements</li>
                      <li>Improve and develop new services</li>
                      <li>Send you promotional emails about offers, new services, or relevant content
</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='howuse'>
                    <h4>Sharing Your Information</h4>
                    <p>We do not sell or rent your personal information. However, we may share data in the following circumstances:
</p>
                    <ul className="term-list">
                      <li>With service providers that help operate our Website, process payments, or perform analytics</li>
                      <li>If required by law, legal proceedings, or regulatory authorities</li>
                      <li>In the event of a business merger, sale, or acquisition</li>
                      <li>With trusted partners offering relevant products or services</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='howuse'>
                    <h4>Cookies and Tracking Technologies </h4>
                    <p>We use cookies and similar technologies to improve user experience. These help us:</p>
                    <ul className="term-list">
                      <li>Detect and fix technical issues</li>
                      <li>Analyze and optimize website performance</li>
                      <li>Store user preferences and personalize content</li>
                      <li>Authenticate registered users</li>
                      <li>Measure advertising effectiveness and site traffic</li>
                      <p>
                        <span style={{fontWeight:"bold"}}>Managing Cookies:</span> You can block cookies in your browser settings, but this may affect certain features of the Website
                      </p>
                      <p>
                        <span style={{fontWeight:"bold"}}> Third-Party Cookies:</span>
                      </p>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='advertising'>
                    <h4>Data Security </h4>
                    <p>We implement strong security measures to protect your information from unauthorized access, modification, or disclosure. However, no online transmission is completely secure, and we encourage caution when sharing sensitive data.</p>
                  </div>
                   <div className='terms-wrapper' id='howuse'>
                    <h4>Your Rights and Choices  </h4>
                    <p>Depending on your location, you may have rights to:</p>
                    <ul className="term-list">
                      <li>Access, modify, or delete your personal information</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Restrict the processing of your data under specific circumstances</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='dpr'>
                    <h4>Data Deletion </h4>
                    <p>You have the right to request the deletion of your personal information. To do so, please contact us via the "Contact Us" section. We will process your request unless data retention is required by law or for legitimate business reasons.</p>
                  </div>
                  <div className='terms-wrapper' id='dpr'>
                    <h4>Third-Party Links  </h4>
                    <p>Our Website may contain links to third-party websites. We are not responsible for their privacy policies or practices and recommend reviewing their policies separately.</p>
                  </div>
                  <div className='terms-wrapper' id='dpr'>
                    <h4>Children's Privacy </h4>
                    <p>Our Website is not intended for individuals under 12. We do not knowingly collect personal information from minors.</p>
                  </div>
                  <div className='terms-wrapper' id='dpr'>
                    <h4>Dispute Resolution and Governing Law  </h4>
                    <p>Disputes shall be resolved through arbitration under the Arbitration Act with legal frameworks like the Alternative Dispute Resolution Act 2017 and the Punjab Alternate Dispute Resolution Act 2019 promoting their use. The laws of Pakistan shall apply and govern all matters.</p>
                  </div>
                  <div className='terms-wrapper' id='dpr'>
                    <h4>Changes to This Privacy Policy   </h4>
                    <p>We may update this Privacy Policy from time to time. Significant changes will be communicated via an updated effective date or other appropriate means.</p>
                  </div>
                  <div className='terms-wrapper' id='dpr'>
                    <h4>Contact Us </h4>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at: mudy@affwebsite.com</p>
                    <p>By using our Website, you agree to this Privacy Policy. If you do not agree, please discontinue use of our services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default PrivacyPolicy;
