import React from 'react'
import AdminNotifications from './NotificationSection'
import Breadcrumb from '@/adminComponents/components/Common/Breadcrumb'

const page = () => {
  return (
    <div style={{marginTop:"60px"}}>
        <Breadcrumb title='Notifications' titleText='Welcome To Admin Panel' parent='Notifications' />
        <AdminNotifications/>
    </div>
  )
}

export default page