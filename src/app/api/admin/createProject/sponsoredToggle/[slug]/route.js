import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

// for sponsored toggle
export async function PUT(req,{params}) {
  try {
    await DataBase();
     const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "you are not authorized" },
        { status: 401 }
      );
    }
    const {slug} = await params;
    let project = await Project.findOne({slug});
    if(!project){
      return NextResponse.json({
        success:false,
        message:"project not found, try again later"
      },{statis:401})
    }
    project.isSponsored = !project.isSponsored
    await project.save();
    return NextResponse.json({
      success:true,
      message:`project mark as ${project.isSponsored===true ? "sponsored" : "unSponsored"} successfull`
    },{status:200})
  } catch (error) {
     return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}