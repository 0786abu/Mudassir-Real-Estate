import { DataBase } from "@/backend/config/database";
import Lead from "@/backend/model/leadModel";
import Property from "@/backend/model/propertyModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        const {name,email,phone,message,requestedTo, requestedToModel,property} = await req.json();
        if(!name || !email || !phone || !message || !property){
            return NextResponse.json({
                success:false,
                message:"please fill all fields of exploration form"
            },{status:400})
        }
        let data = {
            name,email,phone,message,requestedTo,property,requestedToModel:requestedToModel==="agent" ? "Agent" : "User"
        }
        if(isUser){
            if (isUser._id.toString() === requestedTo) {
        return NextResponse.json(
          {
            success: false,
            message: "You cannot inquire on your own property",
          },
          { status: 403 }
        );
      }
        }
        if(isUser){
            data.requestedBy = isUser._id;
            data.requestedByModel = isUser.role==="agent" ? "Agent" : "User"
            data.isGuest = false
        }else{
            data.isGuest = true
        }
        const isProperty = await Property.findById(property);
        if(!isProperty){
            return NextResponse.json({
                success:false,
                message: "proeprty not found try again",
            },{status:400})
        }
        if(isUser){
            const existingLead = await Lead.findOne({property,requestedBy:isUser._id});
        if(existingLead){
            return NextResponse.json({
                success:false,
                message: "You already sent inquiry for this property",
            },{status:400})
        }
        }
        
        const lead = await Lead.create(data); 
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
        const isUser = await isAuthenticated();
         if(!isUser){
            return NextResponse.json({
                success:false,
                message:"please login first"
            },{status:400}) 
        }
        const {searchParams} = new URL(req.url);
        const type = searchParams.get("type");
        let filter = {};
        if(type==="inbox"){
            filter = {
                requestedTo:isUser._id,
                requestedToModel:isUser.role === "agent" ? "Agent" : "User"
            }
        }else{
           filter = {
                requestedBy:isUser._id,
                requestedByModel:isUser.role === "agent" ? "Agent" : "User"
            } 
        };
        const leads = await Lead.find(filter).populate("property","slug images").populate("requestedBy").populate("requestedTo");
         return NextResponse.json({
                success:true,
                leads
            },{status:200})
    } catch (error) {
         return NextResponse.json({
                success:false,
                message:error.message
            },{status:400})
    }
}