import { Resend_PhoneOTP, SendOTPOnPhone, VerifyPhoneOTP } from "@/redux-toolkit/action/authAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const VerifiedPhoneNumber = ({ toggle, setModal, alreadyphone }) => {
    const {registerloading,resendloading} = useSelector((state)=>state.Auth);
    const [timer, setTimer] = useState(0);
    const [phone, setPhone] = useState();
    const [isSendRequest, setIsSendRequest] = useState(false);
    const dispatch = useDispatch();
    const [otpCode, setOtpCode] = useState();

      useEffect(() => {
        const intervalId = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    
    }, []);
    useEffect(()=>{
        if(alreadyphone){
            setIsSendRequest(true);
        }
        setPhone(alreadyphone)
    },[alreadyphone])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SendOTPOnPhone(phone,setTimer,setIsSendRequest))
  };

  const handleVerify = (e)=>{
    e.preventDefault();
    dispatch(VerifyPhoneOTP(otpCode,setModal))
  }
  const handleResend = ()=>{
    dispatch(Resend_PhoneOTP(phone,setTimer))
  }
  return (
    <>
      <Modal className="modal-content" isOpen={toggle} size="lg">
        <ModalHeader className="modal-header">
          <p className="modal-title">Add and Verified Phone Number</p>
          <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}>
            <span aria-hidden="true">×</span>
          </Button>
        </ModalHeader>
        <ModalBody className="modal-body">
          <Form id="detail-change" onSubmit={handleSubmit}>
            <Row className="row gx-3">
              <Col sm="12" className="form-group">
                <Label htmlFor="verifiedphone">Phone no</Label>
                <Input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" id="verifiedphone" name="phone" placeholder="Enter Phone Number (03000000000)"  />
              </Col>
            </Row>
            {!isSendRequest && (
                <Button disabled={registerloading} type="submit" className="btn btn-gradient">{registerloading ? "Sending...":"Send OTP"}</Button>
            )}
          </Form>
          {isSendRequest && (
            <Form onSubmit={handleVerify}>
            <Row className="row gx-3">
              <Col sm="12" className="form-group">
                <Label htmlFor="OTP">OTP</Label>
                <Input type="text" className="form-control" value={otpCode} onChange={(e)=>setOtpCode(e.target.value)} id="OTP" name="otpcode" placeholder="Enter Phone Number"  />
              </Col>
            </Row>
                <div>
                    <Button disabled={registerloading} type="submit" className="btn btn-gradient">{registerloading ? "Verifying..." : "Verify OTP"}</Button>
                    <Button style={{marginLeft:"10px"}} onClick={handleResend} disabled={timer>0 || resendloading}>{resendloading ? "Sending...":`Resend OTP ${(timer>0 ? timer : "")}`}</Button>
                </div>
          </Form>
          )}
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button type="button" className="btn btn-dashed btn-pill" data-bs-dismiss="modal" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button form="detail-change" onClick={() => setModal(false)} className="btn btn-gradient btn-pill" data-bs-dismiss="modal">
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VerifiedPhoneNumber;
