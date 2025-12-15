import { DataBase } from "@/backend/config/database";
import Payment from "@/backend/model/paymentModel";
import Property from "@/backend/model/propertyModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function PUT(req,{params}) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:400})
        }
        const {_id} = await params;
        const {status,adminNote} = await req.json();
        const payment = await Payment.findById(_id);
        if(!payment){
            return NextResponse.json({
                success:false,
                message:"payment not found"
            },{status:400})
        }
        const property = await Property.findById(payment?.property);
        if(!property){
            return NextResponse.json({
                success:false,
                message:"property not found"
            },{status:400})
        }
        payment.status = status;
        payment.adminNote = adminNote;
        if(status==="Rejected"){
            property.isApproved = "No Approved"
        }else{
            property.isApproved = "Approved"
            property.isPaid = true
        }
        await payment.save();
        await property.save();
        return NextResponse.json({
            success:true,
            message:"Request Submit Successfully",
            property,
            payment
        },{status:200})
    } catch (error) {
         NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}