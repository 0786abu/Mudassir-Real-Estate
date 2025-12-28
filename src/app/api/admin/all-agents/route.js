import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { uploadToCloudinary } from "@/backend/utils/cloudinaryUploader";
import User from "@/backend/model/authModel";
import Admin from "@/backend/model/adminModel";

export async function GET(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{sttaus:401})
        }
        const {searchParams} = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;
        const totalAgents = await Agent.countDocuments();
         const totalPages = Math.ceil(totalAgents / limit);
        const agents = await Agent.find().skip(skip).limit(limit);
        return NextResponse.json({
            success:true,
            agents,
            totalPages,
            totalAgents
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}

// for admin add agent from admin panel
export async function POST(req) {
    try {
        await DataBase();
         const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{sttaus:401})
        }
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const profile = formData.get("profile");
        const from = formData.get("from")
        if (!profile || !(profile instanceof File)) {
  return NextResponse.json(
    { success: false, message: "Please add profile picture" },
    { status: 400 }
  );
}
        if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    let existingEmail = null;
    existingEmail = await User.findOne({email});
    if(!existingEmail){
        existingEmail = await Agent.findOne({email})
    }
    if(existingEmail){
        return NextResponse.json(
        { success: false, message: "email already exist add another email" },
        { status: 400 }
      );
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📸 Convert file to buffer
    const bytes = await profile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ☁️ Upload to cloudinary
    const uploadResult = await uploadToCloudinary(buffer, "profile_pictures");

    let userData;
    if(from==="agent"){
        userData = {
      name,
      email,
      password: hashedPassword,
      role:from,
      agencyProfile: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    };
    }else{
        userData = {
      name,
      email,
      password: hashedPassword,
      role:from,
      profile: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    };
    }
    const Model = from==="agent" ? Agent : from==="admin" ? Admin : User
    await Model.create(userData)

    return NextResponse.json({
        success:true,
        message:`${from==="agent" ? "Agent" : from==="admin" ? "Admin" : "User"} Created SuccessFull`
    },{status:200})
    } catch (error) {
       return NextResponse.json({
        success:false,
        message:error.message
    },{status:400}) 
    }
}