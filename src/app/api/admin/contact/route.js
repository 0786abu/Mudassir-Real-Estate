import { DataBase } from "@/backend/config/database";
import Contact from "@/backend/model/contactModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { SendemailToAdminTeamForContactForm } from "@/backend/utils/NodeMailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await DataBase();
        const {name,email,phone,message} = await req.json();
        if(!name || !email || !phone || !message){
            return NextResponse.json({
                success:false,
                message:"All fields required"
            },{status:401})
        }
        const existEmail = await Contact.findOne({email});
        if(existEmail){
            return NextResponse.json({
                success:false,
                message:"please add another email address"
            },{status:401})
        }
        await SendemailToAdminTeamForContactForm({name,email,phone});
        const contact = await Contact.create({name,email,phone,message});
        return NextResponse.json({
            success:true,
            message:"Form submit successfully",
            contact
        },{status:200});
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400});
    }
}
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
        const {searchParams} = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = 12;
        const skip = (page - 1) * limit
        const totalContacts = await Contact.countDocuments();
        const totalPages = Math.ceil(totalContacts / limit);
        const contacts = await Contact.find().skip(skip).limit(limit).sort({createdAt:-1});
        return NextResponse.json({
            success:true,
            contacts,
            totalPages,
            totalContacts
        },{status:200});
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400});
    }
}