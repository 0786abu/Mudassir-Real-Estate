"use client"
import React, { useEffect } from 'react'
import Notification from './Notification'
import UserProfile from './UserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { AdminProfileData } from '@/redux-toolkit/action/authAction'
import { Home } from 'react-feather'
import { useRouter } from 'next/navigation'

const Rightbar = () => {
    const {userloading,user} = useSelector((state)=>state.Auth);
        const dispatch = useDispatch();
        
          useEffect(()=>{
        dispatch(AdminProfileData())
      },[dispatch])
      const router = useRouter();
    return (
        <>
          <span title='back home' onClick={()=>router.push("/")} className='mb-1'><Home/></span>
            <Notification />
            <UserProfile user={user} loading={userloading} />
        </>
    )
}
export default Rightbar
