import React from "react";
import { Row, Col, FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap";

const createEmptyFloor = () => ({
  floorName: "",
  floorImage: null,
});

const FloorPlansForm = ({ formData, setFormData }) => {

  const addFloor = () => {
    setFormData((p) => ({
      ...p,
      floorPlans: [...(p.floorPlans || []), createEmptyFloor()],
    }));
  };

  const removeFloor = (index) => {
    setFormData((p) => ({
      ...p,
      floorPlans: p.floorPlans.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (index, field, value) => {
    setFormData((p) => {
      const updated = [...p.floorPlans];
      updated[index] = { ...updated[index], [field]: value };
      return { ...p, floorPlans: updated };
    });
  };

  const handleFileChange = (index, file) => {
    setFormData((p) => {
      const updated = [...p.floorPlans];
      updated[index] = { ...updated[index], floorImage: file };
      return { ...p, floorPlans: updated };
    });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <CardBody>
        <h5 className="fw-bold mb-3">Floor Plans</h5>

        {(formData.floorPlans || []).map((floor, i) => (
          <Card key={i} className="mb-3 border">
            <CardBody>
              <Row className="g-2">
                <Col md={6}>
                  <FormGroup>
                    <Label>Floor Name</Label>
                    <Input
                      value={floor.floorName}
                      onChange={(e) =>
                        handleChange(i, "floorName", e.target.value)
                      }
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>Floor Image</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        handleFileChange(i, e.target.files[0])
                      }
                    />
                  </FormGroup>
                </Col>

                <Col md={12} className="text-end">
                  <Button
                    color="danger"
                    outline
                    onClick={() => removeFloor(i)}
                  >
                    Delete Floor
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}

        <Button color="success" outline onClick={addFloor}>
          + Add Floor
        </Button>
      </CardBody>
    </Card>
  );
};

export default FloorPlansForm;
