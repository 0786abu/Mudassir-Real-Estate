import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import { uploadToCloudinary2 } from "@/backend/utils/cloudinaryUploader";
import { isAuthorized } from "@/backend/utils/middlewere";
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
// for update project items
export async function PUT(req, { params }) {
  try {
    await DataBase();

    const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "You are not authorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const { items } = await req.json();

    const project = await Project.findOneAndUpdate(
      { slug },
      { $set: { items } },
      { new: true }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inventory update successful",
        project,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    await DataBase();

    const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 });
    }

    const { slug } = await params;

    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    // FormData parse
    const formData = await req.formData();
    const floorNames = formData.getAll("floorName"); // array of names
    const floorImages = formData.getAll("floorImage"); // array of files (File objects)

    if (floorNames.length !== floorImages.length) {
      return NextResponse.json({ success: false, message: "Mismatch in floor names and images" }, { status: 400 });
    }

    const newFloorPlans = [];

    // Upload each image to Cloudinary
    for (let i = 0; i < floorNames.length; i++) {
      const file = floorImages[i];
      const buffer = await file.arrayBuffer();

      const uploaded = await uploadToCloudinary2({buffer,folder:"properties/projects/floorPlans"});

      newFloorPlans.push({
        floorName: floorNames[i],
        floorImage: {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        },
      });
    }

    // Add new floorPlans to project
    project.floorPlans.push(...newFloorPlans);
    await project.save();

    return NextResponse.json({
      success: true,
      message: "FloorPlans added successfully",
      project, // updated project
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export async function DELETE(req,{params}) {
  try {
    await DataBase();
     const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "you are not authorized" }, { status: 401 });
    }
    const {slug} = await params;
    const project = await Project.findOneAndDelete({slug});
    if (!project) {
      return NextResponse.json({ success: false, message: "project not found" }, { status: 401 });
    }
    return NextResponse.json({
      success:true,
      message:"Project delete successfull"
    },{status:200})
  } catch (error) {
    return NextResponse.json({
      success:false,
      message:error.message
    },{status:400})
  }
}