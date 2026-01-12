import axios from "axios";
import { toast } from "react-toastify";
import { setCreateLeadLoading, setDeleteLead, setLeadError, setLeadLoading, setLeads } from "../slice/projectLeadSlice";

export const ProjectLeadForm = (leadData)=>async(dispatch)=>{
    dispatch(setCreateLeadLoading())
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projectLead`,leadData,{
            contentType:"application/json",
            withCredentials:true
        })
        toast.success(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setLeadError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreateLeadLoading(false))
    }
}


export const ProjectLeads = ({page})=>async(dispatch)=>{
    dispatch(setLeadLoading())
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projectLead?page=${page}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setLeads({leads:data.leads,totalPages:data.totalPages,totalLeads:data.totalLeads}))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setLeadError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const DeleteProjectLead = (leadID)=>async(dispatch)=>{
    dispatch(setCreateLeadLoading())
    try {
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projectLead?leadID=${leadID}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setDeleteLead(data.lead));
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setLeadError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreateLeadLoading(false))
    }
}