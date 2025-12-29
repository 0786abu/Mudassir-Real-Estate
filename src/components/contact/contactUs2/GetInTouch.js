/**
 * It returns a section with a container, which contains a row with two columns. The first column
 * contains the LogInCard component, and the second column contains a row with two columns. The first
 * column of the second row contains a div with a class of contact_wrap, and the second column of the
 * second row contains a div with a class of contact_wrap
 * @returns The return value is the value of the last expression evaluated in the function.
 */
import React from "react";
import { Mail, MapPin } from "react-feather";
import { Col, Container } from "reactstrap";
import LogInCard from "../contactUs1/LogInCard";

const GetInTouchSection = () => {
  return (
    <section className='small-section contact-2'>
      <Container>
        <div className='row gx-3'>
          <Col xl='6' lg='5'>
            <LogInCard />
          </Col>
          <Col xl='6' lg='7' className='contact_section contact_wrap_2'>
            <div className='row contact-detail theme-card'>
              <Col lg='12' className='p-0'>
                <div className='contact-content'>
                  <h2>Welcome to Pak Earth !!</h2>
                  <p className='font-roboto'>
                    Our support team is available to assist you during business hours. Please allow up to Monday To Saturday (9AM - 5PM) for a response.

                  </p>
                </div>
              </Col>
              <Col sm='6' className=' p-0'>
                <div className='contact_wrap shadow-none text-start ps-0'>
                  <MapPin />
                  <h4>Where ?</h4>
                  <p className='font-roboto'>
                    E-28, Block B, Architects <br/>
                    Engineers Housing Society, <br/>
                    Lahore, 54000 <br />
                    +91 361264100
                  </p>
                </div>
              </Col>
              <Col sm='6' className='p-0'>
                <div className='contact_wrap shadow-none text-start ps-0'>
                  <Mail />
                  <h4>Online service</h4>
                  <ul>
                    <li>Support: Admin@pakearth.com</li>
                    <li>www.PakEarth.com</li>
                    <li>03164249126</li>
                  </ul>
                </div>
              </Col>
            </div>
          </Col>
        </div>
      </Container>
    </section>
  );
};

export default GetInTouchSection;
