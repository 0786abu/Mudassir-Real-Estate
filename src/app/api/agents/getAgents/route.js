import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await DataBase();

        // Get page from query params
        const searchParams = new URL(req.url).searchParams;
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;

        // Fetch agents with pagination
        const agents = await Agent.find(
            {},
            {
                name: 1,
                agencyName: 1,
                agencyProfile: 1,
                socialMedia: 1,
                phone: 1,
                email: 1,
                numOfProperties: 1,
                bio: 1,
                city: 1
            }
        )
        .skip(skip)
        .limit(limit);

        // Optional: total count for frontend pagination
        const totalAgents = await Agent.countDocuments();
        const totalPages = Math.ceil(totalAgents / limit)
        if(page < 1 || page >totalPages){
            return NextResponse.json({
                success:false,
                message:"This page not exist"
            },{status:401})
        }

        return NextResponse.json({
            success: true,
            page,
            totalAgents,
            totalPages,
            agents
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 400 });
    }
}
