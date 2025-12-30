import axios from "axios"
import { setMarkAllAsRead, setMarkedLoading, setNotificationError, setNotificationLoading, setNotifications } from "../slice/notificationsSlice"
import { toast } from "react-toastify"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const AdminFetchNotifications = ()=>async(dispatch)=>{
    dispatch(setNotificationLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/admin/notifications`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setNotifications({notifications:data.notifications}))
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setNotificationError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const MarkedAsRead = ()=>async(dispatch)=>{
    dispatch(setMarkedLoading())
    try {
        const {data} = await axios.put(`${baseURL}/api/admin/notifications`,{
            contentType:"application/json",
            withCredentials:true
        })
        dispatch(setMarkAllAsRead());
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setNotificationError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setMarkedLoading(false))
    }
}