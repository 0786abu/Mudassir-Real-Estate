import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { sendSMS } from "@/backend/utils/PhoneOTPSMS";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await DataBase();
        const { phone } = await req.json();
        
        let user = await User.findOne({ phone });
        if (!user) {
            user = await Agent.findOne({ phone });
        }

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 400 }
            );
        }
        if(user.isPhoneVerified){
            return NextResponse.json(
                { success: false, message: "phone numbder already verified" },
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
        const message = `Hello ${user.name} your otp is ${otpCode} this code is valid for 5 minutes`
        await sendSMS({phone,message});

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
