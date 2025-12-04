import { LoginUser } from '@/redux-toolkit/action/authAction'
import Link from 'next/link'
import React, { useState } from 'react'
import { Lock, User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

const Login = ({setIsLogin,onClickForForgot}) => {
    const {registerloading} = useSelector((state)=>state.Auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e)=>{
        e.preventDefault();
        const user = {
            email,password
        }
        dispatch(LoginUser({user,onClickForForgot}))
    }
  return (
         <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <div className="input-group">
                    <span className="input-group-text"><User /></span>
                    <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control" placeholder="Enter Email" required />
                  </div>
                </div>
                <div className="form-group mb-2">
                  <div className="input-group">
                    <span className="input-group-text"><Lock /></span>
                    <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Link href="/forgot-password" onClick={onClickForForgot} className="btn btn-link">Forgot Password?</Link>
                </div>
                <button disabled={registerloading} type='submit' className="btn btn-dark w-100 mb-2">{registerloading ? "Loading...":"Log in"}</button>
                <p className="text-center">
                  Don't have an account?{" "}
                  <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(false)}>Create Account</button>
                </p>
              </form>
  )
}

export default Login