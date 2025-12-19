import axios from "axios";
import { setLeadError, setLeadLoading, setMyInquiries, setMyLeads, setSendInquiryLoading } from "../slice/leadSlice";
import { toast } from "react-toastify";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const SendInquiry = (leadData,setLeadData)=>async(dispatch)=>{
    dispatch(setSendInquiryLoading())
    try {
        const {data} = await axios.post(`http://localhost:3000/api/leads`,leadData,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message);
        setLeadData({
            name:"",
            email:"",
            phone:null,
            message:"",
            property
          });
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setLeadError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setSendInquiryLoading(false));
    }
}

export const MyLLeads = (type)=>async(dispatch)=>{
    dispatch(setLeadLoading(true))
    try {
        const {data} = await axios.get(`http://localhost:3000/api/leads?type=${type}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setMyLeads(data.leads))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setLeadError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setLeadLoading(false))
    }
}
export const MyInquiriess = (type)=>async(dispatch)=>{
    dispatch(setLeadLoading(true))
    try {
        const {data} = await axios.get(`http://localhost:3000/api/leads?type=${type}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setMyInquiries(data.leads))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setLeadError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setLeadLoading(false))
    }
}