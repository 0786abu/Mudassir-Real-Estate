import axios from "axios"
import { setAboutAgent, setAboutUser, setAdminError, setAgentLoading, setAllAgents, setAllProperties, setAllusers, setApprovedLoading, setFeaturedLoading, setPaymentAction, setPaymentActionLoading, setPaymentLoading, setPayments, setPropertyLoading, setSingleProperty, setToggleApproved, setToggleFeatured, setUserLoading } from "../slice/adminSlice"
import { toast } from "react-toastify"
import { setCreatePropertyLoading, setPropertyError, setRemovePropertyImageLoading } from "../slice/propertySlice"
import { setAuthError, setRegisterloading } from "../slice/authSlice"


const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const AdminAllProperties = (filters)=>async(dispatch)=>{
    dispatch(setPropertyLoading())
    try {
        const {page,beds,baths,rooms,type,category,areaSize,minPrice,maxPrice,minsquareSize,maxsquareSize,city,location,isPaid,isFree,isFeatured,isApproved,furnished} = filters;
        const queryParams = new URLSearchParams();
        if(page) queryParams.append("page", page);
        if(beds) queryParams.append("beds", beds);
        if(baths) queryParams.append("baths", baths);
        if(rooms) queryParams.append("rooms", rooms);
        if(type) queryParams.append("type", type);
        if(category) queryParams.append("category", category);
        if(areaSize) queryParams.append("areaSize", areaSize);
        if(minPrice) queryParams.append("minPrice", minPrice);
        if(maxPrice) queryParams.append("maxPrice", maxPrice);
        if(minsquareSize) queryParams.append("minsquareSize", minsquareSize);
        if(maxsquareSize) queryParams.append("maxsquareSize", maxsquareSize);
        if(city) queryParams.append("city", city);
        if(location) queryParams.append("location", location);
        if(isPaid) queryParams.append("isPaid", isPaid);
        if(isFree) queryParams.append("isFree", isFree);
        if(isFeatured) queryParams.append("isFeatured", isFeatured);
        if(isApproved) queryParams.append("isApproved", isApproved);
        if(furnished) queryParams.append("furnished", furnished);
        const {data} = await axios.get(`${baseURL}/api/admin/allProperties?${queryParams.toString()}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setAllProperties({properties:data.properties,totalProperties:data.totalProperties,totalPages:data.totalPages}))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    }
}

export const AdminFetchSingleProeprty = (slug)=>async(dispatch)=>{
    dispatch(setPropertyLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/allProperties/${slug}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setSingleProperty(data.data))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const FeaturedToggle = (slug)=>async(dispatch)=>{
    dispatch(setFeaturedLoading())
    try {
        const {data} = await axios.put(`${baseURL}/api/admin/allProperties/${slug}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setToggleFeatured(data.data))
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setFeaturedLoading(false))
    }
}
export const UploadMoreImages = (images,slug,setModal)=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/uploadNewImages/${slug}`,images,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
            dispatch(setSingleProperty(data.property));
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
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property/${slug}?public_id=${public_id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setSingleProperty(data.data));
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
export const ApprovedToggle = (slug,status)=>async(dispatch)=>{
    dispatch(setApprovedLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/admin/allProperties/${slug}`,{status},{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setToggleApproved(data.data))
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setApprovedLoading(false))
    }
}

export const ApprovedPaymentToggle = (id,paymentData,setActionModal)=>async(dispatch)=>{
    dispatch(setPaymentActionLoading())
    try {
        const {data} = await axios.put(`${baseURL}/api/payment/updatePayment/${id}`,paymentData,{
            contentType:"application/json",
            withCredentials:true
        })
        setActionModal(false);
        dispatch(setPaymentAction(data.payment))
        toast.success(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setPaymentActionLoading(false))
    }
}

export const AdminFetchPayments = ({selectedStatus,selectedPaymentMethod})=>async(dispatch)=>{
    dispatch(setPaymentLoading())
    try {
        const searchparams = new URLSearchParams();
        if(selectedStatus) searchparams.append("status", selectedStatus)
        if(selectedPaymentMethod) searchparams.append("paymentMethod", selectedPaymentMethod)
        const {data} = await axios.get(`${baseURL}/api/admin/payments?${searchparams.toString()}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setPayments(data.payments))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const AdminFetchUsers = ()=>async(dispatch)=>{
    dispatch(setUserLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/all-users`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setAllusers(data.users))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const AdminFetchAgents = ()=>async(dispatch)=>{
    dispatch(setAgentLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/all-agents`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setAllAgents(data.agents))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const AdminFetchAllAboutUser = (id)=>async(dispatch)=>{
    dispatch(setUserLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/all-users/${id}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setAboutUser({user:data.user,recentProperties:data.recentProperties,recentPayments:data.recentPayments}))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const AdminFetchAllAboutAgent = (id)=>async(dispatch)=>{
    dispatch(setAgentLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/all-agents/${id}`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setAboutAgent({agent:data.agent,recentProperties:data.recentProperties,recentPayments:data.recentPayments,viewsData:data.data,typedData:data.typeData,availablePropertiesPercent:data.availablePropertiesPercent}))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const AdminAddUserAgent = (formData,resetAll)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/admin/all-agents`,formData,{
            contentType:"multipart/form-data",
            withCredentials:true
        })
        toast.success(data.message);
        resetAll()
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAdminError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false))
    }
}
export const VerifyEmail = (email,router)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/verify-email`,{email},{
            contentType:"application/json",
            withCredentials:true
        })
        router.push("/otp-verify");
        localStorage.setItem("real_estate_project_user_email", JSON.stringify(data.user.email));
        toast.success(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false))
    }
}