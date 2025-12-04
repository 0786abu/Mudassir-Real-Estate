import { ChangePassword } from "@/redux-toolkit/action/authAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const ChangeDetails = ({ toggle, setModal }) => {
  const {registerloading} = useSelector((state)=>state.Auth);
  const [inputs, setInputs] = useState({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ChangePassword(inputs,setModal));
  };
  return (
    <>
      <Modal className="modal-content" isOpen={toggle} size="lg">
        <ModalHeader className="modal-header">
          <p className="modal-title">Change Password</p>
          <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}>
            <span aria-hidden="true">×</span>
          </Button>
        </ModalHeader>
        <ModalBody className="modal-body">
          <Form id="detail-change" onSubmit={handleSubmit}>
            <Row className="row gx-3">
              <Col sm="12" className="form-group">
                <Label htmlFor="old">current Password</Label>
                <Input type="password" className="form-control" id="old" name="oldPassword" value={inputs.oldPassword} onChange={handleChange} />
              </Col>
              <Col sm="12" className="form-group">
                <Label htmlFor="new">enter new Password</Label>
                <Input type="password" className="form-control" id="new" name="password" value={inputs.password} onChange={handleChange} />
              </Col>
              <Col sm="12" className="form-group">
                <Label htmlFor="comfirm">confirm your Password</Label>
                <Input type="password" className="form-control" id="comfirm" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange} />
                <FormText className={inputs.password === inputs.confirmPassword ? "d-none" : "d-block"}>Oh noes! confirm field is not matched</FormText>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button type="button" className="btn btn-dashed btn-pill" data-bs-dismiss="modal" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={registerloading} form="detail-change" className="btn btn-gradient btn-pill" data-bs-dismiss="modal">
            {registerloading ? "Processing...":"Save changes"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ChangeDetails;
