import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import cloudinary from "@/backend/utils/cloudinary";
import { uploadToCloudinary2 } from "@/backend/utils/cloudinaryUploader";
import { isAuthorized } from "@/backend/utils/middlewere";
import addWatermark from "@/utils/WaterMarker";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
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
    const paymentNames = formData.getAll("paymentName"); // array of names
    const paymentImages = formData.getAll("paymentImage"); // array of files (File objects)

    if (paymentNames.length !== paymentImages.length) {
      return NextResponse.json({ success: false, message: "Mismatch in payment names and images" }, { status: 400 });
    }

    const newPaymentPlans = [];

    // Upload each image to Cloudinary
    for (let i = 0; i < paymentNames.length; i++) {
      const file = paymentImages[i];
      const buffer = await file.arrayBuffer();
      const watermarkbuffer = await addWatermark(buffer)

      const uploaded = await uploadToCloudinary2({buffer:watermarkbuffer,folder:"properties/projects/paymentPlans"});

      newPaymentPlans.push({
        paymentName: paymentNames[i],
        paymentImage: {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        },
      });
    }

    // Add new floorPlans to project
    project.paymentPlans.push(...newPaymentPlans);
    await project.save();

    return NextResponse.json({
      success: true,
      message: "PaymentPlans added successfully",
      project, // updated project
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

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

    const {searchParams} = new URL(req.url);
    const paymentID = searchParams.get("paymentID");
    const { slug } = await params;

    // 🔹 1. Get project & specific floorplan
    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const paymentPlan = project.paymentPlans.find(
      (f) => f.paymentImage?.public_id === paymentID
    );

    if (!paymentPlan) {
      return NextResponse.json(
        { success: false, message: "Paymentplan not found" },
        { status: 404 }
      );
    }
    if(project.paymentPlans.length===1){
        return NextResponse.json(
        { success: false, message: "Atleast one floor plan required, so you can not delete this floor plan content" },
        { status: 404 }
      );
    }

    // 🔹 2. Delete image from Cloudinary
    await deleteFromCloudinary(paymentPlan.paymentImage.public_id);

    // 🔹 3. Remove object from MongoDB
    const projectt = await Project.findOneAndUpdate(
      { slug },
      {
        $pull: {
          paymentPlans: {
            "paymentImage.public_id": paymentID,
          },
        },
      },
      {new:true}
    );

    return NextResponse.json(
      {
        success: true,
        message: "PaymentPlan deleted successfully",
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
// for featured toggle
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
    project.isFeatured = !project.isFeatured
    await project.save();
    return NextResponse.json({
      success:true,
      message:`project mark as ${project.isFeatured===true ? "featured" : "unFeatured"} successfull`
    },{status:200})
  } catch (error) {
     return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}