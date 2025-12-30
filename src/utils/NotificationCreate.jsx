import Notification from "@/backend/model/notificationModel"
export const NotificationCreate = async({type,message,link,createdBy,createdByModel})=>{
    try {
        await Notification.create({type,message,link,createdBy,createdByModel});
        return {status:200}
    } catch (error) {
        return {status:400,error:error.message}
    }
}