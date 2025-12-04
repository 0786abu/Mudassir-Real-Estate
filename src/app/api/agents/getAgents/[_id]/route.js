import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        await DataBase();
        const {_id} = await params;
        const agent = await Agent.findById(_id);
        if(!agent){
            return NextResponse.json({
            success:false,
            message:"Agent Not Found"
        },{status:400})
        }
        return NextResponse.json({
            success:true,
            agent
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}