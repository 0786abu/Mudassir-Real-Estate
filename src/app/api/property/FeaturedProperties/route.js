import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await DataBase();
        const featuredProperties = await Property.find({isFeatured:true},{title:1,description:1,price:1,category:1,type:1,beds:1,baths:1,rooms:1,slug:1,isFeatured:1,images:1,city:1,location:1,squareFits:1});
        return NextResponse.json({
            success:true,
            featuredProperties
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500})
    }
}