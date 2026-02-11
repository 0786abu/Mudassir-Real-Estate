import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel.js";
import { NextResponse } from "next/server";




// for latest properties
export async function GET(req)  {
  try {
    await DataBase();

    const properties = await Property.find({isApproved:"Approved"},{title:1,description:1,city:1,beds:1,rooms:1,baths:1,squareFits:1,slug:1,images:1,price:1,type:1,category:1,areaSize:1})
      .sort({ createdAt: -1 }) // newest first
      .limit(4); // optional
      
    return NextResponse.json({
      success: true,
      count: properties.length,
      properties,
    },{status:200});
  } catch (error) {
    NextResponse.json({
      success: false,
      message: error.message,
    },{status:500});
  }
};
