import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { SendEmail } from "@/backend/utils/NodeMailer";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await DataBase();
        const {email} = await req.json();
        if(!email){
            return NextResponse.json({
                success:false,
                message:"please refresh the page and try again"
            },{status:401})
        }
        let user;
        user = await User.findOne({email});
        if(!user){
            user = await Agent.findOne({email});
        }
        
                if(!user){
                    return NextResponse.json({
                        success:false,
                        message:"user not found try again later"
                    },{status:400});
                }
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await SendEmail({email,otpCode,name:user.name});
        user.otpCode = otpCode;
        user.otpExpiry = otpExpiry;
        await user.save();
        return NextResponse.json({
            success:true,
            message:`Otp send to your email, otp expire after 5 minutes`,
            user
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            error:error.message
        },{status:400})
    }
}