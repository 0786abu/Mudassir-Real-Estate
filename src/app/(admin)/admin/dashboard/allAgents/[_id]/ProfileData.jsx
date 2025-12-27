"use client";
import React, { Fragment, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/adminComponents/components/Common/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AdminFetchAllAboutAgent, AdminFetchAllAboutUser } from '@/redux-toolkit/action/adminAction';
import ProfileLoader from '@/components/common/Loader';
import RecentPayment from '@/adminComponents/components/manageuser/profile/RecentPayments';
import SalesOverview from '@/components/pages/userPanel/userDashboardTab/SalesOverview';
import SalesByAgent from '@/components/pages/userPanel/userDashboardTab/SalesByAgent';
import AvailableProperty from '@/components/pages/userPanel/userDashboardTab/AvailableProperty';

// Dynamically import components with SSR disabled
// const Following = dynamic(() => import('@/adminComponents/components/manageuser/profile/Following'), { ssr: false });
// const UserChart = dynamic(() => import('@/adminComponents/components/manageuser/profile/UserChart'), { ssr: false });
const RecentProperty = dynamic(() => import('@/adminComponents/components/manageuser/profile/RecentProperty'), { ssr: false });
// const RecentChart = dynamic(() => import('@/adminComponents/components/manageuser/profile/RecentChart'), { ssr: false });
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
                                <SalesOverview data={aboutAgent?.viewsData} from="admin"/>
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
