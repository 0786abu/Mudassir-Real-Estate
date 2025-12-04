import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { sendSMS } from "@/backend/utils/PhoneOTPSMS";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await DataBase();
        const isuser = await isAuthenticated();
        if(!isuser){
            return NextResponse.json({
                success:false,
                message:"You are not authorize to access this route, please login first"
            })
        }
        const {phone} = await req.json();
        if(!phone){
            return NextResponse.json({
                success:false,
                message:"phone number is required"
            },{status:400})
        }
        let isExistingPhoneFromUser = await User.findOne({phone});
        if(isExistingPhoneFromUser){
            return NextResponse.json({
                success:false,
                message:"phone number already exist"
            },{status:200})
        }
        let isExistingPhoneFromAgent = await Agent.findOne({phone});
        if(isExistingPhoneFromAgent){
            return NextResponse.json({
                success:false,
                message:"phone number already exist"
            },{status:200})
        }
        let user = await User.findById(isuser._id);
        if(!user){
            user = await Agent.findById(isuser._id);
        }
        if(user.isPhoneVerified){
            return NextResponse.json({
                success:false,
                message:"phone number already verified"
            },{status:200})
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        const message = `Hello ${user.name} your otp is ${otpCode} this code is valid for 5 minutes`
        const smsreq = await sendSMS({phone,message})
       if(smsreq){
    user.otpCode = otpCode
    user.otpExpiry = otpExpiry
    user.phone = phone
    await user.save();
}else{
    return NextResponse.json({
        success:false,
        message:"Failed Send otp",
        error: smsreq
    },{status:400})
}
        return NextResponse.json({
            success:true,
            message:"Otp send to your phone, please check sms field"
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400}) 
    }
}