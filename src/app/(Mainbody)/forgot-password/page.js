"use client";
import React, { Fragment, useState } from "react";
import { Container } from "reactstrap";
import { User } from "react-feather";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordd } from "@/redux-toolkit/action/authAction";

const ForgotPassword = () => {
  const {registerloading} = useSelector((state)=>state.Auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(ForgotPasswordd({email,setEmail}))
  }
  return (
    <Fragment>
      <Breadcrumb />
      <section className='login-wrap'>
        <Container>
          <div className='row log-in'>
            <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12'>
              <div className='theme-card'>
                <div className='title-3 text-start'>
                  <h2>Forgot your password</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <div className='input-group-text'>
                          <User />
                        </div>
                      </div>
                      <input type='text' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' placeholder='Enter Email' required />
                    </div>
                  </div>
                  <div>
                    <button disabled={registerloading} type='submit' className='btn btn-gradient btn-pill me-sm-3 me-2'>
                      {registerloading ? "Sending..." : "Send request"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default ForgotPassword;
