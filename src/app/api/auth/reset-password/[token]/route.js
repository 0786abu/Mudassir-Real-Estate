import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DataBase } from "@/backend/config/database";
import User from "@/backend/model/authModel";
import Agent from "@/backend/model/agentModel";

export async function POST(req,{params}) {
    try {
        await DataBase();
        if(isUser){
                    return NextResponse.json(
                        { success: false, message: "You are currently logged in, please first logout to forgot password" },
                        { status: 400}
                )
                }
        const { token } = await params;
        const {password} = await req.json();
        if(!password){
           return NextResponse.json(
                { success: false, message: "Password reuqired" },
                { status: 400}
        ) 
        }
        if(!token){
           return NextResponse.json(
                { success: false, message: "Token reuqired" },
                { status: 400}
        ) 
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decode.id);
        if(!user){
            user = await Agent.findById(decode.id)
        }
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 400}
        )};
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return NextResponse.json({
            success: true,
            message: "Password reset successfully, now login",
        },{status:200});
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message==="jwt expired" ? "TOken expire please request again for reset password link" : error.message },
            { status: 500}
        )
    }
}