import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import cloudinary from "@/backend/utils/cloudinary";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";


// for add new images to existing property
export async function POST(req, { params }) {
  try {
    await DataBase();

    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;

    const property = await Property.findOne({ slug }).populate("createdBy","name email profile agencyProfile agencyName");
    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    if (user._id.toString() !== property.createdBy.toString()) {
      return NextResponse.json(
        { success: false, message: "You are not authorized" },
        { status: 403 }
      );
    }

    // ----- FORM DATA -----
    const formData = await req.formData();
    const files = formData.getAll("images"); // multiple images

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No images uploaded" },
        { status: 400 }
      );
    }

    // ----- Upload to Cloudinary -----
    const uploadedImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "property-images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      uploadedImages.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }

    // ----- Add new images to existing images (preview remain intact) -----
    property.images.push(...uploadedImages);
    await property.save();

    return NextResponse.json(
      {
        success: true,
        message: "Images uploaded successfully",
        newImages: uploadedImages,
        property,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message:error.message },
      { status: 500 }
    );
  }
}

// for delete property from owner dashboard

export async function DELETE(req, {params}){
    try {
        await DataBase();
        const user = await isAuthenticated();
        if (!user) {
          return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
          );
        };
        const {slug} = await params;
        const property = await Property.findOne({slug});
        if(!property){
            return NextResponse.json(
                { success: false, message: "Property not found" },
                { status: 404 }
              );
        }
        if(user._id.toString() !== property.createdBy.toString()){
            return NextResponse.json(
                { success: false, message: "You are not authorized" },
                { status: 403 }
              );
        }
        // delete images from cloudinary
        for(const img of property.images){
            await cloudinary.uploader.destroy(img.public_id);
        }
        // delete property from db
        await property.deleteOne();
        return NextResponse.json({
            message: "Property deleted successfully",
            success: true
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}

