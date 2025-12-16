import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";



// for get chart data for owner dashboard
// export async function GET(req){
//   try {
//     await DataBase();
//     const user = await isAuthenticated();
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }
//     // get properties created by this user
//     const monthlyViews = await Property.aggregate([
//   { $match: { createdBy: user?._id } },          // sirf logged-in user ki properties
//   { 
//     $group: { 
//       _id: { 
//         month: { $month: "$createdAt" },     // month number 1-12
//         year: { $year: "$createdAt" }        // optional, agar multiple years ka data hai
//       },
//       totalViews: { $sum: "$views" }          // month ke liye views ka sum
//     } 
//   },
//   { $sort: { "_id.year": 1, "_id.month": 1 } } // month-wise ascending
// ]);
// const TypedData = await Property.aggregate([
//       {
//         $match: {
//           createdBy: user?._id
//         }
//       },
//       {
//         $group: {
//           _id: "$type",   // example: "Sale", "Rent", "Lease"
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           type: "$_id",
//           count: 1,
//           _id: 0
//         }
//       }
//     ]);
//     return NextResponse.json({
//       message: "Monthly views fetched successfully",
//       success: true,
//       viewsChart: monthlyViews,
//       TypedData
//     }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({
//       message: error.message,
//       success: false
//     }, { status: 500 });
//   }
// }
export async function GET(req) {
  try {
    await DataBase();
    const isUser = await isAuthenticated();
    if(!isUser){
      return NextResponse.json({
        success:false,
        message:"you are unauthorized ot access this route, please first login"
      },{status:400})
    }
    const now = new Date();

    // Current year start (Jan 1)
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    // Current month end
    const endOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const result = await Property.aggregate([
      {
        $match: {
          createdBy:isUser?._id,
          createdAt: {
            $gte: startOfYear,
            $lte: endOfCurrentMonth,
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalViews: { $sum: "$views" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          views: "$totalViews",
        },
      },
      { $sort: { month: 1 } },
    ]);

    // Month names
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    // 🔥 Only Jan → current month
    const formattedData = [];
    for (let i = 0; i <= now.getMonth(); i++) {
      const found = result.find(r => r.month === i + 1);
      formattedData.push({
        month: months[i],
        views: found ? found.views : 0, // 👈 no data = 0
      });
    }

    return NextResponse.json({
      success: true,
      year: now.getFullYear(),
      data: formattedData,
    },{status:200});

  } catch (error) {
    console.error(error);
    NextResponse.json({
      success: false,
      message: "Failed to fetch current year views",
    },{status:500});
  }
};