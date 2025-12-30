import Notification from "@/backend/model/notificationModel"

export const NotificationCreate = async({type,message,link,createdBy})=>{
    try {
        await Notification.create({type,message,link});
        return {status:200}
    } catch (error) {
        return {status:400,error:error.message}
    }
}