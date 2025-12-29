import axios from "axios"
import { setCreateEmailLoading, setEmailError } from "../slice/emailSlice"
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