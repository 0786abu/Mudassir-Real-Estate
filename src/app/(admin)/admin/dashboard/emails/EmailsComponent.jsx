"use client";
import Breadcrumb from '@/adminComponents/components/Common/Breadcrumb';
import ProfileLoader from '@/components/common/Loader';
import { AdminDeleteEmail, AdminFetchEmails } from '@/redux-toolkit/action/emailAction';
import { Delete } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const EmailsComponent = () => {
    const {emails,emailloading,totalEmails,totalPages,createemailloading} = useSelector((state)=>state.Email);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [emailID, setEmailID] = useState("");
    useEffect(()=>{
        dispatch(AdminFetchEmails(currentPage))
    },[dispatch,currentPage])
    const handleDelete = (id)=>{
        setEmailID(id);
        dispatch(AdminDeleteEmail(id))
    }

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
        <Breadcrumb/>
        <h2>Subcribe Emails</h2>
        {emailloading ? <ProfileLoader/> : (
            <div className=' d-flex align-items-center flex-wrap gap-4'>
                {emails?.map((email,index)=>{
                    return (
                        <div key={index} className=' p-2 rounded-2 shadow-sm border-light border'><span className='me-2'>{email.email}</span><span style={{cursor:"pointer"}} onClick={()=>handleDelete(email._id)}>{createemailloading && emailID===email._id ? <span className=' spinner-border' role='status' style={{width:"16px",height:"16px"}}></span> : <Delete/>} </span></div>
                    )
                })}
            </div>
        )}
         {totalEmails>50 && (
                     <nav className="theme-pagination">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(1)}>«</div>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(currentPage - 1)}>{"<"}</div>
        </li>

        {pages.map((p,index) => (
          <li key={index} className={`page-item `}>
            <button style={{background:p===currentPage ? "#108a00" : "",color:p===currentPage ? "white" : "black"}} disabled={p === currentPage || emailloading} className="page-link" onClick={() => goToPage(p)}>{emailloading && p===currentPage ? "...": p}</button>
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
  )
}

export default EmailsComponent