import { ProjectLeadForm } from '@/redux-toolkit/action/projectLeadAction'
import { Phone, Send } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Form = ({projectOwnerPhone,projectID}) => {
    const [leadData, setLeadData] = useState({
        name:"",
        email:"",
        phone:"",
        projectID:projectID
    })
    const {createprojectleadloading} = useSelector((state)=>state.ProjectLead);
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(ProjectLeadForm(leadData))
    }
  return (
    <div className="contact-card">
          {/* Call Now */}
            <Link href={`tel:${projectOwnerPhone}`} style={{cursor:"pointer"}}>
          <div className="call-now">
            <Phone size={18} />
            <span>Call Now</span>
          </div>
            </Link>
    
          <div className="divider">
            <span>or</span>
          </div>
    
          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Your Name <span>*</span>
              </label>
              <input
                type="text"
                value={leadData.name}
                onChange={(e)=>setLeadData({...leadData, name:e.target.value})}
                placeholder="Enter your name"
              />
            </div>
    
            <div className="form-group">
              <label>
                Phone Number <span>*</span>
              </label>
              <input
                type="tel"
                value={leadData.phone}
                onChange={(e)=>setLeadData({...leadData, phone:+e.target.value})}
                placeholder="03XXXXXXXXX"
              />
            </div>
    
            <div className="form-group">
              <label>Email Address (Optional)</label>
              <input
                type="email"
                value={leadData.email}
                onChange={(e)=>setLeadData({...leadData, email:e.target.value})}
                placeholder="Your best email address?"
              />
            </div>
    
            <button disabled={createprojectleadloading} type="submit" className="submit-btn">
              <Send size={18} />
              {createprojectleadloading ? "Processing..." : "Request Call"}
            </button>
    
            <p className="terms">
              By submitting this form, you agree to{" "}
              <Link target='_blank' href="/terms-&-conditions">Terms of Use</Link>.
            </p>
          </form>
        </div>
  )
}

export default Form