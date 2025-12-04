import { RegisterUser } from '@/redux-toolkit/action/authAction';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Lock, Mail, PhoneCall, User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap'

const Signup = ({setIsLogin,onClickForForgot}) => {
  const {registerloading} = useSelector((state)=>state.Auth)
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("individual");
    const router = useRouter();
    const [userData, setUserData] = useState({
      name:"",
      email:"",
      password:""
    });
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
      e.preventDefault();
      userData.role = role
      dispatch(RegisterUser(userData,onClickForForgot,router));
    }
  return (
    <div>
        <Form onSubmit={handleSubmit}>
                <FormGroup>
        <InputGroup>
          <div className="input-group-prepend">
            <InputGroupText>
              <User />
            </InputGroupText>
          </div>
          <Input type="text" value={userData.name} onChange={(e)=>setUserData({...userData, name:e.target.value})} className="form-control rounded-1" placeholder="Enter your name" required />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <div className="input-group-prepend">
            <InputGroupText>
              <Mail />
            </InputGroupText>
          </div>
          <Input type="email" value={userData.email} onChange={(e)=>setUserData({...userData, email:e.target.value})} className="form-control rounded-1" placeholder="Enter email address" required />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className=' position-relative'>
          <div className="input-group-prepend">
            <InputGroupText>
              <Lock />
            </InputGroupText>
          </div>
          <Input type={showPassword ? "text" : "password"} id="pwd-input1" value={userData.password} onChange={(e)=>setUserData({...userData, password:e.target.value})} className="form-control rounded-1" placeholder="Password" required />
          <div style={{right:"2px", height:"90%",marginTop:"2px",zIndex:"10"}} className="input-group-apend d-flex justify-content-center align-items-center position-absolute top-0 bottom-o ">
            <InputGroupText className="input-group-text bg-white border-0 h-100">
              <i id="pwd-icon1" className={`far ${showPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowPassword((prev) => !prev)} />
            </InputGroupText>
          </div>
        </InputGroup>
      </FormGroup>
                {/* <div className="mb-4">

  <label className="d-block mb-2 fw-semibold">Phone Number*</label>

  <div
    className="d-flex align-items-center border rounded px-2 py-1"
    style={{
      height: "48px",
      background: "#fff",
      boxShadow: "0 0 6px rgba(0,0,0,0.08)",
    }}
  >
    <img
      src="/assets/images/pk-flag.png"
      alt="PK"
      style={{
        width: "22px",
        height: "15px",
        objectFit: "cover",
        borderRadius: "2px",
        marginRight: "8px",
      }}
    />

    <select
      className="border-0 bg-transparent"
      disabled
      style={{
        padding: "4px",
        outline: "none",
        fontWeight: "500",
        fontSize: "14px",
      }}
    >
      <option value="+92">+92</option>
    </select>

    <span
      style={{
        width: "1px",
        height: "60%",
        background: "#ccc",
        margin: "0 10px",
      }}
    ></span>
    <input
      type="text"
      placeholder="301 2345678"
      className="flex-grow-1 border-0"
      style={{
        outline: "none",
        fontSize: "15px",
        color: "#333",
      }}
    />
  </div>
</div> */}

{/* Checkboxes */}
<div className="mt-3 d-flex justify-content-start gap-4 align-items-center">
  <label className="d-block fw-semibold mb-2">I am</label>

  <div className="d-flex gap-4">

    <label className="d-flex align-items-center gap-2">
      <input
        type="checkbox"
        checked={role==="individual"}
        onChange={(e)=>setRole("individual")}
        style={{
          width: "18px",
          height: "18px",
        }}
      />
      <span className="fw-medium">Individual</span>
    </label>

    <label className="d-flex align-items-center gap-2">
      <input
        type="checkbox"
        checked={role==="agent"}
        onChange={(e)=>setRole("agent")}
        style={{
          width: "18px",
          height: "18px",
        }}
      />
      <span className="fw-medium">Agent</span>
    </label>

  </div>
</div>

                <button type='submit' disabled={registerloading} className="btn btn-dark w-100 mb-2">{registerloading ? "Processing...":"Create Account"}</button>
                <p className="text-center">
                  Already have an account?{" "}
                  <button onClick={()=>setIsLogin(true)} type="button" className="btn btn-link p-0">Log in</button>
                </p>
              </Form>
    </div>
  )
}

export default Signup