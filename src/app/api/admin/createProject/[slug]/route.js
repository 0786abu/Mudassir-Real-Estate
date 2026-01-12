import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        await DataBase();
        const {slug} = await params;
        const project = await Project.findOne({slug});
        if(!project){
            return NextResponse.json({
                success:false,
                message:"project not found"
            },{status:401})
        }
        return NextResponse.json({
            success:true,
            project
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
        
    }
}