import axios from "axios";
import { setCreatePropertyLoading, setMyProperties, setMyProperty, setMyPropertyLoading, setPagesContent, setPropertyError, setRemovePropertyImageLoading, setSingleProperty, setSinglePropertyLoading, setUpdateProeprty } from "../slice/propertySlice";
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
export const UpdateProperty = (property,setActivetab)=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.put(`${baseURL}/api/property/create-property/${property.slug}`,property,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message)
        dispatch(setUpdateProeprty(property));
        setTimeout(() => {
            setActivetab("Listing")
            window.scrollTo({top:0,behavior:"smooth"})
        }, 100);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreatePropertyLoading(false));
    }
}
export const UploadMoreImages = (images,slug,setModal)=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/property/uploadNewImages/${slug}`,images,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setMyProperty(data.property));
        toast.success(data.message);
        setTimeout(() => {
            setModal()
        }, 100);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreatePropertyLoading(false));
    }
}
export const RemovePropertyImage = ({public_id,slug,setPublicID,setCurrentImageIndex})=>async(dispatch)=>{
    dispatch(setRemovePropertyImageLoading())
    try {
        const {data} = await axios.delete(`${baseURL}/api/property/create-property/${slug}?public_id=${public_id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setMyProperty(data.data));
        setCurrentImageIndex(0)
        toast.success(data.message);
        setPublicID("");
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRemovePropertyImageLoading(false));
    }
}
export const UpdateFloorPlanImage = ({formData,slug,setFloorPlanImage})=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/property/create-property/${slug}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setMyProperty(data.data));
        toast.success(data.message);
        setFloorPlanImage(null)
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
export const SendPropertyDataToMyProperty = (slug)=>async(dispatch)=>{
    dispatch(setSinglePropertyLoading(true))
    try {
        const {data} = await axios.get(`${baseURL}/api/property/getSingleProperty/${slug}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setSingleProperty(data.property))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error)
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    }
}