import { DataBase } from "@/backend/config/database";
import Contact from "@/backend/model/contactModel";
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