import { toast } from "react-toastify"
import { setContactError, setCreateContactLoading } from "../slice/contactSlice"
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