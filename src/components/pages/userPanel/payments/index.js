import ProfileLoader from "@/components/common/Loader";
import { getPayments } from "@/redux-toolkit/action/paymentAction";
import { setSelectedSlug } from "@/redux-toolkit/slice/propertySlice";
import { formatPK } from "@/utils/Formatter";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }


const Payments = ({setActiveTab}) => {
    const {payments,paymentloading} = useSelector((state)=>state.Payment);
    const [modal, setModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [message, setMessage] = useState("");
    const [screenShot, setScreenShot] = useState(null);
    const toggle = (ss)=> {
        setModal(!modal);
        setScreenShot(ss)
    }
    const toggleMessage = (message)=> {
        setMessageModal(!messageModal);
        setMessage(message)
    }
    const hideMessageModel = ()=> setMessageModal(!messageModal)

    const dispatch = useDispatch();
    const handleMyProperty = (slug) => {
          setActiveTab("propertyDetail");
          dispatch(setSelectedSlug(slug))
      };

      useEffect(()=>{
        dispatch(getPayments())
      },[dispatch])
    
  return (
    <div className="bg-white p-3 rounded-4 shadow-sm">
         <Modal isOpen={modal} toggle={toggle} centered size="lg">
                <ModalHeader toggle={toggle}>
                  {/* Reactstrap Modal */}
                </ModalHeader>
        
                <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
                    <div className=" position-relative mt-4" style={{maxWidth:"500px",margin:"auto",aspectRatio:"4/5"}}>
                        <Image priority src={screenShot?.url} fill alt="screenShot" style={{objectFit:"cover"}}/>
                    </div>
                </ModalBody>
        
              </Modal>
         <Modal isOpen={messageModal} toggle={hideMessageModel} centered size="lg">
                <ModalHeader toggle={hideMessageModel}>
                  {/* Reactstrap Modal */}
                </ModalHeader>
        
                <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
                    <h4>{message}</h4>
                </ModalBody>
        
              </Modal>
      <h5 className="mb-3 fw-semibold">Payments History</h5>

      {paymentloading ? (<ProfileLoader/>) : payments?.length===0 ? (
        <div className=" d-flex justify-content-center align-items-center" style={{minHeight:"80vh"}}>
          <h2>No Payments Yet</h2>
        </div>
      ) : (
        <div className="table-responsive">
        <Table hover bordered responsive className="align-middle mb-0">
          <thead className="table-light sticky-top">
            <tr>
              <th>#</th>
              {/* <th>User</th> */}
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Screenshot</th>
              <th>Property</th>
              <th>Admin Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((payment)=>{
                return (
                    <tr key={payment._id}>
              <td>1</td>
              {/* <td>
                <div className="fw-semibold">Mark Otto</div>
                <small className="text-muted">@mdo</small>
              </td> */}
              <td className="fw-semibold">{formatPK(payment.amount)}</td>
              <td>
                {payment.paymentMethod==="bank" ? (
                    <div className=" d-flex flex-column">
                    <span>{payment.paymentMethod}</span>
                <small className=" text-secondary">UBL</small>
                </div>
                ): (
                    <span>{payment.paymentMethod}</span>
                )}
              </td>
              
              <td>
                <Badge color={payment.status==="Approved" ? "success" : payment.status==="Rejected" ? "danger" : "warning"} pill>
                  {payment.status}
                </Badge>
              </td>
              <td>
                <Button onClick={()=>toggle(payment.paymentScreenshot)} size="sm" color="primary" outline>
                  View
                </Button>
              </td>
               <td>
                <Button onClick={()=>handleMyProperty(payment.property.slug)} size="sm" color="primary" outline>
                  View
                </Button>
              </td>
              <td>
                {payment.adminNote ? (
                    <Button size="sm" onClick={()=>toggleMessage(payment.adminNote)} color={payment.status==="Rejected" ? "danger" : "success"}>View Message</Button>
                ) : (
                    <span>No Message Yet</span>
                )}
              </td>
              <td>
                <small className="text-muted">{formatDatenew(payment.createdAt)}</small>
              </td>
            </tr>
                )
            })}
          </tbody>
        </Table>
      </div>
      )}
    </div>
  );
};

export default Payments;
