import { AdminFetchNotifications } from '@/redux-toolkit/action/notificationsAction'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Bell } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Media } from 'reactstrap'
import dayjs from "@/utils/DAYJS"

const Notification = () => {
    const {notifications,notificationloading} = useSelector((state)=>state.Notifications);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(AdminFetchNotifications())
    },[dispatch])
    return (
        <li className="onhover-dropdown notification-box">
            {notificationloading ? <span className=' spinner-border' role='status' style={{width:"18px",height:"18px"}}></span> : <Bell />}
            <span className="label label-shadow label-pill notification-badge">{notifications?.filter((item)=>item.isRead===false)?.length}</span>
            <div className="notification-dropdown onhover-show-div">
                <div className="dropdown-title">
                    <h6>Notifications</h6>
                    <Link href='/admin/dashboard/notifications'>Show all</Link>
                </div>
                <ul>
                    {notifications?.slice(0,4)?.map((notification)=>{
                        return (
                    <li key={notification._id}>
                        <Media className="media">
                            <div className="icon-notification bg-success-light">
                                <i className="fas fa-file-invoice-dollar" />
                            </div>
                            <Media body className="media-body">
                                <h6>{notification.type}</h6>
                                <span>{dayjs(notification.createdAt).fromNow()}</span>
                                <span>{notification.message.slice(0,40)}...</span>
                            </Media>
                        </Media>
                    </li>
                        )
                    })}
                </ul>
            </div>
        </li>
    )
}

export default Notification