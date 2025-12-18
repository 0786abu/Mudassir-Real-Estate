import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import Property from "@/backend/model/propertyModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        await DataBase();
        const {_id} = params;
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page")) || 1;
        const limit = 2;
        const skip = (page - 1) * limit;
        const agent = await Agent.findById(_id);
        if(!agent){
            return NextResponse.json({
            success:false,
            message:"Agent Not Found"
        },{status:400})
        }
        const totalProperties = await Property.countDocuments({ createdBy: agent._id, isApproved: "Approved" });
        const agentProperties = await Property.find({createdBy:agent._id,isApproved:"Approved"}).skip(skip).limit(limit).sort({ createdAt: -1 });
        const totalPages = Math.ceil(totalProperties / limit);
        return NextResponse.json({
            success:true,
            agent,
            agentProperties,
            totalProperties,
            totalPages,
            page
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}