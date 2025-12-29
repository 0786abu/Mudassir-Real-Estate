"use client"
import Breadcrumb from "@/adminComponents/components/Common/Breadcrumb"
import ProfileLoader from "@/components/common/Loader"
import { AdminDeleteContact, AdminFetchContacts } from "@/redux-toolkit/action/contactAction"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap"


const page = () => {
  const {contacts,contactloading,totalPages,totalContacts,createcontactloading} = useSelector((state)=>state.Contact);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const toggle = ()=>setModal(!modal);
  const [contactID, setContactID] = useState("");
  const handleMessage = (msg)=>{
    setMessage(msg);
    setModal(!modal)
  }
  const handleDelete = (id)=>{
    setContactID(id);
    dispatch(AdminDeleteContact(id));
  }
  useEffect(()=>{
    dispatch(AdminFetchContacts(currentPage))
  },[dispatch,currentPage]);
  const getPages = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - 1); // sliding window
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if less than maxVisible pages at end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

   
const goToPage = (page)=>{
  setCurrentPage(page)
}

  return (
    <div>
        <Breadcrumb title='Contacts' titleText='Welcome To Admin panel' parent='Contacts' />
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody className="mb-4">
            {message}
          </ModalBody>
        </Modal>
        {contactloading ? <ProfileLoader/> : (
          <div className=" m-md-4 m-2">
            <Table responsive>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        Name
      </th>
      <th>
        Email
      </th>
      <th>
        Phone
      </th>
      <th>
       Message
      </th>
      <th>
        Action
      </th>
    </tr>
  </thead>
  <tbody>
    {contacts?.length===0 ? (
      <tr>
        <td colSpan={6} align="center">No Contact Found</td>
      </tr>
    ) :contacts?.map((contact,index)=>{
      return (
        <tr key={contact._id}>
      <th scope="row">
        {index + 1}
      </th>
      <td>
        {contact.name}
      </td>
      <td>
        {contact.email}
      </td>
      <td>
        {contact.phone}
      </td>
      <td>
        <Button color="info" size="sm" className="text-white" onClick={()=>handleMessage(contact.message)}>View Message</Button>
      </td>
      <td>
        <Button size="sm" color="danger" onClick={()=>handleDelete(contact._id)}>{createcontactloading && contactID===contact._id ? <><span className=" spinner-border" role="status" style={{width:"16px",height:"16px"}}></span> Delete</> : "Delete"}</Button>
      </td>
    </tr>
      )
    })}
  </tbody>
</Table>
 {totalContacts>12 && (
                     <nav className="theme-pagination mt-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(1)}>«</div>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(currentPage - 1)}>{"<"}</div>
        </li>

        {pages.map((p,index) => (
          <li key={index} className={`page-item `}>
            <button style={{background:p===currentPage ? "#108a00" : "",color:p===currentPage ? "white" : "black"}} disabled={p === currentPage || contactloading} className="page-link" onClick={() => goToPage(p)}>{contactloading && p===currentPage ? "...": p}</button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(currentPage + 1)}>{">"}</div>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(totalPages)}>»</div>
        </li>
      </ul>
    </nav>
                  )}
        </div>
        
        )}
    </div>
  )
}

export default page