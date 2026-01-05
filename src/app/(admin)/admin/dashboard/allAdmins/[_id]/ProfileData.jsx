"use client";
import React, { Fragment, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/adminComponents/components/Common/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AdminFetchAllAboutAdmin } from '@/redux-toolkit/action/adminAction';
import ProfileLoader from '@/components/common/Loader';
import SalesByAgent from '@/components/pages/userPanel/userDashboardTab/SalesByAgent';
import AvailableProperty from '@/components/pages/userPanel/userDashboardTab/AvailableProperty';

const RecentProperty = dynamic(() => import('@/adminComponents/components/manageuser/profile/RecentProperty'), { ssr: false });
const ProfileDetail = dynamic(() => import('@/adminComponents/components/manageuser/profile/ProfileDetail'), { ssr: false });

const Profile = ({_id}) => {
    const {aboutAdmin,userloading} = useSelector((state)=>state.Admin);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(AdminFetchAllAboutAdmin(_id))
    },[dispatch,_id])
    return (
        <Fragment>
            <Breadcrumb title="Admin Profile" titleText="Welcome To Admin Panel" parent="Admins" />
           {userloading ? (<ProfileLoader/>) : (
             <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Row className="user-info">
                            <ProfileDetail aboutUser={aboutAdmin?.admin} />
                            <Col sm="12">
                                <RecentProperty properties={aboutAdmin?.recentProperties} />
                                    <SalesByAgent data={aboutAdmin?.typedData} from="admin"/>
                                <AvailableProperty data={aboutAdmin?.availablePropertiesPercent} from="admin"/>
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
