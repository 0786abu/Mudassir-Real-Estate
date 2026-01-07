"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumb from "@/adminComponents/components/Common/Breadcrumb";
import PropertyBoxFour from "@/adminComponents/components/Common/Propertybox/PropertyBoxOne";
import { useDispatch, useSelector } from "react-redux";
import { AdminFetchAgents } from "@/redux-toolkit/action/adminAction";
import ProfileLoader from "@/components/common/Loader";

const AllUsers = () => {
    const {allagents, agentloading,totalAuthPages,totalAuths} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        dispatch(AdminFetchAgents(currentPage))
    },[dispatch,currentPage])

    const getPages = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - 1); // sliding window
    let end = Math.min(totalAuthPages, start + maxVisible - 1);

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
  setCurrentPage(page);
}

  return (
    <Fragment>
      <Breadcrumb title='All Agents' titleText='Welcome To Admin panel' parent='Agents' />
      {agentloading ? (<ProfileLoader/>) : (
        <Container fluid={true}>
        <Row className='agent-section property-section user-lists'>
          <Col lg='12'>
            <div className='property-grid-3 agent-grids ratio2_3'>
              <Row className='property-2 column-sm property-label property-grid list-view'>
                {allagents &&
                  allagents.map((item, i) => {
                    return (
                      <Col md='12' xl='6' key={i}>
                        <PropertyBoxFour data={item} from="agent" />
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      )}
      {totalAuths>12 && (
               <nav className="theme-pagination">
<ul className="pagination">
  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
    <div className="page-link" onClick={() => goToPage(1)}>«</div>
  </li>
  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
    <div className="page-link" onClick={() => goToPage(currentPage - 1)}>{"<"}</div>
  </li>

  {pages.map((p,index) => (
    <li key={index} className={`page-item `}>
      <button style={{background:"transparent",border:"none"}} disabled={p === currentPage || agentloading} className={`page-item ${p === currentPage ? "active" : ""}`} onClick={() => goToPage(p)}>
        <div className="page-link">{agentloading && p===currentPage ? "...": p}</div>
      </button>
    </li>
  ))}

  <li className={`page-item ${currentPage === totalAuthPages ? "disabled" : ""}`}>
    <div className="page-link" onClick={() => goToPage(currentPage + 1)}>{">"}</div>
  </li>
  <li className={`page-item ${currentPage === totalAuthPages ? "disabled" : ""}`}>
    <div className="page-link" onClick={() => goToPage(totalAuthPages)}>»</div>
  </li>
</ul>
</nav>
             )}
    </Fragment>
  );
};

export default AllUsers;
