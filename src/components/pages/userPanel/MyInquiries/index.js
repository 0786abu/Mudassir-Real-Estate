
import ProfileLoader from '@/components/common/Loader';
import { MyInquiriess, MyLLeads } from '@/redux-toolkit/action/leadAction';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap'

export const formatDatenew = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

const MyInquiries = () => {
    const {myInquiries,leadloading} = useSelector((state)=>state.Lead);
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(null);
    const [isHover2, setIsHover2] = useState(null);
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState(false);
    
    const toggleModal = ()=>setMessageModal(!messageModal);
    const showMessage = (msg)=>{
        setMessage(msg);
        setMessageModal(!messageModal);
    }

    useEffect(()=>{
        dispatch(MyInquiriess("inquiry"));
    },[dispatch])
  return (
    <div className='bg-white p-3 rounded-4 shadow-sm'>
         <Modal isOpen={messageModal} toggle={toggleModal} centered size="lg">
                        <ModalHeader toggle={toggleModal}>
                          {/* Reactstrap Modal */}
                        </ModalHeader>
                
                        <ModalBody style={{textAlign:"center",marginBottom:"20px"}}>
                            <h4>{message}</h4>
                        </ModalBody>
                
                      </Modal>
        <h5 className="mb-3 fw-semibold">Requested property inquiries ({myInquiries?.length>0 ? (myInquiries?.length) : 0})</h5>
        {leadloading ? (<ProfileLoader/>) : (
            <Table hover bordered responsive className="align-middle mb-0">
          <thead className="table-light sticky-top">
            <tr>
              <th>#</th>
              {/* <th>User</th> */}
              <th>Requested To</th>
              <th>email</th>
              <th>phone</th>
              <th>Status</th>
              <th>My Message</th>
              <th>Purpose</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
                   {myInquiries?.length===0 ? (
                    <tr><td colSpan={7} align='center' style={{borderBottom:"none",paddingTop:"10px"}}>No leads yet</td></tr>
                   ) : myInquiries?.map((lead,index)=>{
                    let profile= lead?.requestedTo?.role==="agent" ? lead?.requestedTo?.agencyProfile : lead?.requestedTo?.profile;
                    
                    return (
                         <tr key={lead._id}>
              <td>{index+1}</td>
              {/* <td>
                <div className="fw-semibold">Mark Otto</div>
                <small className="text-muted">@mdo</small>
              </td> */}
              <td className="fw-semibold">
                    <div className=' d-flex align-items-center gap-2'>
                        <Image 
                        src={profile?.url ? profile?.url : "/assets/images/profile.webp"}
                        alt={lead.name}
                        height={40}
                        width={40}
                        className=' object-fit-cover'
                        style={{
                            borderRadius:"50%"
                        }}
                        />
                        <div className=' d-flex flex-column'>
                            <span>{lead?.requestedTo?.name}</span>
                        <Badge size="sm">{lead?.requestedByModel}</Badge>
                        </div>
                    </div>
              </td>
              <td>
                {lead.email}
              </td>
              
              <td>
                {lead.phone}
              </td>
               <td>
                 <Badge color={lead.status==="pending" ? "warning" : lead.status==="contacted" ? "success" : "light"}>{lead.status}</Badge>
              </td>
               <td>
                              <Button onMouseEnter={()=>setIsHover(index)} onMouseLeave={()=>setIsHover(null)} style={{background:isHover===index ? "#14a800" : "#108a00"}} onClick={()=>showMessage(lead.message)} size="sm" >
                                View
                              </Button>
                            </td>
              <td>
                {lead.property !== null ? (
                  <Link target='_blank' href={`/properties/${lead.property.slug}`}>
                  <Button onMouseEnter={()=>setIsHover2(index)} onMouseLeave={()=>setIsHover2(null)} style={{background:isHover2===index ? "#14a800" : "#108a00"}} size="sm" >
                  View
                </Button>
                </Link>
                ) : (
                  <span>For Agent Contact</span>
                )}
              </td>
              <td>
                <small className="text-muted">{formatDatenew(lead.createdAt)}</small>
              </td>
            </tr>
                    )
                   })}
          </tbody>
        </Table>
        )}
    </div>
  )
}

export default MyInquiries