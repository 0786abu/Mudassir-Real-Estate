import { DataBase } from "@/backend/config/database";
import Payment from "@/backend/model/paymentModel";
import Property from "@/backend/model/propertyModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { ApprovedPaymentMail, RejectPaymentMail } from "@/backend/utils/NodeMailer";
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
        const payment = await Payment.findById(_id).populate("property","slug type category").populate("user","name email address role agencyName agencyProfile profile");
        if(!payment){
            return NextResponse.json({
                success:false,
                message:"payment not found"
            },{status:400})
        }
        const property = await Property.findById(payment?.property?._id);
        if(!property){
            return NextResponse.json({
                success:false,
                message:"property not found"
            },{status:400})
        }
        payment.status = status;
        payment.adminNote = adminNote || undefined;
        let link = `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${property.slug}`
        if(status==="Rejected"){
            property.isRequestedForPayment = false
            await RejectPaymentMail({name:payment.user.name,email:payment.user.email,reason:adminNote})
        }else{
            property.isApproved = "Approved"
            property.isPaid = true
            await ApprovedPaymentMail({name:payment.user.name,email:payment.user.email,link})
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
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}