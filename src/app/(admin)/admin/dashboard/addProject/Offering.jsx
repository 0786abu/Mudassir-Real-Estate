import React from "react";
import { Card, CardBody, Row, Col, Input, Button, FormGroup, Label } from "reactstrap";

const OfferingForm = ({ formData, setFormData }) => {

  const addOffering = () => {
    setFormData((p) => ({
      ...p,
      offering: [...(p.offering || []), ""],
    }));
  };

  const removeOffering = (index) => {
    const updated = [...formData.offering];
    updated.splice(index, 1);
    setFormData((p) => ({ ...p, offering: updated }));
  };

  const updateOffering = (index, value) => {
    const updated = [...formData.offering];
    updated[index] = value;
    setFormData((p) => ({ ...p, offering: updated }));
  };

  return (
    <Card className="mb-4 shadow-sm">
      <CardBody>
        <h5 className="fw-bold mb-3">Project Offerings</h5>

        {(formData.offering || []).map((item, index) => (
          <Row key={index} className="align-items-start g-2 mb-2">
            <Col md={10}>
              <FormGroup>
                <Label className="visually-hidden">Offering</Label>
                <Input
                  type="text"
                  placeholder="Enter offering (e.g. Free Parking)"
                  value={item}
                  onChange={(e) => updateOffering(index, e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button
                color="danger"
                outline
                size="sm"
                onClick={() => removeOffering(index)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}

        <Button color="success" outline onClick={addOffering}>
          + Add Offering
        </Button>
      </CardBody>
    </Card>
  );
};

export default OfferingForm;
