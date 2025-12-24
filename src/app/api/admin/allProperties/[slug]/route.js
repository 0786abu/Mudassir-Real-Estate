import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { isAuthorized } from "@/backend/utils/middlewere";
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
        property.isApproved = status;
        await property.save();
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