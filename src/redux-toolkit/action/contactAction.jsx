import { toast } from "react-toastify"
import { setContactError, setContactLoading, setContacts, setCreateContactLoading, setDeleteContact } from "../slice/contactSlice"
import axios from "axios"


const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const CreateContact = (formData,setContactData)=>async(dispatch)=>{
    dispatch(setCreateContactLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/admin/contact`,formData,{
            contentType:"application/json",
            withCredentials:true
        })
        setContactData({
            name:"",
            email:"",
            phone:"",
            message:""
        })
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setContactError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreateContactLoading(false))
    }
}
export const AdminFetchContacts = (page)=>async(dispatch)=>{
    dispatch(setContactLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/contact?page=${page}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setContacts({contacts:data.contacts,totalPages:data.totalPages,totalContacts:data.totalContacts}))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setContactError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const AdminDeleteContact = (id)=>async(dispatch)=>{
    dispatch(setCreateContactLoading())
    try {
        const {data} = await axios.delete(`${baseURL}/api/admin/contact/${id}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setDeleteContact(data.contact))
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setContactError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreateContactLoading(false))
    }
}