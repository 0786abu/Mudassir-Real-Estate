import axios from "axios"
import { setCreateEmailLoading, setDeleteEmail, setEmailError, setEmailLoading, setEmails } from "../slice/emailSlice"
import { toast } from "react-toastify"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const CreateSubscribeEmail = (email,setEmail)=>async(dispatch)=>{
    dispatch(setCreateEmailLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/admin/subscribeEmail`,{email},{
            contentType:"application/json",
            withCredentials:true
        })
        setEmail("")
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setEmailError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreateEmailLoading(false))
    }
}
export const AdminFetchEmails = (page)=>async(dispatch)=>{
    dispatch(setEmailLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/subscribeEmail?page=${page}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setEmails({emails:data.emails,totalEmails:data.totalEmails,totalPages:data.totalPages}))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setEmailError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const AdminDeleteEmail = (id)=>async(dispatch)=>{
    dispatch(setCreateEmailLoading())
    try {
        const {data} = await axios.delete(`${baseURL}/api/admin/subscribeEmail/${id}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setDeleteEmail(id))
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setEmailError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreateEmailLoading(false))
    }
}