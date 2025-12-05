import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { SendEmail } from "@/backend/utils/NodeMailer";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { isAuthenticated } from "@/backend/utils/middlewere";

export async function POST(req){
    try {
        await DataBase();
        const {name,email,password,role} = await req.json();
        if(!name || !email || !password){
            return NextResponse.json({
                success:false,
                message:"All fields are require"
            },{status:400});
        }
        if(!role){
            return NextResponse.json({
                success:false,
                message:"role is required"
            },{status:400});
        }
        const emailExistsInUser = await User.findOne({email});
        const emailExistsInAgent = await Agent.findOne({email});

        if(emailExistsInUser || emailExistsInAgent){
            return NextResponse.json({
                success:false,
                message:"Email already exists, please use another email"
            },{status:400});
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = null;
        if(role==="individual"){
        user = await User.create({name,email,password:hashedPassword,role,otpCode,otpExpiry});
        }else{
            user = await Agent.create({name,email,password:hashedPassword,role,otpCode,otpExpiry})
        }
        await SendEmail({email,otpCode,name});
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

// for logout
export async function GET(){
    try {
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: "/",
            maxAge: 0
        });
        return NextResponse.json({
            message: "Logout successful",
            success: true,
        },{status:200});
    } catch (error) {
        return NextResponse.json({success:false,message:error.message},{status:400})
    }
}

// for user update your profile
export async function PUT(req) {
    try {
        await DataBase();
        const user = await isAuthenticated();
        if(!user || user.role==="agent"){
            return NextResponse.json({
                success:false,
                message:"unAuthoried request. you are not able to access this route"
            },{status:400})
        }
        const {name,bio,city,address,gender,DOB,state} = await req.json();
        if(!name){
            return NextResponse.json({
                success:false,
                message:"Name is required"
            },{status:400})
        }
        const newUser = await User.findByIdAndUpdate(user._id,{name,bio,city,address,gender,DOB,state},{new:true});
            return NextResponse.json({
                success:true,
                message:"profile update successfull",
                newUser
            },{status:200})
    } catch (error) {
            return NextResponse.json({
                success:false,
                message:error.message
            },{status:400})
    }
}