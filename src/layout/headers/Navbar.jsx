"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 sticky-top">
      <div className="container">

        {/* Left: Logo */}
        <Link href="/" className="navbar-brand fw-bold fs-4 order-lg-1 order-1">
          LOGO
        </Link>

        {/* Right: Login + User Dropdown + Hamburger (mobile right) */}
        <div className="d-flex align-items-center gap-2 ms-auto order-lg-3 order-2">

          {/* Login btn (desktop only) */}
          <button
  className="btn btn-dark rounded-pill px-3 py-1 "
  data-bs-toggle="modal"
  data-bs-target="#authModal"
>
  Login
</button>

          {/* User dropdown */}
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-decoration-none"
              data-bs-toggle="dropdown"
            >
              <Image
                src="/assets/images/man.png"
                width={40}
                height={40}
                alt="profile"
                className="rounded-circle"
              />
            </a>

            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <Link href="/dashboard/user-dashboard" className="dropdown-item">Dashboard</Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger">
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Hamburger moved to right */}
          <button
            className="navbar-toggler border-0 ms-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        </div>

        {/* Center: Navigation Links */}
        <div className="collapse navbar-collapse order-lg-2  order-3" id="mainNavbar">
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
  );
}
