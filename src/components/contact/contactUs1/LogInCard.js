/**
 * It returns a div with a class of log-in theme-card, which contains a div with a class of title-3
 * text-start, which contains an h2 with the text Let's Get In Touch, which is followed by a Form,
 * which contains a Row with a class of gx-3, which contains a FormGroup with a class of form-group,
 * which contains a Col with a class of md-12, which contains an InputGroup with a class of
 * input-group, which contains a div with a class of input-group-prepend, which contains an
 * InputGroupText, which contains a User icon, which is followed by an Input with a type of text, a
 * class of form-control, a required attribute, a maxLength of 20, a placeholder of Enter your name,
 * and a name of userName, which is followed by a FormGroup with a class of form-group col-md-6, which
 * contains an InputGroup with a
 * @returns The return statement is used to return a value from a function.
 */
"use client";
import { CreateContact } from "@/redux-toolkit/action/contactAction";
import { useState } from "react";
import { Mail, Phone, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Row } from "reactstrap";

const LogInCard = () => {
  const {createcontactloading} = useSelector((state)=>state.Contact)
  const [contactData, setContactData] = useState({
    name:"",
    email:"",
    phone:"",
    message:""
  });
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(CreateContact(contactData,setContactData))
  }
  return (
    <div className='log-in theme-card'>
      <div className='title-3 text-start'>
        <h2>Let's Get In Touch</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className='gx-3'>
          <FormGroup className='form-group'>
            <Col md='12'>
              <InputGroup className='input-group'>
                <div className='input-group-prepend'>
                  <InputGroupText>
                    <User />
                  </InputGroupText>
                </div>
                <Input type='text' value={contactData.name} onChange={(e)=>setContactData({...contactData, name:e.target.value})} className='form-control' required maxLength='20' placeholder='Enter your name' name='user' />
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup className='form-group col-md-6'>
            <InputGroup className='input-group'>
              <div className='input-group-prepend'>
                <InputGroupText>
                  <Phone />
                </InputGroupText>
              </div>
              <Input
                placeholder='phone number'
                className='form-control'
                name='phone'
                id='tbNumbers'
                type='tel'
                 value={contactData.phone}
                 onChange={(e)=>setContactData({...contactData, phone:+e.target.value})}
                maxLength='9'
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup className='form-group col-md-6'>
            <InputGroup className='input-group'>
              <div className='input-group-prepend'>
                <div className='input-group-text'>
                  <Mail />
                </div>
              </div>
              <Input type='email' value={contactData.email} onChange={(e)=>setContactData({...contactData, email:e.target.value})} className='form-control' placeholder='email address' required />
            </InputGroup>
          </FormGroup>
          <div className='form-group col-md-12'>
            <Input type='textarea' name="message" value={contactData.message} onChange={(e)=>setContactData({...contactData, message:e.target.value})} className='form-control' id='exampleFormControlTextarea1' rows='3' placeholder='Write here something' />
          </div>
          <div className='submit-btn with-captcha'>
            <div className='captcha'>
              <div className='spinner'>
                <label>
                  <Input type='checkbox' />
                  <span className='checkmark'>
                    <span>&nbsp;</span>
                  </span>
                </label>
              </div>
              <div className='text'>I'm not a robot</div>
              <div className='logo'>
                <img src='/assets/images/inner-pages/recaptcha.png' alt='' />
                <p>reCAPTCHA</p>
                <small>Privacy - Terms</small>
              </div>
            </div>
            <div></div>
            <Button disabled={createcontactloading} className='btn' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{background:hovered ? "#108a00" : "#14a800"}} type='submit'>
              {createcontactloading ? "Submitting..." : "Send Your Message"}
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default LogInCard;
