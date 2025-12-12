import { toast } from "react-toastify";
import { setAddToFavLoading, setAddToFavourites, setFavError, setFavLoading, setFavourites, setRemoveFromFavourites } from "../slice/favouritesSlice";
import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const AddToFavourites = (property)=>async(dispatch)=>{
    dispatch(setAddToFavLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/favourite`,{propertyID:property?.propertyID?._id},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setAddToFavourites(property));
        toast.success(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setFavError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setAddToFavLoading(false));
    }
}
export const RemoveFavouriteProperty = ({id})=>async(dispatch)=>{
    dispatch(setAddToFavLoading())
    try {
        const {data} = await axios.delete(`${baseURL}/api/favourite/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setRemoveFromFavourites(id));
        window.scrollTo({
  top: 0,
  behavior: "smooth"
});
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setFavError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setAddToFavLoading(false));
    }
}
export const GetFavouritesData = ()=>async(dispatch)=>{
    dispatch(setFavLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/favourite`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setFavourites(data.data));
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setFavError(error?.response?.data?.message || error?.response?.data?.error));
    }
}