"use client"
import React, { useEffect } from 'react'
import Attachment from './Attachment'
import Mailbox from './Mailbox'
import Notification from './Notification'
import UserProfile from './UserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { AdminProfileData } from '@/redux-toolkit/action/authAction'

const Rightbar = () => {
    const {userloading,user} = useSelector((state)=>state.Auth);
        const dispatch = useDispatch();
        
          useEffect(()=>{
        dispatch(AdminProfileData())
      },[dispatch])
    return (
        <>
            <Attachment />
            <Notification />
            <Mailbox />
            <UserProfile user={user} loading={userloading} />
        </>
    )
}
export default Rightbar
