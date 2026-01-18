import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await DataBase();
        const sponsoredProjects = await Project.find({isSponsored:true}).limit(4).sort({createdAt:-1});
        return NextResponse.json({
            success:true,
            projects:sponsoredProjects
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}