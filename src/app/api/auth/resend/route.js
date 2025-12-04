import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { SendEmail } from "@/backend/utils/NodeMailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await DataBase();
        const { email } = await req.json();
        
        let user = await User.findOne({ email });
        if (!user) {
            user = await Agent.findOne({ email });
        }

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 400 }
            );
        }

        // 🔍 CHECK IF OTP STILL VALID
        if (user.otpExpiry && user.otpExpiry > new Date()) {
            return NextResponse.json({
                success: false,
                message: "Your current OTP is still valid. Please wait until it expires."
            }, { status: 400 });
        }

        // 🔄 Generate NEW OTP only if previous expired
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpired = new Date(Date.now() + 5 * 60 * 1000); // ⏱ 5 minutes

        user.otpCode = otpCode;
        user.otpExpiry = otpExpired;
        await user.save();

        const name = user.name;
        await SendEmail({ email, otpCode, name });

        return NextResponse.json({
            success: true,
            message: "OTP resent successfully, please check your email."
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}

export async function PUT(req) {
    try {
        const isUser = await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                success:false,
                message:"unAuthorized, please logiin first"
            },{status:400})
        }
        const {socialMedia} = await req.json();
        let user = null;
        if(isUser.role==="agent"){
            user = await Agent.findByIdAndUpdate(isUser?._id, {socialMedia}, {new:true})
        }else{
            user = await User.findByIdAndUpdate(isUser?._id, {socialMedia}, {new:true})
        }
        return NextResponse.json({
            success:true,
            message:"Social Network update successfull",
            user
        },{status:200})
    } catch (error) {
        return NextResponse.json({
                success:false,
                message:error.message
            },{status:400})
    }
}