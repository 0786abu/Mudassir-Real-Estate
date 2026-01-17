import { AdminChangeDevelopedBy } from '@/redux-toolkit/action/projectAction';
import React, { useState } from 'react'
import { Edit } from 'react-feather'
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const DevelopedBy = ({developedBy,slug,loading}) => {
    const [data, setData] = useState({
        developer:developedBy?.developer || "",
        description:developedBy?.description || ""
    });
    const [open, setOpen] = useState(false);
    const toggle = ()=> setOpen(!open)
    const dispatch = useDispatch();
    const [logo, setLogo] = useState(null);
    const handleChange = (e)=>{
        const file = e.target.files[0];
        setLogo(file);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("developer", data.developer);
        formData.append("description", data.description);
        formData.append("logo", logo);
        dispatch(AdminChangeDevelopedBy(slug,formData,toggle))
    }
    
  return (
    <>
    <Modal toggle={toggle} isOpen={open} size='lg'>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Developer</Label>
                    <Input name="developer" value={data.developer} onChange={(e)=>setData({...data, developer:e.target.value})} placeholder='Enter developer name' />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input type='textarea' name="description" value={data.description} onChange={(e)=>setData({...data, description:e.target.value})} placeholder='Enter about developer' />
                </FormGroup>
                <FormGroup>
                    <Label>Logo</Label>
                    <Input type="file" onChange={handleChange} />
                </FormGroup>
                <Button type='submit' style={{width:"100%"}} color='success' outline className=' mt-4'>{loading ? "Submitting..." : "Submit"}</Button>
            </form>
        </ModalBody>
    </Modal>
    <Card className="mb-4 shadow-sm position-relative">
          <div onClick={toggle} style={{position:"absolute",top:"10px",right:"10px",cursor:"pointer"}}>
            <span><Edit/></span>
          </div>
        <CardHeader className="fw-semibold">Developed By</CardHeader>
        <CardBody>
          <Row>
            <Col sm="4" md="2">
              <img
                src={developedBy?.logo?.url}
                className="img-fluid"
                style={{width:"100%",aspectRatio:"1/1"}}
              />
            </Col>
            <Col className="mt-sm-0 mt-2">
              <h6 className="fw-bold">{developedBy?.developer}</h6>
              <p className="text-muted mb-0">
                {developedBy?.description}
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default DevelopedBy