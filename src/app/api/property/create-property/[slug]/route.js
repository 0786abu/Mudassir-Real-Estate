import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import cloudinary from "@/backend/utils/cloudinary";
import { isAuthenticated } from "@/backend/utils/middlewere";
import addWatermark from "@/utils/WaterMarker";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    try {
        await DataBase();
        const {slug} = await params;
        const property = await Property.findOne({slug}).populate("createdBy","name email address role agencyName agencyProfile profile whatsappAPI phone");
        if(!property){
            return NextResponse.json({
                message: "Property not found",
                success: false
            }, { status: 404 });
        };
        property.views += 1;
        await property.save();
        const relatedProperties = await Property.find({category:property.category,type:property.type,_id:{$ne:property._id}}).limit(6);
        return NextResponse.json({
            message: "Property fetched successfully",
            success: true,
            data: property,
            relatedProperties
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}

// for update property details

export async function PUT(req,{params}){
    try {
        await DataBase();
        const {slug} = await params;
        const isUser = await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                message: "Unauthorized, please login",
                success: false
            }, { status: 401 });
        }
        const existingProperty = await Property.findOne({slug});
        if(!existingProperty){
            return NextResponse.json({
                message: "Property not found",
                success: false
            }, { status: 404 });
        }
        if(isUser._id.toString() !== existingProperty.createdBy.toString()){
            return NextResponse.json({
                message: "You are not authorized to update this property",
                success: false
            }, { status: 403 });
        }
        const {seo_title,seo_description,slug:isSlug,keywords,title,description,price,address,city,location,state,rooms,beds,baths,squareFits,areaSize,category,type,furnished,aboutProperty,amenities,video,balcony,operatingSince} = await req.json();
        if (isSlug && isSlug !== slug) {
            const slugExist = await Property.findOne({ slug: isSlug });
            if (slugExist) {
                return NextResponse.json(
                    { message: "Slug already exists, choose another", success: false },
                    { status: 400 }
                );
            }
        }
         const updateData = {
            seo_title,
            seo_description,
            slug: isSlug || slug, // If newSlug empty, keep old one
            keywords,
            title,
            description,
            price,
            address,
            city,
            location,
            state,
            rooms,
            beds,
            baths,
            squareFits,
            areaSize,
            category,
            type,
            furnished,
            aboutProperty,
            amenities,
            video,
            balcony,
            operatingSince
        };
        const property = await Property.findOneAndUpdate({slug},updateData,{new:true}).populate("createdBy","name email agencyName agencyProfile profile whatsappAPI phone");
        return NextResponse.json({
            message: "Property updated successfully",
            success: true,
            property
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}

// for delete image from cloudinary
export async function DELETE(req, { params }) {
  try {
    await DataBase();

    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const public_id = searchParams.get("public_id");
    if (!public_id) {
      return NextResponse.json(
        { success: false, message: "public_id is required" },
        { status: 400 }
      );
    }

    // Auth check
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find property by slug
    const property = await Property.findOne({ slug }).populate("createdBy","name email profile agencyProfile agencyName");
    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    // Owner check
    if (property.createdBy._id.toString() !== user._id.toString()) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }
    if(property.images.length === 1){
        return NextResponse.json(
            { success: false, message: "No more images to delete, atleast one image must for listing" },
            { status: 400 }
          );
    }
    // 🔥 Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // 🔥 Remove from DB array
    property.images = property.images.filter(
      (img) => img.public_id !== public_id
    );

    await property.save();

    return NextResponse.json(
      {
        success: true,
        message: "Image deleted from Cloudinary & DB",
        data: property,
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

// for update floor plan image
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
    const existingProperty = await Property.findOne({ slug });

    if (!existingProperty) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    if (existingProperty.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }

    // ⭐ Receive FORM DATA
    const form = await req.formData();
    const imageFile = form.get("floorPlanImage");

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );
    }

    // Convert file → buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const watermarkbuffer = await addWatermark(buffer)

    // ⭐ Delete old image from Cloudinary
    if (existingProperty.floorPlanImage?.public_id) {
      await cloudinary.uploader.destroy(
        existingProperty.floorPlanImage.public_id
      );
    }

    // ⭐ Upload new image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "properties/floorplans",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(watermarkbuffer);
    });

    // ⭐ Update DB with new image
    existingProperty.floorPlanImage = {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    };

    await existingProperty.save();

    return NextResponse.json(
      {
        success: true,
        message: "Floor plan image updated successfully",
        data: existingProperty,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
