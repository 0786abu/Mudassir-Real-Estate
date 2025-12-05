"use client"
import { Resend_Email, VerifyOTP } from "@/redux-toolkit/action/authAction";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Container, Row, Col, Button, Form } from "reactstrap";

// this page css applied on about.scss

const OTPPage = () => {
    const {registerloading,resendloading} = useSelector((state)=>state.Auth);
    const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const router = useRouter();
  const [email, setEmail] = useState();
  useEffect(() => {
  if (typeof window !== "undefined") {
    const storedEmail = JSON.parse(localStorage.getItem("real_estate_project_user_email"));
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }
}, []);
console.log(email)
  // handle change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  useEffect(() => {
  const intervalId = setInterval(() => {
    setTimer(prev => (prev > 0 ? prev - 1 : 0));
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      dispatch(VerifyOTP(enteredOtp,router))
    } else {
      toast.error("please fill all fields")
    }
  };
  const handleResendEmail = ()=>{
    dispatch(Resend_Email(email,setTimer))
  }

  return (
    <Container className="otp-container">
      <Row className="sub-container">
        <Col md="12">
          <h3 className="text-center mb-4">Enter OTP</h3>
          <Form onSubmit={handleSubmit} className="otp-form">
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <div style={{width:"100%",margin:"6px 0px"}} className=" d-flex align-content-center justify-content-end">
            <div><span style={{fontSize:"20px"}}>{timer}</span> <button onClick={handleResendEmail} disabled={timer>0 || resendloading} style={{background:"transparent", border:"none", color:timer>0 ? "gray" : "blue", textDecoration:"underline"}}>{resendloading ? "Sending...":"Resend email"}</button></div>
          </div>
            
            <Button color="primary" disabled={registerloading} type="submit" className=" mt-lg-1" block>
              {registerloading ? "Verifying..." : "Verify OTP"}
            </Button>
          </Form>
          
        </Col>
      </Row>
    </Container>
  );
};

export default OTPPage;
