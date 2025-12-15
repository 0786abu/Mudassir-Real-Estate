import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                success:false,
                message:"your are not authorize, please login"
            },{status:400})
        }
        const {slug} = await params;
        const property = await Property.findOne({slug});
        if(!property){
            return NextResponse.json({
                success:false,
                message:"proeprty not found"
            },{status:400})
        }
            return NextResponse.json({
                success:true,
                property
            },{status:200})
    } catch (error) {
            return NextResponse.json({
                success:false,
                message:error.message
            },{status:400})
    }
}