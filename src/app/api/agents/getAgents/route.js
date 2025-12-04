import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await DataBase();
        const agents = await Agent.find({},{name:1,agencyName:1,agencyProfile:1,socialMedia:1,phone:1,email:1,numOfProperties:1});
        return NextResponse.json({
            success:true,
            agents
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}