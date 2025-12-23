import { DataBase } from "@/backend/config/database";
import Admin from "@/backend/model/adminModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { isAuthorized } from "@/backend/utils/middlewere";

export async function POST(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are unAuthorized to access this route"
            },{status:401})
        }
        const {name,email,password} = await req.json();
        if(!name || !email || !password){
            return NextResponse.json({
                success:false,
                message:"All Fields Required"
            },{status:401})
        }
        let role = "admin"
        const existAdmin = await Admin.findOne({email});
        if(existAdmin){
            return NextResponse.json({
                success:false,
                message:"email already exist, try with another email"
            },{status:401})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const admin = await Admin.create({name,email,password:hashedPassword,role})
        return NextResponse.json({
                success:true,
                message:"admin create successfull",
                admin
            },{status:200})
    } catch (error) {
        return NextResponse.json({
                success:false,
                message:error.message
            },{status:401})
    }
}


// for get admin profile
export async function GET(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        const admin = await Admin.findById(isAdmin._id);
        if(!admin){
            return NextResponse.json({
                success:false,
                message:"Admin Not Found"
            },{status:401})
        }
        if(admin.role !=="admin"){
            return NextResponse.json({
                success:false,
                message:"your are not admin"
            },{status:401})
        }
        return NextResponse.json({
            success:true,
            admin
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}


// for update admin profile

export async function PUT(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        const admin = await Admin.findById(isAdmin._id);
        if(!admin){
            return NextResponse.json({
                success:false,
                message:"Admin Not Found"
            },{status:401})
        }
        if(admin.role !=="admin"){
            return NextResponse.json({
                success:false,
                message:"your are not admin"
            },{status:401})
        }
        const {name,gender,bio,city,address,state,phone,DOB} = await req.json();
        const updatedAdmin = await Admin.findByIdAndUpdate(admin._id,{name,gender,bio,city,address,state,phone,DOB},{new:true})
        return NextResponse.json({
            success:true,
            updatedAdmin
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}