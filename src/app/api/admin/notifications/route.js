import { DataBase } from "@/backend/config/database";
import Notification from "@/backend/model/notificationModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        const {searchParams} = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = 40;
        const skip = (page - 1) * limit;
        const notifications = await Notification.find().skip(skip).limit(limit).sort({createdAt:-1});
        const totalNotifications = await Notification.countDocuments();
        const totalPages = Math.ceil(totalNotifications / limit);
        return NextResponse.json({
            success:true,
            notifications,
            totalPages,
            totalNotifications
        },{status:200})
    } catch (error) {
       return NextResponse.json({
            success:false,
            message:error.message
        },{status:401}) 
    }
}


export async function PUT(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        await Notification.updateMany({isRead:false},{$set:{isRead:true}});
        return NextResponse.json({
            success:true,
            message:"Mark as read applied successfully"
        },{status:200})
    } catch (error) {
       return NextResponse.json({
            success:false,
            message:error.message
        },{status:400}) 
    }
}