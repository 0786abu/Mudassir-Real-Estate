"use client";
import React, { Fragment, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/adminComponents/components/Common/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AdminFetchAllAboutAgent } from '@/redux-toolkit/action/adminAction';
import ProfileLoader from '@/components/common/Loader';
import SalesByAgent from '@/components/pages/userPanel/userDashboardTab/SalesByAgent';
import AvailableProperty from '@/components/pages/userPanel/userDashboardTab/AvailableProperty';

// Dynamically import components with SSR disabled
const RecentProperty = dynamic(() => import('@/adminComponents/components/manageuser/profile/RecentProperty'), { ssr: false });
const ProfileDetail = dynamic(() => import('@/adminComponents/components/manageuser/profile/ProfileDetail'), { ssr: false });

const Profile = ({_id}) => {
    const {aboutAgent,agentloading} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(AdminFetchAllAboutAgent(_id))
    },[dispatch,_id])
    return (
        <Fragment>
            <Breadcrumb title="User Profile" titleText="Welcome To Admin Panel" parent="Manage Users" />
           {agentloading ? (<ProfileLoader/>) : (
             <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Row className="user-info">
                            <ProfileDetail aboutUser={aboutAgent?.agent} />
                            <Col sm="12">
                                <RecentProperty properties={aboutAgent?.recentProperties} />
                                    <SalesByAgent data={aboutAgent?.typedData} from="admin"/>
                                <AvailableProperty data={aboutAgent?.availablePropertiesPercent} from="admin"/>
                                {/* <RecentPayment /> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
           )}
        </Fragment>
    );
};

export default Profile;
