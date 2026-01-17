import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function PUT(req,{params}) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized"
            },{status:401})
        }
        const {slug} = await params;
        const {seo_title,seo_description,keywords,projectTitle,city,location,offering,type,minItemPrice,maxItemPrice,detailedDescription,map,features,projectOwnerPhone,projectOwnerEmail,projectOwnerWhatsappAPI} = await req.json();
        let project = await Project.findOne({slug});
        if(!project){
            return NextResponse.json({
                success:false,
                message:"project not found"
            },{status:400})
        }
        const updatedProject = await Project.findOneAndUpdate({slug},{seo_title,seo_description,keywords,projectTitle,city,location,offering,type,minItemPrice,maxItemPrice,detailedDescription,map,features,projectOwnerPhone,projectOwnerEmail,projectOwnerWhatsappAPI},{new:true});
        return NextResponse.json({
            success:true,
            message:"project details update successfull",
            project:updatedProject
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}