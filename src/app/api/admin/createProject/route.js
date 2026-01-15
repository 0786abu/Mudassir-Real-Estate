import { DataBase } from "@/backend/config/database";
import Project from "@/backend/model/projectSchema";
import { uploadToCloudinary2 } from "@/backend/utils/cloudinaryUploader";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";


function getOptional(formData, key) {
  const value = formData.get(key);
  return value === null || value === "" ? undefined : value;
}

export async function POST(req) {
  try {
    await DataBase();

    const isAdmin = await isAuthorized();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "You are not authorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    // ---------- Simple fields ----------
    const seo_title = formData.get("seo_title");
    const seo_description = formData.get("seo_description");
    const keywords = formData.getAll("keywords") || [];
    const slug = formData.get("slug");
    const projectTitle = formData.get("projectTitle");
    const city = formData.get("city");
    const location = formData.get("location");
    const type = formData.get("type");
    const minItemPrice = formData.get("minItemPrice");
    const maxItemPrice = formData.get("maxItemPrice");
    const detailedDescription = formData.get("detailedDescription");
    const isFeatured = formData.get("isFeatured") === "true";
    const isSponsored = formData.get("isSponsored") === "true";
    const map = formData.get("map");
    const projectOwnerPhone = formData.get("projectOwnerPhone");
    const projectOwnerEmail = formData.get("projectOwnerEmail");
    const projectOwnerWhatsappAPI = formData.get("projectOwnerWhatsappAPI");

    // ---------- JSON fields ----------
    const items = JSON.parse(formData.get("items") || "[]");
    const features = JSON.parse(formData.get("features") || "{}");
    const floorPlans = JSON.parse(formData.get("floorPlans") || "[]");
const paymentPlans = JSON.parse(formData.get("paymentPlans") || "[]");

const floorPlanImages = formData.getAll("floorPlanImages");
const paymentPlanImages = formData.getAll("paymentPlanImages");

    const offering = JSON.parse(formData.get("offering") || "[]");
    const developedBy = JSON.parse(formData.get("developedBy") || "{}");
    const marketingBy = JSON.parse(formData.get("marketingBy") || "{}");

    // ---------- File fields ----------
    const projectLogoFile = formData.get("projectLogo");
    const developedByLogoFile = formData.get("developedByLogo");
    const marketingByLogoFile = formData.get("marketingByLogo");
    const imagesFiles = formData.getAll("images");
    const exist = await Project.findOne({slug});
    if(exist){
      return NextResponse.json({
        success:false,
        message:"please change your slug, slug already exist"
      },{status:401})
    }
    // ---------- Validations ----------
    if (!projectTitle || !city || !location || !type || !minItemPrice || !maxItemPrice || items.length===0 || !detailedDescription || !map || !features || !projectOwnerPhone || !projectOwnerEmail || !projectOwnerWhatsappAPI) {
      return NextResponse.json({ success: false, message: "All Fields are required" }, { status: 401 });
    }
    if(!seo_title || !seo_description){
      return NextResponse.json({ success: false, message: "SEO Title and Description are required" }, { status: 401 });
    }
    if(!slug){
      return NextResponse.json({ success: false, message: "Project Slug is required" }, { status: 401 });
    }
    if(keywords.length===0){
      return NextResponse.json({ success: false, message: "At least one keyword is required" }, { status: 401 });
    }

    // if (!projectLogoFile || !developedByLogoFile || imagesFiles.length===0 || floorPlanImages.length===0 || paymentPlanImages.length===0) {
    //   return NextResponse.json({ success: false, message: "All required images are required" }, { status: 401 });
    // }
    if(!projectLogoFile){
      return NextResponse.json({ success: false, message: "Project Logo is required" }, { status: 401 });
    }
    if(!developedByLogoFile){
      return NextResponse.json({ success: false, message: "Developed By Logo is required" }, { status: 401 });
    }
    if(imagesFiles.length===0){
      return NextResponse.json({ success: false, message: "At least one Project Image is required" }, { status: 401 });
    }
    if(floorPlanImages.length===0){
      return NextResponse.json({ success: false, message: "At least one Floor Plan Image is required" }, { status: 401 });
    }
    if(paymentPlanImages.length===0){
      return NextResponse.json({ success: false, message: "At least one Payment Plan Image is required" }, { status: 401 });
    }

    // ---------- Upload projectLogo ----------
    const projectLogoBuffer = await projectLogoFile.arrayBuffer();
    const projectLogoUpload = await uploadToCloudinary2({ buffer: projectLogoBuffer, folder: "properties/projects/logos" });
    const projectLogo = { url: projectLogoUpload.secure_url, public_id: projectLogoUpload.public_id };

    // ---------- Upload images ----------
    const images = [];
    for (const img of imagesFiles) {
      const buffer = await img.arrayBuffer();
      const uploadResult = await uploadToCloudinary2({ buffer, folder: "properties/projects/images" });
      images.push({ url: uploadResult.secure_url, public_id: uploadResult.public_id });
    }

    // ---------- Upload developedBy logo ----------
    let developerLogo = null;
    if (developedByLogoFile) {
      const buffer = await developedByLogoFile.arrayBuffer();
      const uploadResult = await uploadToCloudinary2({ buffer, folder: "properties/projects/developerLogo" });
      developerLogo = { url: uploadResult.secure_url, public_id: uploadResult.public_id };
    }

    // ---------- Upload marketingBy logo ----------
    let marketingLogo = null;
    if (marketingByLogoFile) {
      const buffer = await marketingByLogoFile.arrayBuffer();
      const uploadResult = await uploadToCloudinary2({ buffer, folder: "properties/projects/marketingLogo" });
      marketingLogo = { url: uploadResult.secure_url, public_id: uploadResult.public_id };
    }

    // ---------- Upload floorPlans ----------
   const floorPlansData = [];

for (let i = 0; i < floorPlans.length; i++) {
  let image = null;

  if (floorPlanImages[i]) {
    const buffer = await floorPlanImages[i].arrayBuffer();
    const upload = await uploadToCloudinary2({
      buffer,
      folder: "properties/projects/floorPlans",
    });

    image = {
      url: upload.secure_url,
      public_id: upload.public_id,
    };
  }

  floorPlansData.push({
    floorName: floorPlans[i].floorName,
    floorImage: image,
  });
}


    // ---------- Upload paymentPlans ----------
    const paymentPlansData = [];

for (let i = 0; i < paymentPlans.length; i++) {
  let image = null;

  if (paymentPlanImages[i]) {
    const buffer = await paymentPlanImages[i].arrayBuffer();
    const upload = await uploadToCloudinary2({
      buffer,
      folder: "properties/projects/paymentPlans",
    });

    image = {
      url: upload.secure_url,
      public_id: upload.public_id,
    };
  }

  paymentPlansData.push({
    paymentName: paymentPlans[i].paymentName,
    paymentImage: image,
  });
}


    // ---------- Final project data ----------
    const projectData = {
      seo_title,
      seo_description,
      keywords,
      slug,
      projectTitle,
      city,
      location,
      projectLogo,
      developedBy: { ...developedBy, logo: developerLogo },
      marketingBy: { ...marketingBy, logo: marketingLogo },
      floorPlans: floorPlansData,
      paymentPlans: paymentPlansData,
      type,
      minItemPrice,
      maxItemPrice,
      items,
      detailedDescription,
      isFeatured,
      isSponsored,
      map,
      features,
      images,
      projectOwnerPhone,
      projectOwnerEmail,
      projectOwnerWhatsappAPI,
      offering,
      createdBy: isAdmin._id,
    };
    // ---------- Save to DB ----------
    const project = await Project.create(projectData);
    return NextResponse.json({ success: true, message: "Project created successfully", project }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await DataBase();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const isFeatured = searchParams.get("featured")
    const isSponsored = searchParams.get("sponsored")
    const type = searchParams.get("type")
    const query = {};
    if(isFeatured){
      if (isFeatured === "true") {
      query.isFeatured = true;
    }else{
      query.isFeatured = false
    }
    }
    if(isSponsored){
      if (isSponsored === "true") {
      query.isSponsored = true;
    }else{
      query.isSponsored = false
    }
    }

    if (type) {
      query.type = type;
    }
    const limit = 12;
    const skip = (page - 1) * limit;
    const totalProjects = await Project.countDocuments();
    const totalPages = Math.ceil(totalProjects / limit);
    const projects = await Project.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      projects,
      totalProjects,
      totalPages,
      currentPage: page,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}