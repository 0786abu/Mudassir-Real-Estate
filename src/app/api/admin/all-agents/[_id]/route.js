import { DataBase } from "@/backend/config/database";
import Agent from "@/backend/model/agentModel";
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
        const agent = await Agent.findById(_id);
        if(!agent){
            return NextResponse.json({
                success:false,
                message:"agent not found"
            },{sttaus:401})
        }
        const recentProperties = await Property.find({createdBy:_id}).limit(3).sort({createdAt:-1});
        const recentPayments = await Payment.find({user:_id}).limit(3).sort({createdAt:-1})
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
                  createdBy:agent?._id,
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
            const typeData = await Property.aggregate([
                  {
                    $match: {
                      createdBy: agent._id, // 👈 sirf apni properties
                    },
                  },
                  {
                    $group: {
                      _id: "$type", // 👈 category wise group
                      totalProperties: { $sum: 1 },
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      type: "$_id",
                      count: "$totalProperties",
                    },
                  },
                  { $sort: { count: -1 } }, // optional: high → low
                ]);
        
                const availablePropertiesPercent = await Property.aggregate([
              {
                $match: {
                  createdBy: agent._id, // 👈 sirf agent ki properties
                },
              },
              {
                $group: {
                  _id: null,
                  totalProperties: { $sum: 1 },
                  available: {
                    $sum: {
                      $cond: [{ $eq: ["$isApproved", "Approved"] }, 1, 0],
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  totalProperties: 1,
                  available: 1,
                  availablePercent: {
                    $cond: [
                      { $eq: ["$totalProperties", 0] },
                      0,
                      {
                        $round: [
                          {
                            $multiply: [
                              { $divide: ["$available", "$totalProperties"] },
                              100,
                            ],
                          },
                          0, // 👈 integer percent (80)
                        ],
                      },
                    ],
                  },
                },
              },
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
            success:true,
            agent,
            recentPayments,
            recentProperties,
            data:formattedData,
            typeData,
            availablePropertiesPercent:availablePropertiesPercent[0] || {
        totalProperties: 0,
        available: 0,
        availablePercent: 0,
      },
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:400})
    }
}