import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import cloudinary from "@/backend/utils/cloudinary";
import { isAuthorized } from "@/backend/utils/middlewere";
import { DeletePropertyMail, FreePropertyApprovedMail, RejectPropertyApprovedMail } from "@/backend/utils/NodeMailer";
import { emailQueue } from "@/utils/Queue";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    try {
        await DataBase();
        const {slug} = await params;
        const property = await Property.findOne({slug}).populate("createdBy","name email address role agencyName agencyProfile profile");
        if(!property){
            return NextResponse.json({
                message: "Property not found",
                success: false
            }, { status: 404 });
        };
        return NextResponse.json({
            success: true,
            data: property
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}

// for make featured toggle
export async function PUT(req,{params}){
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                message: "you are not authorized to access this route",
                success: false
            }, { status: 401 });
        }
        const {slug} = await params;
        const property = await Property.findOne({slug}).populate("createdBy","name email address role agencyName agencyProfile profile");
        if(!property){
            return NextResponse.json({
                message: "Property not found",
                success: false
            }, { status: 404 });
        };
        if(property.isApproved==="Pending"){
            return NextResponse.json({
                message: "This property still in pending for approval, please first approved property to make featured this property",
                success: false
            }, { status: 404 });
        };
        property.isFeatured = !property.isFeatured;
        await property.save();
        return NextResponse.json({
            success: true,
            message:`Mark property as ${property.isFeatured ? "Featured" : "UnFeatured"} successfull`,
            data: property
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}
// for make approved
export async function POST(req,{params}){
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                message: "you are not authorized to access this route",
                success: false
            }, { status: 401 });
        }
        const {slug} = await params;
        const {status} = await req.json();
        const property = await Property.findOne({slug}).populate("createdBy","name email address role agencyName agencyProfile profile");
        if(!property){
            return NextResponse.json({
                message: "Property not found",
                success: false
            }, { status: 404 });
        };
        if(status!=="Rejected"){
            if(!property.isFree && !property.isPaid){
            return NextResponse.json({
                message: "Payment not yet of this property, so still you not mark as approved of this property",
                success: false
            }, { status: 404 });
        };
        }
        let link = `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${property.slug}`
        if(status==="Approved"){
            if(property.isFree){
                await FreePropertyApprovedMail({name:property.createdBy.name,email:property.createdBy.email,link,isFree:true})
            }else{
                await FreePropertyApprovedMail({name:property.createdBy.name,email:property.createdBy.email,link,isFree:false})
            }
        }else if(status === "Rejected"){
           if(property.isFree){
            await RejectPropertyApprovedMail({name:property.createdBy.name,email:property.createdBy.email,isFree:true})
           }else{
            await RejectPropertyApprovedMail({name:property.createdBy.name,email:property.createdBy.email,isFree:false})
           }
        }
        property.isApproved = status;
        await property.save();
        if(status==="Approved"){
            await emailQueue.add("PROPERTY_CREATED", {
        property,
        
      },{
    attempts: 5, // max 5 tries
    backoff: {
      type: "exponential",
      delay: 3000, // 3 sec
    },
    removeOnComplete: { age: 3600 },
    removeOnFail: { age: 86400 },
  });
        }
        return NextResponse.json({
            success: true,
            message:`Mark property as ${status} successfull`,
            data: property
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}

// for: admin delete proeprty
export async function DELETE(req,{params}) {
    try {
        await DataBase();
        const {slug} = await params;
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        const {searchParams} = new URL(req.url);
        const reason = searchParams.get("reason")
        if(!reason){
            return NextResponse.json({
                success:false,
                message:"please add reason to delete property"
            },{status:401})
        }
        const property = await Property.findOne({slug}).populate("createdBy","name email role");
        if(!property){
            return NextResponse.json({
                success:false,
                message:"property not found"
            },{status:401})
        }
        if (property.floorPlanImage?.public_id) {
      await cloudinary.uploader.destroy(property.floorPlanImage.public_id);
    }

    // Gallery Images
    if (property.images?.length > 0) {
      for (const img of property.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }
    if(property?.createdBy?.role==="agent"){
        const user = await Agent.findById(property.createdBy._id);
        user.numOfProperties -=1;
        await user.save();
    }
        await DeletePropertyMail({name:property?.createdBy?.name,email:property?.createdBy?.email,reason,propertyType:property?.type,propertyCategory:property?.category,propertyTitle:property?.title})
        await Property.deleteOne({slug});
        return NextResponse.json({
            success:true,
            message:"property delete successfull"
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}