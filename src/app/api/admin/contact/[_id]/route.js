import { DataBase } from "@/backend/config/database";
import Contact from "@/backend/model/contactModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
            },{status:401})
        }
        const {_id} = await params;
        const existcontact = await Contact.findById(_id);
        if(!existcontact){
            return NextResponse.json({
                success:false,
                message:"contact not found"
            },{status:401})
        }
        const contact = await Contact.findByIdAndDelete(_id);
        return NextResponse.json({
            success:true,
            message:"Contact delete successfull",
            contact
        },{status:200});
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400});
    }
}