"use client"
import PropertyBoxFour from '@/components/elements/propertyBoxs/PropertyBoxFour'
import { setChangeView } from '@/redux-toolkit/slice/agentSlice'
import React, { useState } from 'react'
import { Grid, List } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'reactstrap'

const AgentContent = ({agents}) => {
    const {gridStyle} = useSelector((state)=>state.Agent);
    const dispatch = useDispatch();
    const handleChangeView = (style)=>{
        dispatch(setChangeView(style))
    }
  return (
    <div className={`property-wrapper-grid`}>
              <div className=" d-flex justify-content-between align-items-center mb-2">
                <div>
            <h4>Results ({agents?.length})</h4>
        </div>
            <ul>
          <li onClick={()=>handleChangeView("grid-view")} className={`grid-btn`}>
                <a className="grid-layout-view me-2">
                  <Grid style={{color:gridStyle==="grid-view" ? "#108a00" : "gray"}}/>
                </a>
              </li>
              <li onClick={()=>handleChangeView("list-view")} className={`list-btn `}>
                <a className="list-layout-view">
                  <List style={{color:gridStyle==="list-view" ? "#108a00" : "gray"}}/>
                </a>
              </li>
        </ul>
        

      </div>
              <div className={`property-2 row column-sm property-label property-grid  ${gridStyle === "list-view" ? "list-view" : ""}`}>
                {agents &&
                  agents.map((data, i) => (
                    <Col
                    sm={gridStyle === "grid-view" && "6"}
                      md={gridStyle === 'list-view' && '12'}
                      lg={gridStyle === "grid-view" && "4"}
                      xl={gridStyle === "list-view" && "6"}
                      xxl={gridStyle === "grid-view" && "4"}
                      className={`${gridStyle === "list-view" ? "list-view" : "grid-view"} wow fadeInUp `}
                      key={i}>
                      <PropertyBoxFour data={data} />
                    </Col>
                  ))}
              </div>
            </div>
  )
}

export default AgentContent