import { DataBase } from "@/backend/config/database";
import User from "@/backend/model/authModel";
import Payment from "@/backend/model/paymentModel";
import Property from "@/backend/model/propertyModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{sttaus:401})
        }
        const {_id} = await params;
        const user = await User.findById(_id);
        if(!user){
            return NextResponse.json({
                success:false,
                message:"user not found"
            },{sttaus:401})
        }
        const recentProperties = await Property.find({createdBy:_id}).limit(3).sort({createdAt:-1});
        const recentPayments = await Payment.find({user:_id}).limit(3).sort({createdAt:-1})
        return NextResponse.json({
            success:true,
            user,
            recentPayments,
            recentProperties
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}