"use client"
import React, { useEffect } from 'react'
import Notification from './Notification'
import UserProfile from './UserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { AdminProfileData } from '@/redux-toolkit/action/authAction'
import { Home, Maximize } from 'react-feather'
import { useRouter } from 'next/navigation'

const Rightbar = () => {
    const {userloading,user} = useSelector((state)=>state.Auth);
        const dispatch = useDispatch();
        
          useEffect(()=>{
        dispatch(AdminProfileData())
      },[dispatch])
      const router = useRouter();
      const goFull = () => {
          if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
              document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
              document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          } else {
            if (document.cancelFullScreen) {
              document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            }
          }
        }
    return (
        <>
         <Maximize onClick={goFull} className=' me-2' />
          <span title='back home' onClick={()=>router.push("/")} className='mb-1'><Home/></span>
            <Notification />
            <UserProfile user={user} loading={userloading} />
        </>
    )
}
export default Rightbar
