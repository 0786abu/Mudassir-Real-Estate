import { DataBase } from "@/backend/config/database";
import Payment from "@/backend/model/paymentModel";
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
        const status = searchParams.get("status");
        const paymentMethod = searchParams.get("paymentMethod");
        const filter = {}
        if(status){
            filter.status = status;
        }
        if(paymentMethod){
            filter.paymentMethod = paymentMethod;
        }
        const payments = await Payment.find(filter).populate("user","name email address role agencyName agencyProfile profile").populate("property","slug category type");
        return NextResponse.json({
            success: true,
            payments
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}