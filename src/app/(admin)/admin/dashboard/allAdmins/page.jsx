"use client";
import React, { Fragment, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumb from "@/adminComponents/components/Common/Breadcrumb";
import PropertyBoxFour from "@/adminComponents/components/Common/Propertybox/PropertyBoxOne";
import { useDispatch, useSelector } from "react-redux";
import { AdminFetchAdmins } from "@/redux-toolkit/action/adminAction";
import ProfileLoader from "@/components/common/Loader";

const AllUsers = () => {
    const {alladmins, userloading} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(AdminFetchAdmins())
    },[dispatch])

  return (
    <Fragment>
      <Breadcrumb title='All Admins' titleText='Welcome To Admin panel' parent='Admins' />
      {userloading ? (<ProfileLoader/>) : (
        <Container fluid={true}>
        <Row className='agent-section property-section user-lists'>
          <Col lg='12'>
            <div className='property-grid-3 agent-grids ratio2_3'>
              <Row className='property-2 column-sm property-label property-grid list-view'>
                {alladmins &&
                  alladmins.map((item, i) => {
                    return (
                      <Col md='12' xl='6' key={i}>
                        <PropertyBoxFour data={item} label={false} from="admin" />
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      )}
    </Fragment>
  );
};

export default AllUsers;
