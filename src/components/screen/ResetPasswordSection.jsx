"use client";
import { ResetPassword } from '@/redux-toolkit/action/authAction';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Lock } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux'
import { Container, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';

const ResetPasswordSection = ({token}) => {
    const {registerloading} = useSelector((state)=>state.Auth);
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = (e)=>{
        e.preventDefault();

        dispatch(ResetPassword({password,token,router}))
    }
  return (
    <section className='login-wrap'>
        <Container>
          <div className='row log-in'>
            <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12'>
              <div className='theme-card'>
                <div className='title-3 text-start'>
                  <h2>Reset your password</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <FormGroup>
        <InputGroup className=' position-relative'>
          <Input type={showPassword ? "text" : "password"} id="pwd-input1" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control rounded-1" placeholder="Enter new password" required />
          <div style={{right:"2px", height:"90%",marginTop:"2px",zIndex:"10"}} className="input-group-apend d-flex justify-content-center align-items-center position-absolute top-0 bottom-o ">
            <InputGroupText className="input-group-text bg-white border-0 h-100">
              <i id="pwd-icon1" className={`far ${showPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowPassword((prev) => !prev)} />
            </InputGroupText>
          </div>
        </InputGroup>
      </FormGroup>
                  </div>
                  <div>
                    <button disabled={registerloading} type='submit' className='btn btn-gradient btn-pill me-sm-3 me-2'>
                      {registerloading ? "Submiting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
  )
}

export default ResetPasswordSection