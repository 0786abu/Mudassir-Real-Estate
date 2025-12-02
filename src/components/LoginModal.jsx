"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { User, Lock } from "react-feather";
import { Modal } from "bootstrap";

export default function LoginModal() {
  const [isLogin, setIsLogin] = useState(true);
  const modalRef = useRef(null);
  const bsModalRef = useRef(null); // store modal instance

  useEffect(() => {
    const modalEl = modalRef.current;
    bsModalRef.current = new Modal(modalEl); // initialize once
  }, []);

  const onClickForForgot = () => {
    if (bsModalRef.current) {
      bsModalRef.current.hide(); // let Bootstrap handle scroll & backdrop
    }
  };

  return (
    <div className="modal fade" id="authModal" aria-hidden="true" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">

          {/* Modal Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">{isLogin ? "Log in" : "Create Account"}</h4>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          {/* LOGIN FORM */}
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
                <Link href="/forgot-password" onClick={onClickForForgot} className="btn btn-link">
                  Forgot Password?
                </Link>
              </div>

              <button className="btn btn-dark w-100 mb-2">Log in</button>

              <p className="text-center">
                Don't have an account?{" "}
                <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(false)}>
                  Create Account
                </button>
              </p>
            </form>
          )}

          {/* SIGNUP FORM */}
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
                <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(true)}>
                  Log in
                </button>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
