import axios from "axios";
import { setCreateProjectLoading, setProjectError } from "../slice/projectSlice";
import { toast } from "react-toastify";

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