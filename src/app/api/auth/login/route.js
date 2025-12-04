import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { isAuthenticated } from "@/backend/utils/middlewere";

export async function POST(req) {
  try {
    await DataBase();
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { success: false, message: "Please fill all the fields" },
        { status: 400 }
      );
    let user = await User.findOne({ email }).select("+password");
    let role = "individual";
    if(!user){
        user = await Agent.findOne({email}).select("+password")
        role = "agent"
    }
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const response = NextResponse.json(
  { success: true, message: `${role === "individual" ? "User" : role === "agent" ? "Agent" : "Admin"} Login Successfull`, user },
  { status: 200 }
);

// Set cookie on the **response**
response.cookies.set({
  name: "token",
  value: token,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 30 * 24 * 60 * 60,
});

return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// for get profile
export async function GET(req) {
    try {
        const user = await isAuthenticated();
        if(!user){
            return NextResponse.json({
                success:false,
                message:"unAuthorized, please login first"
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            message:"logout successfull",
            user
        },{status:200})
    } catch (error) {
       return NextResponse.json({
            success:false,
            error:error.message
        },{status:400}) 
    }
}

// for agent update your profile
export async function PUT(req) {
    try {
        await DataBase();
        const user = await isAuthenticated();
        if(!user || user.role==="individual"){
            return NextResponse.json({
                success:false,
                message:"unAuthoried request. you are not able to access this route"
            },{status:400})
        }
        const {name,bio,agencyName,city,address,gender,DOB,socialMedia,whatsappAPI,state} = await req.json();
        if(!name){
            return NextResponse.json({
                success:false,
                message:"Name is required"
            },{status:400})
        }
        const agent = await Agent.findByIdAndUpdate(user._id,{name,bio,agencyName,city,address,gender,DOB,socialMedia,whatsappAPI,state},{new:true});
            return NextResponse.json({
                success:true,
                message:"profile update successfull",
                newUser:agent
            },{status:200})
    } catch (error) {
            return NextResponse.json({
                success:false,
                message:error.message
            },{status:400})
    }
}