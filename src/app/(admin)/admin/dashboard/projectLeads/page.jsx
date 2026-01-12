"use client";
import { formatDatenew } from "@/app/(Mainbody)/projects/ProjectBox";
import { DeleteProjectLead, ProjectLeads } from "@/redux-toolkit/action/projectLeadAction";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Badge,
  Button
} from "reactstrap";

const page = () => {
    const {leads,leadloading,createprojectleadloading,totalPages,totalLeads} = useSelector((state)=>state.ProjectLead);
    const dispatch = useDispatch();
    const [leadID, setLeadID] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const handleDelete = (id)=>{
        setLeadID(id);
        dispatch(DeleteProjectLead(id))
    }
    useEffect(()=>{
            dispatch(ProjectLeads({page:currentPage}))
    },[dispatch,currentPage])
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
      setCurrentPage(page);
    }
    
  return (
    <div style={{marginTop:"120px"}}>
        <h2 className="my-2">Project Leads</h2>
      <Table hover bordered className="align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Project</th>
            <th>Lead Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leadloading ? (
            <tr>
                <td align="center" colSpan={7}><span className=" spinner-border" role="status" style={{width:"20px",height:"20px"}}></span></td>
            </tr>
          ) : leads?.length===0 ? (
            <tr>
                <td align="center" colSpan={7}>
                <h4>No Project Leads Found</h4>
                </td>
            </tr>
          ) :leads?.map((item, index) => (
            <tr key={item._id}>
              {/* NUMBER */}
              <td>{index + 1}</td>

              {/* PROJECT INFO */}
              <td>
                <Link href={`/projects/${item.project.slug}`}>
                  <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.project.projectLogo.url}
                    alt={item.project.projectTitle}
                    width="55"
                    height="55"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <div>
                    <div className="fw-semibold">
                      {item.project.projectTitle}
                    </div>
                    <Badge color="secondary" pill>
                      {item.project.type}
                    </Badge>
                  </div>
                </div>
                </Link>
              </td>

              {/* LEAD NAME */}
              <td>{item.name}</td>

              {/* EMAIL */}
              <td>{item.email}</td>

              {/* PHONE */}
              <td>{item.phone}</td>

              {/* DATE */}
              <td>
                {formatDatenew(item.createdAt)}
              </td>
              <td>
                <Button disabled={createprojectleadloading} onClick={()=>handleDelete(item._id)} color="danger" size="sm">{createprojectleadloading && leadID===item._id ? <span className=" spinner-border" role="status" style={{width:"20px",height:"20px"}}></span> : <Trash/>}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        {totalLeads>20 && (
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
      <button style={{background:"transparent",border:"none"}} disabled={p === currentPage || leadloading} className={`page-item ${p === currentPage ? "active" : ""}`} onClick={() => goToPage(p)}>
        <div className="page-link">{leadloading && p===currentPage ? "...": p}</div>
      </button>
    </li>
  ))}

  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
    <div className="page-link" onClick={() => goToPage(currentPage + 1)}>{">"}</div>
  </li>
  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
    <div className="page-link" onClick={() => goToPage(totalPages)}>»</div>
  </li>
</ul>
</nav>
             )}
    </div>
  );
};

export default page;
