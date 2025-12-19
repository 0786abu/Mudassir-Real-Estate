import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/backend/model/authModel";
import Agent from "@/backend/model/agentModel";
import { ResetPasswordMailer } from "@/backend/utils/NodeMailer";
import { DataBase } from "@/backend/config/database";
import { isAuthenticated } from "@/backend/utils/middlewere";

export async function POST(req) {
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        if(isUser){
            return NextResponse.json(
                { success: false, message: "You are currently logged in, please first logout to forgot password" },
                { status: 400}
        )
        }
        const { email } = await req.json();
        let user = await User.findOne({ email });
        if(!user){
            user = await Agent.findOne({email});
        }
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 400}
        )};
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "10m",
        });
        const link = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`
        await ResetPasswordMailer({email,link,name:user.name})
        return NextResponse.json(
            { success: true, message: "Password reset link sent to your email" },
            { status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500}
        )
    }
}