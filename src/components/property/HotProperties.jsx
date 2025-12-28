"use client"
import Listview from '@/adminComponents/components/myproperties/PropertyList/Listview';
import { AdminProperties } from '@/redux-toolkit/action/propertyAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileLoader from '../common/Loader';

const HotProperties = () => {
    const {adminProperties,totalAdminProperties,totalAdminPropertiesPages,adminpropertyloading} = useSelector((state)=>state.Property);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const getPages = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - 1); // sliding window
    let end = Math.min(totalAdminPropertiesPages, start + maxVisible - 1);

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

    useEffect(()=>{
        dispatch(AdminProperties(currentPage));
    },[dispatch,currentPage])
  return (
    <div className=' mx-auto' style={{maxWidth:"1280px",marginTop:"100px",padding:"0px 20px"}}>
        {adminpropertyloading ? <ProfileLoader/> : (
          <Listview data={adminProperties}/>
        )}
        {totalAdminProperties>12 && (
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
            <button style={{background:p===currentPage ? "#108a00" : "",color:p===currentPage ? "white" : "black"}} disabled={p === currentPage || adminpropertyloading} className="page-link" onClick={() => goToPage(p)}>{adminpropertyloading && p===currentPage ? "...": p}</button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalAdminPropertiesPages ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(currentPage + 1)}>{">"}</div>
        </li>
        <li className={`page-item ${currentPage === totalAdminPropertiesPages ? "disabled" : ""}`}>
          <div style={{background:"#108a00",color:"white"}} className="page-link" onClick={() => goToPage(totalAdminPropertiesPages)}>»</div>
        </li>
      </ul>
    </nav>
                  )}
    </div>
  )
}

export default HotProperties