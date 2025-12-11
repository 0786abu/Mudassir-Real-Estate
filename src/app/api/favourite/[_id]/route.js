import { DataBase } from "@/backend/config/database";
import Favourite from "@/backend/model/favouriteModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                success:false,
                message:"unAuthorized access, please first login"
            },{status:401});
        }
        const {_id} = await params;
        const favourite = await Favourite.findById(_id);
        if(!favourite){
            return NextResponse.json({
                success:false,
                message:"favourite not found"
            },{status:404});
        }
        if(favourite.savedBy.toString() !== isUser._id.toString()){
            return NextResponse.json({
                success:false,
                message:"you are not allowed to delete this favourite"
            },{status:403});
        }
        await Favourite.findByIdAndDelete(_id);
        return NextResponse.json({
            success:true,
            message:"favourite deleted successfully"
        },{status:200});
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }
}