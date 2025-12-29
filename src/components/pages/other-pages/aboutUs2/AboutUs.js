import React from "react";
import { Container, Row } from "reactstrap";

const AboutUsSection = () => {
  return (
    <section className='about-main'>
      <Container>
        <Row>
          <div className='col'>
            
            <div className='user-about'>
              <Row>
                <div className='col-xl-7 col-lg-5'>
                  <div className='about-image'>
                    <div className='img-box side-left'>
                      <img src='/assets/images/about/6.webp' className='img-fluid' alt='' />
                      <div className='side-effect'></div>
                    </div>
                    <div className='img-box img-abs side-right'>
                      <img src='/assets/images/about/5.webp' className='img-fluid' alt='' />
                      <div className='side-effect'></div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-5 col-lg-7'>
                  <div className='about-content'>
                    <h3>Who We Are</h3>
                    <p className='font-roboto'>
                      PakEarth  is a dedicated platform for property ads, created to bridge the gap between property seller and buyer. With an extensive network and a user-friendly interface, we provide a space where individuals and businesses can post Free Classified Ad and find residential plots, apartments, commercial spaces and agricultural lands efficiently. 
                    </p>
                  </div>
                  <div className='about-listing'>
                    <ul>
                      <li>
                        <h4>15,801</h4>
                        <p>Total property</p>
                      </li>
                      <li>
                        <h4>5792</h4>
                        <p>Agents</p>
                      </li>
                      <li>
                        <h4>3871</h4>
                        <p>Agency</p>
                      </li>
                      <li>
                        <h4>4791+</h4>
                        <p>Sold out property</p>
                      </li>
                    </ul>
                  </div>
                  
                </div>
                <div className=' mx-auto mb-5' style={{maxWidth:"1024px",marginTop:"100px"}}>
              <p className='font-roboto mt-4' style={{fontSize:"16px"}}>Founded in 2017, PakEarth specializes in luxury real estate services, offering expertise in the sale and rental of properties across Lahore, Islamabad, Peshawar, Quetta and Karachi. As a leading property advertisement website, we connect you with thousands of buyers and sellers, landlords and tenants for your property needs in Pakistan. Our Network is aimed to eliminate all the hassles involved in searching for properties as well as property advertising to make property seekers explore their desired options. PakEarth is your all-in-one platform for finding your dream home, exploring profitable real estate investments, or finding the perfect tenants for your property.</p>
              <p className='font-roboto mt-4' style={{fontSize:"16px"}}>FOur Valuable Team lets you to post free Classified Property Ads to sell or rent houses, flats, and plots.  Our Online Property listings allow you to easily put up your property for sale or rent and connect with buyers and tenants across Pakistan. Our platform provides simple solutions for reaching your intended audience both for sales and rental listings.</p>
              <div className="mt-4 mb-2">
                <h5 style={{fontWeight:"bold"}}>What We Do</h5>
                <ul className="term-list">
                  <li><span style={{fontWeight:"bold"}}>Property Listings:</span> Our property database for houses, apartments, shops, offices, plots and agricultural land receives regular updates.</li>
                  <li><span style={{fontWeight:"bold"}}>Advertising Opportunities:</span> Property owners, developers and agents can use this robust platform to showcase their listings to a large audience.</li>
                  <li><span style={{fontWeight:"bold"}}>Comprehensive Search Tools:</span> Our advanced filters and search options help users locate properties that meet their unique needs through tools like Property Finder and Home Installments Calculator along with Society Map, Real Estate Explorer, Land Tracker, Property Navigator, Area Insights and Invest Search.</li>
                  <li><span style={{fontWeight:"bold"}}>Market Insights:</span> Stay informed about property values and market trends through consistent updates to make well-informed decisions.</li>
                  <li><span style={{fontWeight:"bold"}}>Blog News Updates:</span> Updated property values along with current construction industry news.</li>
                </ul>
              </div>
            </div>
              </Row>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUsSection;
