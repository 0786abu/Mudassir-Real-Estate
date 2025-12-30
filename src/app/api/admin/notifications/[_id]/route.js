import { DataBase } from "@/backend/config/database";
import Notification from "@/backend/model/notificationModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function PUT(req,{params}) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        const {_id} = await params;
        const notification = await Notification.findById(_id);
        if(!notification){
            return NextResponse.json({
                success:false,
                message:"Notification not found"
            },{status:401})
        }
        await Notification.updateOne({_id,isRead:false},{$set:{isRead:true}});
        return NextResponse.json({
            success:true
        },{status:200})
    } catch (error) {
       return NextResponse.json({
            success:false,
            message:error.message
        },{status:401}) 
    }
}
export async function DELETE(req,{params}) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        const {_id} = await params;
        const notification = await Notification.findByIdAndDelete(_id);
        if(!notification){
            return NextResponse.json({
                success:false,
                message:"Notification not found"
            },{status:401})
        }
        return NextResponse.json({
            success:true,
            message:"notification delete successfull"
        },{status:200})
    } catch (error) {
       return NextResponse.json({
            success:false,
            message:error.message
        },{status:401}) 
    }
}