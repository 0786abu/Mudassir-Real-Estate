import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import Property from "@/backend/model/propertyModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import cloudinary from "@/backend/utils/cloudinary";
import { NextResponse } from "next/server";
import Admin from "@/backend/model/adminModel";

function getOptional(formData, key) {
  const value = formData.get(key);
  return value === null || value === "" ? undefined : value;
}


export async function POST(req) {
  try {
    await DataBase();

    // ✅ Auth check
    const isUser = await isAuthenticated();
    if (!isUser) {
      return NextResponse.json({
        message: "Login first to access this resource",
        success: false
      }, { status: 401 });
    }

    // ✅ Get user (either User or Agent)
    

    // ✅ Get files from FormData
    const formData = await req.formData();
    const files = formData.getAll("images"); // array of property images
    const floorPlanFile = formData.get("floorPlanImage"); // optional
    // ✅ Validate images array
    if (!files || files.length === 0) {
        return NextResponse.json({
            message: "At least one property image is required",
            success: false
        }, { status: 400 });
    }
    let user;
let createdByModel = isUser.role==="individual" ? "User" : isUser.role==="agent" ? "Agent" : "Admin";

if (isUser.role === "individual") {
  user = await User.findById(isUser._id);
} 
else if (isUser.role === "agent") {
  user = await Agent.findById(isUser._id);
} 
else if (isUser.role === "admin") {
  user = await Admin.findById(isUser._id);
}

if (!user) {
  return NextResponse.json(
    { success: false, message: "User not found" },
    { status: 404 }
  );
}

    const seo_title = formData.get("seo_title");
    const seo_description = formData.get("seo_description");
    const keywords = formData.get("keywords");
    const slug = formData.get("slug");
    const title = formData.get("title");
    const description = formData.get("description");
    const price = Number(formData.get("price"));
    const address = formData.get("address");
    const city = formData.get("city");
    const location = formData.get("location");
    const state = formData.get("state");
    const rooms = Number(formData.get("rooms"));
    const beds = Number(formData.get("beds"));
    const baths = Number(formData.get("baths"));
    const squareFits = Number(formData.get("squareFits"));
    const areaSize = formData.get("areaSize");
    const category = formData.get("category");
    const type = formData.get("type");
    const furnished = formData.get("furnished") === "true";
    const aboutProperty = formData.get("aboutProperty");
    const amenities = formData.getAll("amenities"); // array
    const video = getOptional(formData, "video");
    let balcony = formData.get("balcony");
    balcony = balcony ? Number(balcony) : undefined;
    const operatingSince = Number(formData.get("operatingSince"));
    if(!amenities || amenities.length === 0){
        return NextResponse.json({
            message: "Please select at least one amenity",
            success: false
        }, { status: 400 });
    }

    if (!seo_title || !seo_description || !slug || !title || !description || !price || !address || !city || !location || !state || !squareFits || !areaSize || !category || !type || !aboutProperty || !amenities || !operatingSince) {
        return NextResponse.json({
            message: "Please fill all required fields",
            success: false
        }, { status: 400 });
    };
    if(seo_title.length <10 || seo_description.length <50){
        return NextResponse.json({
            message: "SEO Title must be at least 10 characters and SEO Description must be at least 50 characters",
            success: false
        }, { status: 400 });
    }
    if(seo_title.length >70 || seo_description.length >160){
        return NextResponse.json({
            message: "SEO Title cannot exceed 70 characters and SEO Description cannot exceed 160 characters",
            success: false
        }, { status: 400 });
    }
    const isExistSlug = await Property.findOne({ slug });
    if (isExistSlug) {
        return NextResponse.json({
            message: "Slug already exists. Please choose a different one.",
            success: false
        }, { status: 400 });
    }
    
    // ✅ Upload function for Cloudinary
    const uploadToCloudinary = async (file, folder = "property_images") => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    // ✅ Upload property images
    const uploadedImages = [];
    for (const file of files) {
      const result = await uploadToCloudinary(file, "property_images");
      uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
    }

    // ✅ Upload floor plan if exists
    let uploadedFloorPlan;
    if (floorPlanFile) {
      const result = await uploadToCloudinary(floorPlanFile, "floor_plans");
      uploadedFloorPlan = { url: result.secure_url, public_id: result.public_id };
    }

    // ✅ Parse other fields from FormData

    // ✅ Handle credits
    let isFree = false;
    if (user.credits > 0) {
      isFree = true;
      user.credits -= 1;
      await user.save();
    }
    const data = {
      seo_title,
      seo_description,
      keywords,
      slug,
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
      operatingSince,
      images: uploadedImages,
      floorPlanImage: uploadedFloorPlan,
      createdBy: user._id,
      createdByModel,
      isFree
    };

    // ✅ Save property to DB
    const property = await Property.create(data);

    return NextResponse.json({
      success: true,
      message: "Property created successfully",
      property
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

export async function GET(req) {
    try {
        await DataBase();
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const beds = Number(searchParams.get("beds"));
        const limit = 4;
        const skip = (page - 1) * limit;
        const areaSize = searchParams.get('areaSize');
        const category = searchParams.get('category');
        const type = searchParams.get('type');
        const minsquareSize = searchParams.get('minsquareSize');
        const maxsquareSize = searchParams.get('maxsquareSize');
        const location = searchParams.get('location');
        const city = searchParams.get('city');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const filter = {isApproved:"Approved"};
        if (areaSize) filter.areaSize = areaSize;
        if (category) filter.category = category;
        if (type) filter.type = type;
        if (location) filter.location = location;
        if (beds) filter.beds = beds;
        if (city) filter.city = city;
        if (minsquareSize || maxsquareSize) {
            filter.squareFits = {};
            if (minsquareSize) filter.squareFits.$gte = Number(minsquareSize);
            if (maxsquareSize) filter.squareFits.$lte = Number(maxsquareSize);
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        const numOfProperties = await Property.countDocuments(filter);
        const totalPages = Math.ceil(numOfProperties / limit);
         if (page < 1 || page > totalPages) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Page out of range. Total pages: ${totalPages}`
                },
                { status: 400 }
            );
        }
        const properties = await Property.find(filter,{images:1,title:1,createdBy:1,description:1,price:1,beds:1,baths:1,squareFits:1,createdAt:1,slug:1,category:1,type:1,location:1}).skip(skip).limit(limit).populate('createdBy', 'name email agencyProfile profile whatsappAPI socialMedia');
        return NextResponse.json({
            success: true,
            totalProperties: numOfProperties,
            totalPages,
            currentPage: page,
            properties
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
