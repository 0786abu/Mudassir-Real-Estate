import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";



// for get chart data for owner dashboard
export async function GET(req){
  try {
    await DataBase();
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    // get properties created by this user
    const monthlyViews = await Property.aggregate([
  { $match: { createdBy: user?._id } },          // sirf logged-in user ki properties
  { 
    $group: { 
      _id: { 
        month: { $month: "$createdAt" },     // month number 1-12
        year: { $year: "$createdAt" }        // optional, agar multiple years ka data hai
      },
      totalViews: { $sum: "$views" }          // month ke liye views ka sum
    } 
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } } // month-wise ascending
]);
const TypedData = await Property.aggregate([
      {
        $match: {
          createdBy: user?._id
        }
      },
      {
        $group: {
          _id: "$type",   // example: "Sale", "Rent", "Lease"
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);
    return NextResponse.json({
      message: "Monthly views fetched successfully",
      success: true,
      viewsChart: monthlyViews,
      TypedData
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false
    }, { status: 500 });
  }
}