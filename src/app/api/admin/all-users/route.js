import { DataBase } from "@/backend/config/database";
import User from "@/backend/model/authModel";
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
            },{sttaus:401})
        }
        const {searchParams} = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1
        const limit = 12;
        const skip = (page - 1) * limit
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);
        const users = await User.find().skip(skip).limit(limit);
        return NextResponse.json({
            success:true,
            users,
            totalPages,
            totalUsers
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}