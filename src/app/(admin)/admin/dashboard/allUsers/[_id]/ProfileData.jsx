"use client";
import React, { Fragment, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/adminComponents/components/Common/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AdminFetchAllAboutUser } from '@/redux-toolkit/action/adminAction';
import ProfileLoader from '@/components/common/Loader';
import SalesByAgent from '@/components/pages/userPanel/userDashboardTab/SalesByAgent';
import AvailableProperty from '@/components/pages/userPanel/userDashboardTab/AvailableProperty';
// import RecentPayment from '@/adminComponents/components/manageuser/profile/RecentPayments';

// Dynamically import components with SSR disabled
// const Following = dynamic(() => import('@/adminComponents/components/manageuser/profile/Following'), { ssr: false });
// const UserChart = dynamic(() => import('@/adminComponents/components/manageuser/profile/UserChart'), { ssr: false });
const RecentProperty = dynamic(() => import('@/adminComponents/components/manageuser/profile/RecentProperty'), { ssr: false });
// const RecentChart = dynamic(() => import('@/adminComponents/components/manageuser/profile/RecentChart'), { ssr: false });
const ProfileDetail = dynamic(() => import('@/adminComponents/components/manageuser/profile/ProfileDetail'), { ssr: false });

const Profile = ({_id}) => {
    const {aboutUser,userloading} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(AdminFetchAllAboutUser(_id))
    },[dispatch,_id])
    return (
        <Fragment>
            <Breadcrumb title="User Profile" titleText="Welcome To Admin Panel" parent="Manage Users" />
           {userloading ? (<ProfileLoader/>) : (
             <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Row className="user-info">
                            <ProfileDetail aboutUser={aboutUser?.user} />
                            <Col sm="12">
                                <RecentProperty properties={aboutUser?.recentProperties} />
                                    <SalesByAgent data={aboutUser?.typedData} from="admin"/>
                                <AvailableProperty data={aboutUser?.availablePropertiesPercent} from="admin"/>
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
