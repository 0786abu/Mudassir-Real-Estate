import { DataBase } from "@/backend/config/database";
import Email from "@/backend/model/subscribeEmailModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

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
        const email = await Email.findById(_id);
        if(!email){
            return NextResponse.json({
                success:false,
                message:"email not found"
            },{status:401})
        }
        await Email.findByIdAndDelete(_id);
        return NextResponse.json({
            success:true,
            message:"email delete successfull"
        },{status:200})
    } catch (error) {
    return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}