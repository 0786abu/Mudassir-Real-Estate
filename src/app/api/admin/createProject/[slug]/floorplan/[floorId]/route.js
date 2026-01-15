import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import { isAuthorized } from "@/backend/utils/middlewere";
import cloudinary from "@/backend/utils/cloudinary";
import { NextResponse } from "next/server";


const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};

export async function DELETE(req, { params }) {
  try {
    await DataBase();

    const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 401 }
      );
    }

    const { slug, floorId } = await params;
    const floorIdnew = decodeURIComponent(floorId)

    // 🔹 1. Get project & specific floorplan
    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const floorplan = project.floorPlans.find(
      (f) => f.floorImage?.public_id === floorIdnew
    );

    if (!floorplan) {
      return NextResponse.json(
        { success: false, message: "Floorplan not found" },
        { status: 404 }
      );
    }
    if(project.floorPlans.length===1){
        return NextResponse.json(
        { success: false, message: "Atleast one floor plan required, so you can not delete this floor plan content" },
        { status: 404 }
      );
    }

    // 🔹 2. Delete image from Cloudinary
    await deleteFromCloudinary(floorplan.floorImage.public_id);

    // 🔹 3. Remove object from MongoDB
    const projectt = await Project.findOneAndUpdate(
      { slug },
      {
        $pull: {
          floorPlans: {
            "floorImage.public_id": floorId,
          },
        },
      },
      {new:true}
    );

    return NextResponse.json(
      {
        success: true,
        message: "Floorplan deleted successfully",
        projectt
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
