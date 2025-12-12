import axios from "axios";
import { setCreatePropertyLoading, setPropertyError } from "../slice/propertySlice";
import { toast } from "react-toastify";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const CreateProperty = (property)=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/property/create-property`,property,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        toast.success(data.message)
        // router.push("/otp-verify");
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreatePropertyLoading(false));
    }
}