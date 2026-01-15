import { AddMoreFloorPlansImages } from "@/redux-toolkit/action/projectAction";
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

const createEmptyFloor = () => ({
  floorName: "",
  floorImage: null,
});

const FloorPlansModal = ({ isOpen, toggle, slug, loading }) => {
  const [floorPlans, setFloorPlans] = useState([createEmptyFloor()]);
  const dispatch = useDispatch();

  // Add new floor
  const addFloor = () => {
    setFloorPlans((prev) => [...prev, createEmptyFloor()]);
  };

  // Remove floor by index
  const removeFloor = (index) => {
    setFloorPlans((prev) => prev.filter((_, i) => i !== index));
  };


   const handleSubmit = ()=>{
        const formData = new FormData();
  floorPlans.forEach(floor => {
    formData.append("floorName", floor.floorName);
    formData.append("floorImage", floor.floorImage);
  });
        dispatch(AddMoreFloorPlansImages(slug,formData,toggle))
      }
  // Update floor field
  const handleChange = (index, field, value) => {
    setFloorPlans((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Handle file input
  const handleFileChange = (index, file) => {
    setFloorPlans((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], floorImage: file };
      return updated;
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Manage Floor Plans</ModalHeader>
      <ModalBody>
        {floorPlans.map((floor, i) => (
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
                      onChange={(e) => handleFileChange(i, e.target.files[0])}
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
      </ModalBody>
      <ModalFooter>
        <Button style={{width:"100%"}} color="success" outline disabled={loading} onClick={handleSubmit}>{loading ? <><span className=' spinner-border' role='status' style={{width:"16px",height:"16px"}}></span> Submit</> : "Submit"}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default FloorPlansModal;
