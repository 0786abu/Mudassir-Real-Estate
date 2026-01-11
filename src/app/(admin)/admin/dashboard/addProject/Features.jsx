import React from "react";
import { Row, Col, FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap";

const emptyFeatureItem = "";

const FeaturesForm = ({ formData, setFormData }) => {

  const featureCategories = [
    "plotFeatures",
    "forFamily_Lifestyle",
    "forWork_Connectivity",
    "forSafety_Maintenance",
    "others",
  ];

  const addFeature = (category) => {
    const updated = { ...formData.features };
    updated[category] = [...(updated[category] || []), emptyFeatureItem];
    setFormData((p) => ({ ...p, features: updated }));
  };

  const removeFeature = (category, index) => {
    const updated = { ...formData.features };
    updated[category].splice(index, 1);
    setFormData((p) => ({ ...p, features: updated }));
  };

  const handleChange = (category, index, value) => {
    const updated = { ...formData.features };
    updated[category][index] = value;
    setFormData((p) => ({ ...p, features: updated }));
  };

  return (
    <Card className="mb-4 shadow-sm">
      <CardBody>
        <h5 className="fw-bold mb-3">Project Features</h5>

        {featureCategories?.map((category) => (
          <div key={category} className="mb-4">
            <h6 className="fw-bold text-capitalize">{category.replace(/_/g, " ")}</h6>

            {formData.features[category]?.map((item, index) => (
              <Row key={index} className="align-items-start d-flex g-2 mb-2">
                <Col md={10}>
                  <FormGroup>
                    <Input
                      type="text"
                      value={item}
                      onChange={(e) => handleChange(category, index, e.target.value)}
                      placeholder={`Enter ${category.replace(/_/g, " ")}`}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <Button
                    color="danger"
                    outline
                    size="sm"
                    onClick={() => removeFeature(category, index)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}

            <Button
              color="success"
              outline
              onClick={() => addFeature(category)}
              className="mt-2"
            >
              + Add {category.replace(/_/g, " ")}
            </Button>
          </div>
        ))}

      </CardBody>
    </Card>
  );
};

export default FeaturesForm;
