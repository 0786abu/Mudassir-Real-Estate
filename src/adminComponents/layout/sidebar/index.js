"use client"
import Link from "next/link";
import React from "react";
import { ChevronsLeft } from "react-feather";
import { Media } from "reactstrap";
import SidebarMenu from "./SidebarMenu";
import { useSelector } from "react-redux";

const Sidebar = ({ toggle, setToggle }) => {
  const {userloading,user} = useSelector((state)=>state.Auth);
  return (
    <div className={`page-sidebar ${!toggle ? 'close_icon' : ''}`}>
      <div className="logo-wrap">
        <Link href='/admin/dashboard'>
          <img src="/assets/images/logo/4.png" className="img-fluid for-light" alt='' />
        </Link>
        <div className="back-btn d-lg-none d-inline-block">
          <ChevronsLeft onClick={() => { setToggle(!toggle) }} />
        </div>
      </div>
      <div className="main-sidebar">
        <div className="user-profile">
          {userloading ? "loading..." : (
            <Media className="media">
            <div className="change-pic">
              <img src={user?.profile?.url} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}} alt={user?.name} />
            </div>
            <Media body className="media-body">
              <Link href='/manage-users/profile'>
                <h6>{user?.name}</h6>
              </Link>
              <span className="font-roboto">{user?.email}</span>
            </Media>
          </Media>
          )}
        </div>
        <div id="mainsidebar">
          <SidebarMenu />
        </div >
      </div >
    </div >
  );
};

export default Sidebar;
