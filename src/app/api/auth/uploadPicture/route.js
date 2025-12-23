import { NextResponse } from "next/server";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import cloudinary from "@/backend/utils/cloudinary";
import Admin from "@/backend/model/adminModel";

export async function POST(req) {
  try {
    // 1️⃣ Auth check
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Get file from formData
    const formData = await req.formData();
    const file = formData.get("profilePicture");
    if (!file) return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });

    // 3️⃣ Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 4️⃣ Determine Model & field
    const roleModels = { agent: Agent, admin: Admin, individual: User };
    const Model = roleModels[user.role];
    if (!Model) {
    return NextResponse.json({ success: false, message: "invalid user role" }, { status: 401 });
}
    const currentUser = await Model.findById(user._id);

    // 5️⃣ Delete old picture if exists
    const oldUrl = user.role==="agent" ? currentUser?.agencyProfile : currentUser?.profile;
    if (oldUrl && oldUrl?.public_id) {
        await cloudinary.uploader.destroy(oldUrl.public_id);
    }

    // 6️⃣ Upload new file to Cloudinary (easy way)
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    // 7️⃣ Update DB
    if (user.role==="agent") {
      currentUser.agencyProfile.url = result.secure_url;
      currentUser.agencyProfile.public_id = result.public_id;
    } else {
      currentUser.profile.url = result.secure_url;
      currentUser.profile.public_id = result.public_id;
    }
    await currentUser.save();

    // 8️⃣ Return response
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      user:currentUser
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
