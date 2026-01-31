import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import cloudinary from "@/backend/utils/cloudinary";
import { isAuthorized } from "@/backend/utils/middlewere";
import addWatermark from "@/utils/WaterMarker";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await DataBase();

    const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "you are unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const formData = await req.formData();

    const developer = formData.get("developer");
    const description = formData.get("description");
    const logo = formData.get("logo"); // File OR string

    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json(
        { success: false, message: "project not found" },
        { status: 404 }
      );
    }

    // 🔹 DEFAULT: old logo hi rehne do
    let logoData = project.developedBy.logo;

    // 🔥 CASE: agar frontend se NEW image ayi ho
    if (logo && logo instanceof File) {
      // 1️⃣ old image delete (if exists)
      if (project.logo?.public_id) {
        await cloudinary.uploader.destroy(project.logo.public_id);
      }

      // 2️⃣ new image upload
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const devwatermarkbuffer = await addWatermark(buffer);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "properties/projects/developerLogo",
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          )
          .end(devwatermarkbuffer);
      });

      logoData = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    // 🔹 update project
    project.developedBy.developer = developer;
    project.developedBy.description = description;
    project.developedBy.logo = logoData;

    await project.save();

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    await DataBase();

    const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "you are unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const formData = await req.formData();

    const platform = formData.get("platform");
    const description = formData.get("description");
    const logo = formData.get("logo"); // File OR string

    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json(
        { success: false, message: "project not found" },
        { status: 404 }
      );
    }

    // 🔹 DEFAULT: old logo hi rehne do
    let logoData = project.marketingBy.logo;

    // 🔥 CASE: agar frontend se NEW image ayi ho
    if (logo && logo instanceof File) {
      // 1️⃣ old image delete (if exists)
      if (project.logo?.public_id) {
        await cloudinary.uploader.destroy(project.logo.public_id);
      }

      // 2️⃣ new image upload
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const marketingwatermarkbuffer = await addWatermark(buffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "properties/projects/marketingLogo",
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          )
          .end(marketingwatermarkbuffer);
      });

      logoData = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    // 🔹 update project
    project.marketingBy.platform = platform;
    project.marketingBy.description = description;
    project.marketingBy.logo = logoData;

    await project.save();

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}