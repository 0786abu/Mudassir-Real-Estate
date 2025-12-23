"use client";
import React, { useState } from 'react'
import { Lock, Mail } from 'react-feather'
import { Card, CardBody, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Row } from 'reactstrap'
import Img from '@/adminComponents/components/Common/Image';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLogin } from '@/redux-toolkit/action/authAction';
import { useRouter } from 'next/navigation';

const LogIn = () => {
    const {registerloading} = useSelector((state)=>state.Auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const [showpassword, setShowpassword] = useState(false);
    const [data, setData] = useState({
        email:"",
        password:""
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(AdminLogin({user:data,router}))
    }
    return (
        <div className="authentication-box">
            <Container fluid={true} className="container-fluid">
                <Row className="log-in">
                    <Col xxl='3' xl='4' lg='5' md='6' sm='8' className="form-login">
                        <Card className="card">
                            <CardBody className="card-body">
                                <div className="title-3 text-start">
                                    <h2>Log in</h2>
                                </div>
                                <Form onSubmit={handleSubmit}>
      <FormGroup>
        <InputGroup>
          <div className="input-group-prepend">
            <InputGroupText>
              <Mail />
            </InputGroupText>
          </div>
          <Input type="email" value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} className="form-control rounded-1" placeholder="Enter email address" required />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className=' position-relative'>
          <div className="input-group-prepend">
            <InputGroupText>
              <Lock />
            </InputGroupText>
          </div>
          <Input type={showpassword ? "text" : "password"} id="pwd-input1" value={data.password} onChange={(e)=>setData({...data, password:e.target.value})} className="form-control rounded-1" placeholder="Password" required />
          <div style={{right:"2px", height:"90%",marginTop:"2px",zIndex:"10"}} className="input-group-apend d-flex justify-content-center align-items-center position-absolute top-0 bottom-o ">
            <InputGroupText className="input-group-text bg-white border-0 h-100">
              <i id="pwd-icon1" className={`far ${showpassword ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowpassword((prev) => !prev)} />
            </InputGroupText>
          </div>
        </InputGroup>
      </FormGroup>


                <button type='submit' disabled={registerloading} className="btn btn-dark w-100 mb-2">{registerloading ? "Processing...":"Login"}</button>
              </Form>
                                {/* <div className="divider">
                                    <h6>or</h6>
                                </div>
                                <div>
                                    <h6>Log in with</h6>
                                    <Row className="social-connect">
                                        <Col sm='6'>
                                            <Link href="https://www.facebook.com/" className="btn btn-social btn-flat facebook p-0">
                                                <i className="fab fa-facebook-f" />
                                                <span>Facebook</span>
                                            </Link>
                                        </Col>
                                        <Col sm='6'>
                                            <Link href="https://twitter.com/" className="btn btn-social btn-flat twitter p-0">
                                                <i className="fab fa-twitter" />
                                                <span>Twitter</span>
                                            </Link>
                                        </Col>
                                        <Col sm='6'>
                                            <Link href="https://accounts.google.com/" className="btn btn-social btn-flat google p-0">
                                                <i className="fab fa-google" />
                                                <span>Google</span>
                                            </Link>
                                        </Col>
                                        <Col sm='6'>
                                            <Link href="https://www.linkedin.com/" className="btn btn-social btn-flat linkedin p-0">
                                                <i className="fab fa-linkedin-in" />
                                                <span>Linkedin</span>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xxl='7' xl='7' lg='6' className="offset-xxl-1 auth-img">
                        <Img src={`/assets/images/admin-login.jpg`} alt='' className='bg-img' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LogIn

LogIn.getLayout = function getLayout(LogIn) {
    return (
        <>
            {LogIn}
        </>
    )
}