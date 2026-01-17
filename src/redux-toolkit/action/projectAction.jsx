import axios from "axios";
import { setAddFloorPlans, setAddPaymentImages, setChangeDevelopedBy, setChangeMarketingBy, setCreateProjectLoading, setDeleteFloorPlan, setDeletePaymentPlan, setDeletePaymentPlanLoading, setDelFloorPlanLoading, setDevPlatLoading, setProject, setProjectError, setProjectFeaturedToggle, setProjectLoading, setProjects, setProjectSponsoredToggle, setToggleLoading, setUpdateItemsLoading, setUpdateProjectDetails, setUpdateProjectItems } from "../slice/projectSlice";
import { toast } from "react-toastify";
import { BsFillDoorClosedFill } from "react-icons/bs";

export const CreateProjectAdmin = ({formData})=>async(dispatch)=>{
    dispatch(setCreateProjectLoading());
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject`,formData,{
            headers:{
                contentType:"multipart/form-data"
            },
            withCredentials:true
        });
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setCreateProjectLoading(false));
    }
}
export const AdminFetchProjects = (page,featured,sponsored,type)=>async(dispatch)=>{
    dispatch(setProjectLoading());
    try {
        const params = new URLSearchParams();
        if(page) params.append("page",page);
        if(featured) params.append("featured",featured);
        if(sponsored) params.append("sponsored",sponsored);
        if(type) params.append("type",type);
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject?${params.toString()}`,{
            headers:{
                contentType:"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setProjects({projects:data.projects,totalProjects:data.totalProjects,totalPages:data.totalPages}))
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    }
}
export const AdminFetchProject = (id)=>async(dispatch)=>{
    dispatch(setProjectLoading());
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${id}`,{
            headers:{
                contentType:"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setProject(data.project))
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    }
}

export const UpdateProjectItems = (items,slug,open)=>async(dispatch)=>{
    dispatch(setUpdateItemsLoading());
    try {
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${slug}`,{items},{
            headers:{
                contentType:"application/json"
            },
            withCredentials:true
        });
        dispatch(setUpdateProjectItems(data.project))
        open(false)
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setUpdateItemsLoading(false));
    }
}
export const DeleteFloorPlan = (slug,setActive,floor,floors)=>async(dispatch)=>{
    dispatch(setDelFloorPlanLoading());
    try {
        const encoded = encodeURIComponent(floor)
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${slug}/floorplan/${encoded}`,{
            headers:{
                contentType:"application/json"
            },
            withCredentials:true
        });
        dispatch(setDeleteFloorPlan(data.projectt))
        setActive(floors[0])
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setDelFloorPlanLoading(false));
    }
}
export const DeletePaymentPlan = (slug,paymentID)=>async(dispatch)=>{
    dispatch(setDeletePaymentPlanLoading());
    try {
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/addpaymentplans/${slug}?paymentID=${paymentID}`,{
            headers:{
                contentType:"application/json"
            },
            withCredentials:true
        });
        dispatch(setDeletePaymentPlan(data.projectt))
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setDeletePaymentPlanLoading(false));
    }
}
export const AddMoreFloorPlansImages = (slug,formData,toggle)=>async(dispatch)=>{
    dispatch(setUpdateItemsLoading());
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${slug}`,formData,{
            headers:{
                contentType:"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setAddFloorPlans(data.project))
        toggle()
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setUpdateItemsLoading(false));
    }
}
export const AdminProjectFeaturedToggle = (slug)=>async(dispatch)=>{
    dispatch(setToggleLoading());
    try {
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/addpaymentplans/${slug}`,{
            headers:{
                contentType:"application/json"
            },
            withCredentials:true
        });
        dispatch(setProjectFeaturedToggle());
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setToggleLoading(false));
    }
}
export const AdminProjectSponsoredToggle = (slug)=>async(dispatch)=>{
    dispatch(setToggleLoading());
    try {
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/sponsoredToggle/${slug}`,{
            headers:{
                contentType:"application/json"
            },
            withCredentials:true
        });
        dispatch(setProjectSponsoredToggle());
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setToggleLoading(false));
    }
}
export const AddMorePaymentlansImages = (slug,formData,toggle)=>async(dispatch)=>{
    dispatch(setUpdateItemsLoading());
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/addpaymentplans/${slug}`,formData,{
            headers:{
                contentType:"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setAddPaymentImages(data.project))
        toggle()
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setUpdateItemsLoading(false));
    }
}
export const AdminChangeDevelopedBy = (slug,formData,toggle)=>async(dispatch)=>{
    dispatch(setDevPlatLoading());
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/devPlat/${slug}`,formData,{
            headers:{
                contentType:"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setChangeDevelopedBy(data.project))
        toast.success(data.message);
        toggle();
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setDevPlatLoading(false));
    }
}
export const AdminUpdateProjectDetails = (slug,formData)=>async(dispatch)=>{
    dispatch(setCreateProjectLoading());
    try {
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${slug}/edit`,formData,{
            headers:{
                contentType:"application/json"
            },
            withCredentials:true
        });
        dispatch(setUpdateProjectDetails(data.project))
        toast.success(data.message);
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setCreateProjectLoading(false));
    }
}
export const AdminChangeMarketingBy = (slug,formData,toggle)=>async(dispatch)=>{
    dispatch(setDevPlatLoading());
    try {
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/devPlat/${slug}`,formData,{
            headers:{
                contentType:"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setChangeMarketingBy(data.project))
        toast.success(data.message);
        toggle();
    } catch (error) {
        dispatch(setProjectError(error?.response?.data?.message || error?.response?.data?.error));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    } finally {
        dispatch(setDevPlatLoading(false));
    }
}