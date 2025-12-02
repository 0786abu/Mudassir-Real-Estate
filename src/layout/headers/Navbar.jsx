"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { User, Lock } from "react-feather";

export default function Navbar() {
  const collapseRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    // Import bootstrap JS only on client
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

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 sticky-top">
        <div className="container">

          {/* Logo */}
          <Link href="/" className="navbar-brand fw-bold fs-4 order-lg-1 order-1">LOGO</Link>

          {/* Right section */}
          <div className="d-flex align-items-center gap-2 ms-auto order-lg-3 order-2">
            <button className="btn btn-dark rounded-pill px-3 py-1" data-bs-toggle="modal" data-bs-target="#authModal">Login</button>

            <div className="dropdown">
              <a href="#" className="d-flex align-items-center text-decoration-none" data-bs-toggle="dropdown">
                <Image src="/assets/images/man.png" width={40} height={40} alt="profile" className="rounded-circle" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li><Link href="/dashboard/user-dashboard" className="dropdown-item">Dashboard</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger">Logout</button></li>
              </ul>
            </div>

            <button className="navbar-toggler border-0 ms-1" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Nav links */}
          <div className="collapse navbar-collapse order-lg-2 order-3" id="mainNavbar" ref={collapseRef}>
            <ul className="navbar-nav mx-auto gap-lg-3 md mt-3 p-lg-2 mt-lg-0">
              <li className="nav-item"><Link href="/" className="nav-link fw-medium">Home</Link></li>
              <li className="nav-item"><Link href="/properties" className="nav-link fw-medium">Properties</Link></li>
              <li className="nav-item"><Link href="/property" className="nav-link fw-medium">Property</Link></li>
              <li className="nav-item"><Link href="/services" className="nav-link fw-medium">Services</Link></li>
              <li className="nav-item"><Link href="/agents" className="nav-link fw-medium">Agents</Link></li>
              <li className="nav-item"><Link href="/blogs" className="nav-link fw-medium">Blogs</Link></li>
              <li className="nav-item"><Link href="/about" className="nav-link fw-medium">About</Link></li>
              <li className="nav-item"><Link href="/contact" className="nav-link fw-medium">Contact</Link></li>
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
              <form>
                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text"><User /></span>
                    <input type="text" className="form-control" placeholder="Enter Email" required />
                  </div>
                </div>
                <div className="form-group mb-2">
                  <div className="input-group">
                    <span className="input-group-text"><Lock /></span>
                    <input type="password" className="form-control" placeholder="Password" required />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Link href="/forgot-password" onClick={onClickForForgot} className="btn btn-link">Forgot Password?</Link>
                </div>
                <button className="btn btn-dark w-100 mb-2">Log in</button>
                <p className="text-center">
                  Don't have an account?{" "}
                  <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(false)}>Create Account</button>
                </p>
              </form>
            )}

            {/* Signup Form */}
            {!isLogin && (
              <form>
                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text"><User /></span>
                    <input type="text" className="form-control" placeholder="Full Name" required />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text"><User /></span>
                    <input type="email" className="form-control" placeholder="Enter Email" required />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text"><Lock /></span>
                    <input type="password" className="form-control" placeholder="Password" required />
                  </div>
                </div>
                <button className="btn btn-dark w-100 mb-2">Create Account</button>
                <p className="text-center">
                  Already have an account?{" "}
                  <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(true)}>Log in</button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
