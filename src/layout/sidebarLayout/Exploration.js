/**
 * It's a React component that renders a form with a submit button
 * @returns A function that returns a div.
 */
"use client"
import { SendInquiry } from "@/redux-toolkit/action/leadAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";

const Exploration = ({owner,property}) => {
  const {sendInquiryLoading} = useSelector((state)=>state.Lead);
 const [leadData, setLeadData] = useState({
    name:"",
    email:"",
    phone:null,
    message:"",
    requestedTo:owner?._id,
    requestedToModel:owner?.role,
    property:property ? property : null
  });
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  // const [modal, setModal] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLeadData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(SendInquiry(leadData,setLeadData))
  };

  return (
    <div className="advance-card">
      <h6>Request exploration</h6>
      <div className="category-property">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="text" className="form-control" placeholder="Your Name" required name="name" value={leadData.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup className="form-group">
            <Input type="email" className="form-control" placeholder="Email Address" required name="email" value={leadData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup className="form-group">
            <Input
              placeholder="phone number"
              className="form-control"
              name="mobnumber"
              required
              value={leadData.phone || ""}
              onChange={(e) => setLeadData({...leadData, phone:+e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Input type="textarea" placeholder="Message" className="form-control" rows="3" name="message" value={leadData.message} onChange={handleChange}></Input>
          </FormGroup>
          {/* ? "#14a800"
          : "#108a00" */}
          <Button disabled={sendInquiryLoading}
          onMouseEnter={()=>setIsHover(true)}
          onMouseLeave={()=>setIsHover(false)}
          style={{
            background:isHover ? "#14a800" : "#108a00"
          }}
          type="submit"  className="btn btn-block">
            {sendInquiryLoading ? (
              <div className="d-flex align-items-center gap-2">
                      <span className="spinner-border text-success spinner-border-sm"></span> <span>Submit request</span>
                      </div>
            ) : "Submit request"}
          </Button>
        </Form>
      </div>
      {/* <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>
          <strong>Request exploration</strong>
        </ModalHeader>
        <ModalBody>
          <p className="m-1">Name : {inputs.name}</p>
          <br></br>
          <p className="m-1">Email Address : {inputs.email}</p>
          <br></br>
          <p className="m-1">Mobile Number : {inputs.mobnumber}</p>
          <br></br>
          <p className="m-1">Message : {inputs.message}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModal(false)}>
            Done
          </Button>
          <Button color="secondary" onClick={() => setModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
    </div>
  );
};

export default Exploration;
