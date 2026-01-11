import React from "react";
import { Row, Col, FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap";

const createEmptyPayment = () => ({
  paymentName: "",
  paymentImage: null,
});

const PaymentPlansForm = ({ formData, setFormData }) => {

  const addPayment = () => {
    setFormData((p) => ({
      ...p,
      paymentPlans: [...(p.paymentPlans || []), createEmptyPayment()],
    }));
  };

  const removePayment = (index) => {
    const updated = [...formData.paymentPlans];
    updated.splice(index, 1);
    setFormData((p) => ({ ...p, paymentPlans: updated }));
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.paymentPlans];
    updated[index] = { ...updated[index], [field]: value }; // ✅ safe update
    setFormData((p) => ({ ...p, paymentPlans: updated }));
  };

  const handleFileChange = (index, file) => {
    const updated = [...formData.paymentPlans];
    updated[index] = { ...updated[index], paymentImage: file }; // ✅ safe
    setFormData((p) => ({ ...p, paymentPlans: updated }));
  };

  return (
    <Card className="mb-4 shadow-sm">
      <CardBody>
        <h5 className="fw-bold mb-3">Payment Plans</h5>

        {formData.paymentPlans?.map((plan, i) => (
          <Card key={i} className="mb-3 border">
            <CardBody>
              <Row className="align-items-center g-2">
                <Col md={6}>
                  <FormGroup>
                    <Label>Payment Name</Label>
                    <Input
                      type="text"
                      value={plan.paymentName}
                      onChange={(e) => handleChange(i, "paymentName", e.target.value)}
                      placeholder="Enter Payment Name"
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>Payment Image</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(i, e.target.files[0])}
                    />
                  </FormGroup>
                </Col>

                <Col md={12} className="text-end mt-2">
                  <Button color="danger" outline onClick={() => removePayment(i)}>
                    Delete Payment Plan
                  </Button>
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
  );
};

export default PaymentPlansForm;
