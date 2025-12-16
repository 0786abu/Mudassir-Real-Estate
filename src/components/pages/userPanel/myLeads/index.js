
import ProfileLoader from '@/components/common/Loader';
import { MyLLeads } from '@/redux-toolkit/action/leadAction';
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

const MyLeads = () => {
    const {myLeads,leadloading} = useSelector((state)=>state.Lead);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState(false);
    
    const toggleModal = ()=>setMessageModal(!messageModal);
    const showMessage = (msg)=>{
        setMessage(msg);
        setMessageModal(!messageModal);
    }

    useEffect(()=>{
        dispatch(MyLLeads("inbox"));
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
        <h5 className="mb-3 fw-semibold">Leads ({myLeads?.length>0 ? (myLeads?.length) : 0})</h5>
        {leadloading ? (<ProfileLoader/>) : (
            <Table hover bordered responsive className="align-middle mb-0">
          <thead className="table-light sticky-top">
            <tr>
              <th>#</th>
              {/* <th>User</th> */}
              <th>RequestedBy</th>
              <th>email</th>
              <th>phone</th>
              <th>Status</th>
              <th>Message</th>
              <th>Property</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
                   {myLeads?.length===0 ? (
                    <td colSpan={7} align='center' style={{borderBottom:"none",paddingTop:"10px"}}>No leads yet</td>
                   ) : myLeads?.map((lead,index)=>{
                    let profile=null;
                    if(lead.requestedBy){
                        profile = lead.requestedBy.role==="agent" ? lead.requestedBy.agencyProfile : lead.requestedBy.profile
                    }
                    return (
                         <tr key={lead._id}>
              <td>{index+1}</td>
              {/* <td>
                <div className="fw-semibold">Mark Otto</div>
                <small className="text-muted">@mdo</small>
              </td> */}
              <td className="fw-semibold">
                {lead.isGuest ? (
                    <div>
                        <h6>{lead.name}</h6>
                        <Badge size="sm">Guest</Badge>
                    </div>
                ) : (
                    <div className=' d-flex align-items-center gap-2'>
                        <Image 
                        src={profile.url ? profile.url : "/assets/images/profile.webp"}
                        alt={lead.name}
                        height={40}
                        width={40}
                        className=' object-fit-cover'
                        style={{
                            borderRadius:"50%"
                        }}
                        />
                        <div className=' d-flex flex-column'>
                            <span>{lead.name}</span>
                        <Badge size="sm">{lead.requestedByModel}</Badge>
                        </div>
                    </div>
                )}
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
                <Button onClick={()=>showMessage(lead.message)} size="sm" color="primary" outline>
                  View
                </Button>
              </td>
              <td>
                <Link target='_blank' href={`/properties/${lead.property.slug}`}>
                  <Button size="sm" color="primary" outline>
                  View
                </Button>
                </Link>
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

export default MyLeads