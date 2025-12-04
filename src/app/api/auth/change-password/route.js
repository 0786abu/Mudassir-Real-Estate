import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { isAuthenticated } from "@/backend/utils/middlewere";

export async function POST(req) {
    try {
        await DataBase();
        const isUser =  await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                success:false,
                message:"you are not authorize to access this route"
            },{status:400})
        }
        const {password,oldPassword,confirmPassword} = await req.json();
        if(!password || !oldPassword || !confirmPassword){
            return NextResponse.json({
                success:false,
                message:"All fields are require"
            },{status:400})
        }
        let user = await User.findById(isUser._id).select("+password");
        if(!user){
            user = await Agent.findById(isUser._id).select("+password")
        }
         const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid old password, please enter correct password"
            }, { status: 400 });
        }
        if(password !== confirmPassword){
            return NextResponse.json({
                success:false,
                message:"new password and confirm password does not match"
            },{status:400})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return NextResponse.json({
                success:true,
                message:"password change successfull"
            },{status:200})
    } catch (error) {
        return NextResponse.json({
                success:false,
                message:error.message
            },{status:400})
    }
}