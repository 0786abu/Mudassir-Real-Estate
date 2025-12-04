import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DataBase } from "@/backend/config/database";
import User from "@/backend/model/authModel";
import Agent from "@/backend/model/agentModel";

export async function POST(req,{params}) {
    try {
        await DataBase();
        const { token } = await params;
        const {password} = await req.json();
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
            message: "Password reset successfully",
        },{status:200});
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500}
        )
    }
}