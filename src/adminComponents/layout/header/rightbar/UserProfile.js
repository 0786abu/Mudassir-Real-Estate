import Link from 'next/link'
import React from 'react'
import { FileText, LogIn, User } from 'react-feather'

const UserProfile = ({user,loading}) => {
    return (
        <li className="profile-avatar onhover-dropdown">
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
                    <Link href='/myproperties/propertylist'>
                        <span>Listing</span>
                        <FileText />
                    </Link>
                </li>
                <li>
                    <Link href='/authentication/login'>
                        <span>Log in</span>
                        <LogIn />
                    </Link>
                </li>
            </ul>
        </li>
    )
}

export default UserProfile