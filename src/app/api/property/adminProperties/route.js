import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await DataBase();
        const {searchParams} = new URL(req.url);
        // const 
        const page = Number(searchParams.get("page")) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;
        const totalProperties = await Property.countDocuments({createdByModel:"Admin"});
         const totalPages = Math.ceil(totalProperties / limit);
        const properties = await Property.find({createdByModel:"Admin"}).skip(skip).limit(limit);
        return NextResponse.json({
            success:true,
            properties,
            totalPages,
            totalProperties
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}
