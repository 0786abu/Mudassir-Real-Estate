import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import cloudinary from "@/backend/utils/cloudinary";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NotificationCreate } from "@/utils/NotificationCreate";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                success:false,
                message:"you are unauthorized to access this route, please login"
            },{status:401})
        }
        const {_id} = await params;
        const existproperty = await Property.findById(_id);
        if(!existproperty){
            return NextResponse.json({
                success:false,
                message:"Property not found"
            },{status:401})
        }
        if(existproperty?.createdBy?.toString() !== isUser?._id?.toString()){
            return NextResponse.json({
                success:false,
                message:"This is not your property, so you are not authorized to delete this property"
            },{status:401})
        }
        if (existproperty.images && existproperty.images.length > 0) {
      for (const img of existproperty.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }
    if(isUser.role === "agent"){
        const user = await Agent.findById(isUser._id);
        user.numOfProperties -=1;
        await user.save();
    }
        const property = await Property.deleteOne({_id:_id,createdBy:isUser._id})
          if(isUser.role !== "admin"){
            const Notitype= "property_deleted"
        const message = `Property delete by ${isUser.name}`;
        await NotificationCreate({type:Notitype,message,createdBy:isUser._id,createdByModel:isUser.role==="individual" ? "User" : "Agent"})
          }
        return NextResponse.json({
            success:true,
            message:"Property Delete Successfull",
            property
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message,
        },{status:500})
    }
}