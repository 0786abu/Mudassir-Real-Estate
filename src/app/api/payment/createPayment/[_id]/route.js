import { DataBase } from "@/backend/config/database";
import Payment from "@/backend/model/paymentModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import {NextResponse} from "next/server";

export async function DELETE(req,{params}){
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if (!isAdmin) {
          return NextResponse.json(
            { success: false, message: "You are not authorized" },
            { status: 401 }
          );
        }
        const {_id} = await params;

        const payment = await Payment.findById(_id);
        if(!payment){
            return NextResponse.json({success:false,message:"Payment not found"},{status:404});
        }
        if(payment.status==="Pending"){
          return NextResponse.json({success:false,message:"Cannot delete a pending payment, first take action"},{status:400});
        }
        await payment.deleteOne();
        return NextResponse.json({success:true,message:"Payment deleted successfully"},{status:200});
    } catch (error) {
        return NextResponse.json({success:false,message:error.message},{status:500});
    }
} 