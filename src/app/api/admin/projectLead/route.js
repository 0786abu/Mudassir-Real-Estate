import { DataBase } from "@/backend/config/database";
import ProjectLead from "@/backend/model/projectContacts";
import Project from "@/backend/model/projectSchema";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await DataBase();
        const {name,email,phone,projectID} = await req.json();
        if(!name || !phone){
            return NextResponse.json({
                success:false,
                message:"Name and Phone required"
            },{status:401})
        }
        if(!projectID){
            return NextResponse.json({
                success:false,
                message:"ProjectID required"
            },{status:401})
        }
        const lead = await ProjectLead.create({name,email,phone,project:projectID});
        return NextResponse.json({
            success:true,
            message:"Form submit successfull",
            lead
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}
export async function GET(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized"
            },{status:401})
        }
        const {searchParams} = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = 20;
        const skip = (page - 1) * limit
        const totalLeads = await ProjectLead.countDocuments();
        const totalPages = Math.ceil(totalLeads / limit)
        const leads = await ProjectLead.find().skip(skip).limit(limit).populate("project","projectLogo projectTitle type slug");
        return NextResponse.json({
            success:true,
            leads,
            totalLeads,
            totalPages
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}
export async function DELETE(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized"
            },{status:401})
        }
        const {searchParams} = new URL(req.url);
        const leadID = searchParams.get("leadID");
        const lead = await ProjectLead.findByIdAndDelete(leadID);
        if(!lead){
            return NextResponse.json({
                success:false,
                message:"Lead not found"
            },{status:401})
        }
        return NextResponse.json({
            success:true,
            message:"Lead delete successfull",
            lead
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}