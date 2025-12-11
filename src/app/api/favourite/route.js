import { DataBase } from "@/backend/config/database";
import Favourite from "@/backend/model/favouriteModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                message: "Unauthenticated, please first login to access this route",
                success: false
            },{status: 401});
        };
        const { propertyID } = await req.json();
        if(!propertyID){
            return NextResponse.json({
                message: "propertyID is required",
                success: false
            },{status: 400});
        }
        const alreadyFavourite = await Favourite.findOne({savedBy: isUser._id, propertyID});
        if(alreadyFavourite){
            return NextResponse.json({
                message: "property is already in favourites",
                success: false
            },{status: 400});
        }
        const savedBy = isUser._id;
        const createdByModel = isUser.role==="agent" ? "Agent" : "User";
        const newFavourite = await Favourite.create({
            propertyID,
            savedBy,
            createdByModel
        });
        return NextResponse.json({
            message: "property added to favourites",
            success: true,
            data: newFavourite
        },{status: 201});
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        },{status: 500});
    }
}

export async function GET(req){
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        if(!isUser){
            return NextResponse.json({
                message: "Unauthenticated, please first login to access this route",
                success: false
            },{status: 401});
        };
        const favourites = await Favourite.find({savedBy:isUser._id},{propertyID:1}).populate("propertyID","title slug description price category type beds baths images squareFits location city createdAt")
        return NextResponse.json({
            message: "Favourites fetched successfully",
            success: true,
            totalFavs: favourites.length,
            data: favourites
        },{status: 200});
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        },{status: 500});
    }
}