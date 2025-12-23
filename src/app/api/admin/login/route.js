import { DataBase } from "@/backend/config/database";
import Admin from "@/backend/model/adminModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await DataBase();
        const {email,password} = await req.json();
        if(!email || !password){
            return NextResponse.json({
                success:false,
                message:"Both Fields Required"
            },{status:401})
        }
        const admin = await Admin.findOne({email}).select("+password");
        if(!admin){
            return NextResponse.json({
                success:false,
                message:"admin not found, please enter correct email address"
            },{status:401})
        }
        const isMatchedPassword = await bcrypt.compare(password,admin.password);
        if(!isMatchedPassword){
            return NextResponse.json({
                success:false,
                message:"invalid credential, enter correct password"
            },{status:401})
        }
        const token = jwt.sign({id:admin._id,role:admin.role}, process.env.JWT_SECRET, {expiresIn:"30d"});
        const response = NextResponse.json(
  { success: true, message: "admin login successfull", admin,token },
  { status: 200 }
);

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
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:401})
    }
}