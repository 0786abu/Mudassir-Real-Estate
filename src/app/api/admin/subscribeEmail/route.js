import { DataBase } from "@/backend/config/database";
import Email from "@/backend/model/subscribeEmailModel";
import { isAuthorized } from "@/backend/utils/middlewere";
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
        const limit = 50;
        const skip = (page - 1) * limit;
        const emails = await Email.find().skip(skip).limit(limit);
        const totalEmails = await Email.countDocuments();
        const totalPages = Math.ceil(totalEmails / limit);
        return NextResponse.json({
            success:true,
            emails,
            totalEmails,
            totalPages
        },{status:200});
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400});
    }
}