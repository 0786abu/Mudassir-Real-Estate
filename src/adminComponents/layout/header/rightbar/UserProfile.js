"use client";
import { Logout_User } from '@/redux-toolkit/action/authAction';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FileText, LogIn, User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = ({user,loading}) => {
    const {logoutloading} = useSelector((state)=>state.Auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = ()=>{
        dispatch(Logout_User(router));
    }
    return (
        <li className="profile-avatar onhover-dropdown">
            {logoutloading && (
          <div className="logout-loading">
          <span>Loading...</span>
        </div>
        )}
            <div>
               {loading ? (
                <div className="spinner-border" role="status" style={{width:"20px",height:"20px"}}>
</div>
               ) :  <img src={user?.profile?.url} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}} alt={user?.name} />}
            </div>
            <ul className="profile-dropdown onhover-show-div">
                <li>
                    <Link href='/admin/dashboard/profile'>
                        <span>Account </span>
                        <User />
                    </Link>
                </li>
                <li>
                    <Link href='/admin/dashboard/myProperties'>
                        <span>Listing</span>
                        <FileText />
                    </Link>
                </li>
                <li>
                    <div onClick={handleLogout}style={{cursor:"pointer"}}>
                        <span>Log in</span>
                        <LogIn />
                    </div>
                </li>
            </ul>
        </li>
    )
}

export default UserProfile