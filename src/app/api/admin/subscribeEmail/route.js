import { DataBase } from "@/backend/config/database";
import Email from "@/backend/model/subscribeEmailModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await DataBase();
        const {email} = await req.json();
        if(!email){
            return NextResponse.json({
                success:false,
                message:"All fields required"
            },{status:401})
        }
        const existEmail = await Email.findOne({email});
        if(existEmail){
            return NextResponse.json({
                success:false,
                message:"email already exist, please add another email address"
            },{status:401})
        }
        await Email.create({email});
        return NextResponse.json({
            success:true,
            message:"Email submit successfully"
        },{status:200});
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400});
    }
}