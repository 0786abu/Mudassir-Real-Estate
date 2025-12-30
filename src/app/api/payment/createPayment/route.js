import { DataBase } from "@/backend/config/database";
import Payment from "@/backend/model/paymentModel";
import Property from "@/backend/model/propertyModel";
import cloudinary from "@/backend/utils/cloudinary";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NotificationCreate } from "@/utils/NotificationCreate";
import { NextResponse } from "next/server";


function getOptional(formData, key) {
  const value = formData.get(key);
  return value === null || value === "" ? undefined : value;
}


export async function POST(req) {
  try {
    await DataBase();

    const isUser = await isAuthenticated();
    if (!isUser) {
      return NextResponse.json(
        { success: false, message: "You are not authorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const amount = formData.get("amount");
    const propertyID = formData.get("propertyID");
    const paymentMethod = formData.get("paymentMethod");
    const screenshot = formData.get("screenshot");
    const bankDetails = getOptional(formData, "bankDetails");
    if(!propertyID){
        return NextResponse.json(
        { success: false, message: "PropertyID required, please try again" },
        { status: 400 }
      );
    }

    if (!amount || !paymentMethod || !screenshot) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ convert file to buffer
    const buffer = Buffer.from(await screenshot.arrayBuffer());

    // ✅ upload to cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "payments" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    const property = await Property.findById(propertyID);
    property.isRequestedForPayment = true;
    await property.save();
    
    const paymentData = {
      user: isUser._id,
      property:propertyID,
      amount,
      paymentMethod,
      bankDetails,
      paymentScreenshot: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
      createdByModel:isUser?.role==="agent" ? "Agent" : "User"
    };

    const payment = await Payment.create(paymentData);
          const Notitype= "payment_created"
        const message = `User create a payment for this property ${property.title} so you can go on payments page and see payment detals and approve payment and property`;
        const link = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard/payments`
        await NotificationCreate({type:Notitype,message,link,createdBy:isUser._id,createdByModel:isUser.role==="individual" ? "User" : "Agent"})

    return NextResponse.json({
      success: true,
      message: "Payment submitted successfully",
      data: payment,
      property
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message:error.message},
      { status: 500 }
    );
  }
}

export async function GET(req) {
    try {
        await DataBase();
        const isUser = await isAuthenticated();
    if (!isUser) {
      return NextResponse.json(
        { success: false, message: "You are not authorized, please login" },
        { status: 401 }
      );
    }
    const payments = await Payment.find({user:isUser._id}).populate("property","slug");
    return NextResponse.json({
        success:true,
        payments
    },{status:200})
    } catch (error) {
       return NextResponse.json({
        success:false,
        error:error.message
    },{status:400}) 
    }
}