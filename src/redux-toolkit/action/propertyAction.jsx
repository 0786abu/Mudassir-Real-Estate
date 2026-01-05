import axios from "axios";
import { setAdminProeprties, setAdminPropertiesLoading, setCreatePropertyLoading, setFeaturedProperties, setFeaturedPropertyLoading, setLatestproeprtyloading, setLatestsproperties, setMyAvailableProeprtiesChartData, setMyChartData, setMyProperties, setMyProperty, setMyPropertyLoading, setMyTypeChartData, setPagesContent, setPropertyError, setRemovePropertyImageLoading, setSingleProperty, setSinglePropertyLoading, setUpdateProeprty, setViewsChartDataLoading } from "../slice/propertySlice";
import { toast } from "react-toastify";
import { setLatestProeprty } from "../slice/agentSlice";
import { setSingleProperty as setsingleproperty } from "../slice/adminSlice";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const CreateProperty = (property)=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property`,property,{
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
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property/${property.slug}`,property,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message)
        dispatch(setUpdateProeprty(property));
        setTimeout(() => {
            if(setActivetab){
                setActivetab("Listing")
            }
            window.scrollTo({top:0,behavior:"smooth"})
        }, 100);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreatePropertyLoading(false));
    }
}
export const ViewsChartData = ()=>async(dispatch)=>{
    dispatch(setViewsChartDataLoading(true))
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/viewsChartData`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setMyChartData({data:data.totalViews}));
        dispatch(setMyTypeChartData(data.typedData));
        dispatch(setMyAvailableProeprtiesChartData(data.availablePropertiesPercent));
        dispatch(setLatestProeprty(data.properties));
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setViewsChartDataLoading(false));
    }
}
export const UploadMoreImages = (images,slug,setModal,from)=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/uploadNewImages/${slug}`,images,{
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
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property/${slug}?public_id=${public_id}`,{
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
export const UpdateFloorPlanImage = ({formData,slug,setFloorPlanImage,from})=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading())
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property/${slug}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        if(from==="admin"){
            dispatch(setsingleproperty(data.data))
        }else{
            dispatch(setMyProperty(data.data));
        }
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
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/myProperties?${params.toString()}`,{
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
export const AdminProperties = (currentPage)=>async(dispatch)=>{
    dispatch(setAdminPropertiesLoading(true))
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/adminProperties?page=${currentPage}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setAdminProeprties({properties:data.properties,totalProperties:data.totalProperties,totalPages:data.totalPages}))
        // dispatch(setPagesContent({totalPages:data.totalPages,currentPage:data.currentPage}));
    } catch (error) {
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const LatestProperties = ()=>async(dispatch)=>{
    dispatch(setLatestproeprtyloading(true))
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setLatestsproperties(data.properties))
    } catch (error) {
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    }finally {
        dispatch(setLatestproeprtyloading(false))
    }
}
export const FeaturedProperties = ()=>async(dispatch)=>{
    dispatch(setFeaturedPropertyLoading(true))
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/FeaturedProperties`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setFeaturedProperties(data.featuredProperties))
    } catch (error) {
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    }finally {
        dispatch(setFeaturedPropertyLoading(false))
    }
}
export const SendPropertyDataToMyProperty = (slug)=>async(dispatch)=>{
    dispatch(setSinglePropertyLoading(true))
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/getSingleProperty/${slug}`,{
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

export const DeleteProperty = ({id,setDeleteModal,setActivetab})=>async(dispatch)=>{
    dispatch(setCreatePropertyLoading(true))
    try {
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/deleteProperty/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message)
        setDeleteModal(false);
        dispatch(setPagesContent({totalPages:null,currentPage:1}))
        setActivetab("Dashboard")
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPropertyError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreatePropertyLoading(false));
    }
}