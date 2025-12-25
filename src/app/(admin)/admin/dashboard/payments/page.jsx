"use client";
import Breadcrumb from "@/adminComponents/components/Common/Breadcrumb";
import ProfileLoader from "@/components/common/Loader";
import { formatDatenew } from "@/components/elements/propertyBoxs/PropertyBox";
import { AdminFetchPayments, ApprovedPaymentToggle } from "@/redux-toolkit/action/adminAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap";

const Payments = () => {
  const {payments,paymentloading,paymentactionloading} = useSelector((state)=>state.Admin);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [note, setNote] = useState("");
  const [screenshotModal, setScreenshotModal] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [status, setStatus] = useState("");
  const [paymentid, setPaymentId] = useState("");
  const [selectedStatus,setSelectedStatus] = useState("");
  const [selectedPaymentMethod,setSelectedPaymentMethod] = useState("");

  const handleScreenshotToggle = (ss)=>{
    setScreenshotModal(!screenshotModal);
    setScreenshot(ss);
  }
  const handleSubmitAction = (e)=>{
    e.preventDefault();
    const data = {status,adminNote};
    dispatch(ApprovedPaymentToggle(paymentid,data,setActionModal))
  }

  const ssToggle = ()=>setScreenshotModal(!screenshotModal)

  const router = useRouter();
  const handleNote = (note)=>{
    setNote(note)
    setModal(!modal);
  }
  const toggle = ()=>setModal(!modal);
  const actionToggle = ()=>setActionModal(!actionModal);
  const handleActionToggle = (paymentID)=>{
    setPaymentId(paymentID);
    setActionModal(!actionModal);
  }
  const resetFilter = ()=>{
    setSelectedPaymentMethod("")
    setSelectedStatus("")
  }

  const handlePush = (slug)=>{
    router.push(`/admin/dashboard/allProperties/${slug}`)
  }

  useEffect(()=>{
    dispatch(AdminFetchPayments({selectedStatus,selectedPaymentMethod}))
  },[dispatch,selectedStatus,selectedPaymentMethod])
  return (
    <Fragment>
      <Breadcrumb title='Payments' titleText='Welcome to admin panel' parent='Payments' />
      <Container fluid={true}>
         <Modal isOpen={screenshotModal} toggle={ssToggle} centered size="lg">
                        <ModalHeader toggle={ssToggle}>
                          {/* Reactstrap Modal */}
                        </ModalHeader>
                
                        <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
                            <div className=" position-relative mt-4" style={{maxWidth:"500px",margin:"auto",aspectRatio:"4/5"}}>
                                <Image priority src={screenshot?.url} fill alt="screenShot" style={{objectFit:"cover"}}/>
                            </div>
                        </ModalBody>
                
                      </Modal>
      <Modal isOpen={modal} toggle={toggle} centered size="lg">
              <ModalHeader toggle={toggle}>
                {/* Reactstrap Modal */}
              </ModalHeader>
      
              <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
                <h4>{note}</h4>
              </ModalBody>
      
            </Modal>
      <Modal isOpen={actionModal} toggle={actionToggle} centered size="lg">
              <ModalHeader toggle={actionToggle}>
                {/* Reactstrap Modal */}
              </ModalHeader>
      
              <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
                <h2>Submit Action</h2>
                <Form onSubmit={handleSubmitAction}>
                  <Input
                  type="text"
                  name="adminNote"
                  value={adminNote}
                  className="mb-2"
                  onChange={(e)=>setAdminNote(e.target.value)}
                  placeholder="Enter note for user"
                  />
                  <Input 
                  type="select"
                  name="adminNote"
                  value={status}
                  onChange={(e)=>setStatus(e.target.value)}
                  placeholder="Enter note for user"
                  >
                    <option value={""}>select action</option>
                    <option value={"Approved"}>Approved</option>
                    <option value={"Rejected"}>Rejected</option>
                  </Input>
                  <Button className="mt-4" style={{width:"100%"}} disabled={paymentactionloading} type="submit" size="sm" color="success">{paymentactionloading ? "Processing..." : "Submit"}</Button>
                </Form>
              </ModalBody>
      
            </Modal>
        <Row>
          <Col lg='12'>
            <Card className='card'>
              <CardHeader className='pb-0 card-header d-flex justify-content-between align-items-center'>
                <h5>Payment lists</h5>
                <div className=" d-flex align-items-center gap-2">
                  <Input 
                  type="select"
                  name="selectedPaymentMethod"
                  value={status}
                  onChange={(e)=>setSelectedPaymentMethod(e.target.value)}
                  placeholder="Enter note for user"
                  style={{width:"200px"}}
                  >
                    <option value={""}>payment method</option>
                    <option value={"easypaisa"}>Easypaisa</option>
                    <option value={"jazzcash"}>Jangalazzcash</option>
                    <option value={"bank_transfer"}>Bank Transfer</option>
                  </Input>
                  <Input 
                  type="select"
                  name="selectedStatus"
                  value={status}
                  className="me-2"
                  onChange={(e)=>setSelectedStatus(e.target.value)}
                  placeholder="Enter note for user"
                  >
                    <option value={""}>select status</option>
                    <option value={"Approved"}>Approved</option>
                    <option value={"Pending"}>Pending</option>
                    <option value={"Rejected"}>Rejected</option>
                  </Input>
                  <Button onClick={resetFilter} color="danger" size="sm" title="Reset Filter"><Trash/></Button>
                </div>
              </CardHeader>
              {paymentloading ? (<ProfileLoader/>) : (
                <CardBody className='card-body payment-table'>
                <div id='batchDelete' className='transactions table-responsive'>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Property Type</th>
                        <th>Property For</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Screenshot</th>
                        <th>Note</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments?.length===0 ? (
                        <tr>
                          <td className=" text-center" colSpan={9}>No payments found</td>
                        </tr>
                      ) :
                        payments?.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i+1}</td>
                              <td>
                                  <span style={{cursor:"pointer"}} onClick={()=>handlePush(item.property.slug)}>{item.property.type}</span>
                              </td>
                              <td>{item.property.category}</td>
                              <td>
                                <Badge color={`${item.status === "Pending" ? "warning" : item.status==="Rejected" ? "danger" : "success"}`}>{item.status}</Badge>
                              </td>
                              <td>Rs. {item.amount}</td>
                              <td><Button onClick={()=>handleScreenshotToggle(item.paymentScreenshot)} color="success" size="sm">View Screenshot</Button></td>
                              <td>{item.adminNote ? (<Button onClick={()=>handleNote(item.adminNote)} color="success" size="sm">View Note</Button>) : ("Not yet")}</td>
                              
                              
                               <td>{formatDatenew(item.createdAt)}</td>
                              <td>
                               {item.status === "Pending" ? (<Button onClick={()=>handleActionToggle(item._id)} color="success" size="sm">Take action</Button>) : (<Button disabled color={item.status==="Approved" ? "success" : "danger"} size="sm">{item.status}</Button>)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Payments;
