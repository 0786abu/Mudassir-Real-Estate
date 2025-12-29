"use client";
import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";

const TermsAndConditions = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <section className='user-dashboard terms-section'>
        <Container>
          <Row className='log-in'>
            <Col sm='10'>
              <div className='theme-card'>
                <h2>Terms & Conditions</h2>
                <div className='terms-wrap'>
                  <div className='terms-wrapper' id='intro'>
                    <h4>Introduction</h4>
                    <p>Welcome to PakEarth! Utilizing or accessing our property advertisement platform requires your adherence to the accompanying terms and conditions. If you disagree with any part of these terms, we advise you not to use our services. PakEarth maintains the authority to modify these terms when necessary without providing advance notification.</p>
                  </div>
                  <div className='terms-wrapper' id='restriction'>
                    <h4>General Disclaimer</h4>
                    <ul className="term-list mt-2">
                      <li>PakEarth is a property ad posting platform and does not verify or authenticate the accuracy of advertisements posted by users.</li>
                      <li>Users must verify any advertised property or project authenticity through independent checks including physical inspections.</li>
                      <li>We are not liable for any inaccuracies, omissions, or misrepresentations in property listings or for the outcomes of transactions conducted through the platform.</li>
                      <li>Links to external websites may be provided, but PakEarth is not responsible for their content or accuracy.</li>
                      <li>The security, confidentiality, and accuracy of user account details are the sole responsibility of the user.</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='restriction'>
                    <h4>General Terms and Conditions</h4>
                    <ul className="term-list mt-2">
                      <li>We provides a platform for property advertisements and does not act as a property broker or agent.</li>
                      <li>Our users must comply with all applicable laws of the Islamic Republic of Pakistan while using our services.</li>
                      <li>Advertisements and listings may include promotions, and some services may require payment of fees.</li>
                      <li>Users are prohibited from uploading harmful material, including malware, viruses, spam, or fraudulent content.</li>
                      <li>Our users must not reproduce, copy, or redistribute PakEarth’s content without prior permission.</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='restriction'>
                    <h4>Property Advertisement Terms</h4>
                    <ul className="term-list mt-2">
                      <li>Users must own or be authorized by the owner to post property ads on PakEarth.</li>
                      <li>Advertisements must include accurate and truthful property details. Users will indemnify PakEarth against any claims arising from inaccurate or false information.</li>
                      <li>We may refuse, modify, or remove advertisements at its discretion, without obligation to provide a reason.</li>
                      <li>Advertisements must remain active for a minimum of one week unless removed by PakEarth due to a policy violation.</li>
                      <li>Pak Earth does not guarantee specific responses or outcomes from property advertisements, and any payments made are solely for ad display purposes.</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='restriction'>
                    <h4>Prohibited Use Policy</h4>
                    <ul className="term-list mt-2">
                      <li>Users must not engage in illegal activities or post content that infringes intellectual property rights or violates copyright laws.</li>
                      <li>Impersonating others, misrepresenting property details, or uploading unauthorized or harmful content is strictly prohibited.</li>
                      <li>PakEarth reserves the right to suspend accounts or restrict access without liability in case of prohibited use or violations.</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='restriction'>
                    <h4>Intellectual Property</h4>
                    <ul className="term-list mt-2">
                      <li>All content on our website, including text, images, logos, and software, is the intellectual property of our website and protected by copyright laws.</li>
                      <li>Unauthorized use, reproduction, or modification of PakEarth content is prohibited.</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='limitation'>
                    <h4>Indemnification</h4>
                    <p>Users agree to indemnify and hold harmless PakEarth, its employees, and representatives from any claims, damages, or losses arising from their use of the platform or violation of these terms.</p>
                  </div>
                  <div className='terms-wrapper' id='restriction'>
                    <h4>Limitation of Liability</h4>
                    <ul className="term-list mt-2">
                      <li>PakEarth is not responsible for any direct, indirect, or consequential damages resulting from the use or inability to use the platform.</li>
                      <li>The platform assumes no responsibility for the accuracy, completeness, or reliability of user-generated content.</li>
                    </ul>
                  </div>
                  <div className='terms-wrapper' id='disclaimer'>
                    <h4>No Warranties</h4>
                    <p>Our platform provides its services on an "as is" basis and makes no guarantees regarding the success, accuracy, or reliability of property advertisements.</p>
                    <p>By using PakEarth, you agree to these Terms and Conditions. For any questions or concerns, please contact us at [info@pakearth.com].</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default TermsAndConditions;
