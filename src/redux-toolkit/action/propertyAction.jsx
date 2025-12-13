import axios from "axios";
import { setCreatePropertyLoading, setMyProperties, setMyPropertyLoading, setPagesContent, setPropertyError } from "../slice/propertySlice";
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
export const MyProperties = ({category,location,type,city,currentPage})=>async(dispatch)=>{
    dispatch(setMyPropertyLoading(true))
    try {
        const params = new URLSearchParams();
        if(category) params.append("category", category);
        if(type) params.append("type", type);
        if(city) params.append("city", city);
        if(location) params.append("location", location);
        if(currentPage) params.append("page", currentPage);
        const {data} = await axios.get(`${baseURL}/api/property/myProperties?${params.toString()}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setMyProperties(data.properties))
        dispatch(setPagesContent({totalPages:data.totalPages,currentPage:data.currentPage}));
    } catch (error) {
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    }finally {
        dispatch(setMyPropertyLoading(false))
    }
}