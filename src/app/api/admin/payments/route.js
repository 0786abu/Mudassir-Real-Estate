import { DataBase } from "@/backend/config/database";
import Payment from "@/backend/model/paymentModel";
import Property from "@/backend/model/propertyModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                message: "you are not authorized to access this route",
                success: false
            }, { status: 401 });
        }
        const {searchParams} = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1
        const limit = 12;
        const skip = (page - 1) * limit;
        const status = searchParams.get("status");
        const paymentMethod = searchParams.get("paymentMethod");
        const filter = {}
        if(status){
            filter.status = status;
        }
        if(paymentMethod){
            filter.paymentMethod = paymentMethod;
        }
        const totalPaymentsList = await Payment.countDocuments();
        const totalPages = Math.ceil(totalPaymentsList / limit);
        const payments = await Payment.find(filter).skip(skip).limit(limit).populate("user","name email address role agencyName agencyProfile profile").populate("property","slug category type");
        return NextResponse.json({
            success: true,
            payments,
            totalPaymentsList,
            totalPages
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}