import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
import User from "@/backend/model/authModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DataBase();
    const { otpCode } = await req.json();
    if(!otpCode){
      return NextResponse.json({
        success:false,
        message:"Pelase Enter OTP first"
      },{status:400})
    }

    // 1. Check in User collection
    let user = await User.findOne({ otpCode }).select("-password");

    // 2. If not found, check in Agent collection
    let role = "individual";
    if (!user) {
      user = await Agent.findOne({ otpCode }).select("-password");
      role = "agent";
    }

    // 3. If still not found
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // 4. Check OTP expiry
    if (user.otpExpiry < Date.now()) {
      return NextResponse.json(
        { success: false, message: "OTP expired" },
        { status: 400 }
      );
    }

    // 5. Update document
    user = await (role === "individual" ? User : Agent).findOneAndUpdate(
      { _id: user._id },
      { $set: { isPhoneVerified: true }, $unset: { otpCode: true, otpExpiry: true } },
      { new: true } // updated document return kare
    );

    // 6. Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await user.save();

    const response = NextResponse.json(
      { success: true, message: "Phone verified successfully", user },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
