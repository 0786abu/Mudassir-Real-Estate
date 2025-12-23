import axios from "axios"
import { setAdminError, setAllProperties, setPropertyLoading } from "../slice/adminSlice"
import { toast } from "react-toastify"


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