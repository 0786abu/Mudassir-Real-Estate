import { AddMorePaymentlansImages } from "@/redux-toolkit/action/projectAction";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const createEmptyPayment = () => ({
  paymentName: "",
  paymentImage: null,
});

const PaymentPlans = ({ open, toggle, slug, loading }) => {
  const [paymentPlans, setPaymentPlans] = useState([createEmptyPayment()]);
  const dispatch = useDispatch();

  // ➕ Add new payment plan
  const addPayment = () => {
    setPaymentPlans((prev) => [...prev, createEmptyPayment()]);
  };

   const handleSubmit = ()=>{
          const formData = new FormData();
    paymentPlans.forEach(payment => {
      formData.append("paymentName", payment.paymentName);
      formData.append("paymentImage", payment.paymentImage);
    });
          dispatch(AddMorePaymentlansImages(slug,formData,toggle))
        }

  // ❌ Remove payment plan
  const removePayment = (index) => {
    setPaymentPlans((prev) => prev.filter((_, i) => i !== index));
  };

  // ✏️ Text change
  const handleChange = (index, field, value) => {
    setPaymentPlans((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  // 🖼️ File change
  const handleFileChange = (index, file) => {
    setPaymentPlans((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, paymentImage: file } : item
      )
    );
  };

  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Payment Plans</ModalHeader>

      <ModalBody>
        <Card className="mb-4 shadow-sm">
          <CardBody>
            {paymentPlans.map((plan, i) => (
              <Card key={i} className="mb-3 border">
                <CardBody>
                  <Row className="align-items-center g-2">
                    <Col md={6}>
                      <FormGroup>
                        <Label>Payment Name</Label>
                        <Input
                          type="text"
                          value={plan.paymentName}
                          onChange={(e) =>
                            handleChange(i, "paymentName", e.target.value)
                          }
                          placeholder="Enter Payment Name"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label>Payment Image</Label>
                        <Input
                          type="file"
                          onChange={(e) =>
                            handleFileChange(i, e.target.files[0])
                          }
                        />
                      </FormGroup>
                    </Col>

                    <Col md={12} className="text-end mt-2">
                      {paymentPlans.length > 1 && (
                        <Button
                          color="danger"
                          outline
                          onClick={() => removePayment(i)}
                        >
                          Delete Payment Plan
                        </Button>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}

            <Button color="success" outline onClick={addPayment}>
              + Add Payment Plan
            </Button>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
              <Button style={{width:"100%"}} color="success" outline disabled={loading} onClick={handleSubmit}>{loading ? <><span className=' spinner-border' role='status' style={{width:"16px",height:"16px"}}></span> Submit</> : "Submit"}</Button>
            </ModalFooter>
    </Modal>
  );
};

export default PaymentPlans;
