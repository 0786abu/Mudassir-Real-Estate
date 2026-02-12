"use client";

import Login from "@/components/screen/Login";
import Signup from "@/components/screen/Signup";
import { Logout_User, Logout_User2 } from "@/redux-toolkit/action/authAction";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"
import { GetFavouritesData } from "@/redux-toolkit/action/favouritesAction";
import { House, User } from "lucide-react";
import { setTabb } from "@/redux-toolkit/slice/authSlice";

export default function Navbar() { 
  const {sampleuser,logoutloading} = useSelector((state)=>state.Auth);
  const dispatch = useDispatch();
  const collapseRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);
 const [token, setToken] = useState(null);
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("real-estate-user-token");
        if (storedToken) {
          setToken(storedToken);
        }
      }
    }, []);
    useEffect(()=>{
      dispatch(GetFavouritesData());
    },[dispatch])

     useEffect(() => {
  const checkTokenExpiry = () => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(Logout_User2(router));
      }
    }
  };

  checkTokenExpiry();
}, [token]);
const router = useRouter();
const hanleCraetePropertyClick = ()=>{
  if(sampleuser?.role){
    if(sampleuser.role === "agent"){
      router.push("/dashboard/agent-dashboard");
      dispatch(setTabb("CreateProperty"));
    } else if(sampleuser.role === "individual"){
      router.push("/dashboard/user-dashboard");
      dispatch(setTabb("CreateProperty"));
    } else {
      router.push("/admin/dashboard/create-property");
    } 
}
}
  useEffect(() => {
    if (typeof window !== "undefined") {
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");

      // Initialize modal
      if (modalRef.current) {
        bsModalRef.current = new bootstrap.Modal(modalRef.current, {});
      }

      // Handle mobile menu auto-close
      const collapseEl = collapseRef.current;
      const navLinks = collapseEl.querySelectorAll(".nav-link");

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
          bsCollapse.hide();
        });
      });
    }
  }, []);

  // Handle Forgot Password click
  const onClickForForgot = () => {
    if (bsModalRef.current) bsModalRef.current.hide();
  };
  const handleLogout = ()=>{
    dispatch(Logout_User(router));
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 position-relative sticky-top">
        {logoutloading && (
          <div className="logout-loading">
          <span>Loading...</span>
        </div>
        )}
        <div className="container">

          {/* Logo */}
          <Link href="/" style={{aspectRatio:"16/9",width:"100px"}} className="navbar-brand position-relative fw-bold fs-4 order-lg-1 order-1">
          <Image 
          src={"/assets/images/final-logo.png"}
          alt="Pak Earth Logo"
          // width={100}
          // height={50}
          fill
          className=" object-fit-cover"
          style={{width:"100%"}}
          priority
          />
          </Link>

          {/* Right section */}
          <div className="d-flex align-items-center gap-2 ms-auto order-lg-3 order-2">

            {sampleuser?.role ? <button onClick={hanleCraetePropertyClick} className="btn loginn rounded-pill px-3 py-1"><House size={16}/> Create Property</button> : <button className="btn loginn rounded-pill px-3 py-1" data-bs-toggle="modal" data-bs-target="#authModal"><House size={16}/> Create Property</button>}
            {!sampleuser && (
              <button className="btn loginn rounded-pill px-3 py-1" data-bs-toggle="modal" data-bs-target="#authModal"><User size={16}/> Login</button>
            )}

             {sampleuser && (
              <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-decoration-none" data-bs-toggle="dropdown">
                <Image src={sampleuser?.profile ? sampleuser?.profile?.url : "/assets/images/profile.webp"} width={40} height={40} alt="profile" className="rounded-circle" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                {sampleuser.role === "agent" ? (<li><Link href="/dashboard/agent-dashboard" className="dropdown-item">Agent Dashboard</Link></li>) : sampleuser.role==="individual" ? (<li><Link href="/dashboard/user-dashboard" className="dropdown-item">User Dashboard</Link></li>) : (<li><Link href="/admin/dashboard" className="dropdown-item">Admin Dashboard</Link></li>)}
                
                <li><hr className="dropdown-divider" /></li>
                <li><button onClick={handleLogout} className="dropdown-item text-danger">{logoutloading ? ("loading..."):"Logout"}</button></li>
              </ul>
            </div>
             )}

            <button className="navbar-toggler border-0 ms-1" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Nav links */}
          <div className="collapse navbar-collapse order-lg-2 order-3" id="mainNavbar" ref={collapseRef}>
            <ul className="navbar-nav mx-auto gap-lg-3 md mt-3 p-lg-2 mt-lg-0">
              <li className="nav-item"><Link href="/" className="nav-link nav-anchors fw-medium">Home</Link></li>
              <li className="nav-item"><Link href="/properties" className="nav-link nav-anchors fw-medium">Properties</Link></li>
              <li className="nav-item"><Link href="/projects" className="nav-link nav-anchors fw-medium">Projects</Link></li>
              <li className="nav-item"><Link href="/agents" className="nav-link nav-anchors fw-medium">Agents</Link></li>
              <li className="nav-item"><Link target="_blank" href="http://blog.pakearth.com" className="nav-link nav-anchors fw-medium">Blogs</Link></li>
              <li className="nav-item"><Link href="/about" className="nav-link nav-anchors fw-medium">About</Link></li>
              <li className="nav-item"><Link href="/contact" className="nav-link nav-anchors fw-medium">Contact</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div className="modal fade" id="authModal" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">

            {/* Modal Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold">{isLogin ? "Log in" : "Create Account"}</h4>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* Login Form */}
            {isLogin && (
             <Login setIsLogin={setIsLogin} onClickForForgot={onClickForForgot}/>
            )}

            {/* Signup Form */}
            {!isLogin && (
              <Signup setIsLogin={setIsLogin} onClickForForgot={onClickForForgot}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
