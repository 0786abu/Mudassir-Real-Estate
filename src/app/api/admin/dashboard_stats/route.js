import { DataBase } from "@/backend/config/database"
import Payment from "@/backend/model/paymentModel";
import Project from "@/backend/model/projectSchema";
import Property from "@/backend/model/propertyModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are not authorized to access this route"
        },{status:401})
        }
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);


        const firstStat = await Property.aggregate([
  {
    $group: {
      _id: null,

      // 1️⃣ Total Properties (ALL)
      totalProperties: { $sum: 1 },

      // 2️⃣ Approved Sale
      saleProperties: {
        $sum: {
          $cond: [
            {
              $and: [
                { $eq: ["$category", "Sale"] },
                { $eq: ["$isApproved", "Approved"] },
              ],
            },
            1,
            0,
          ],
        },
      },

      // 3️⃣ Approved Rent
      rentProperties: {
        $sum: {
          $cond: [
            {
              $and: [
                { $eq: ["$category", "Rent"] },
                { $eq: ["$isApproved", "Approved"] },
              ],
            },
            1,
            0,
          ],
        },
      },

      // 4️⃣ Pending (NOT Approved)
      unListedProperties: {
        $sum: {
          $cond: [{ $ne: ["$isApproved", "Approved"] }, 1, 0],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      totalProperties: 1,
      saleProperties: 1,
      rentProperties: 1,
      unListedProperties: 1,
    },
  },
]);
 const secondStat = await Property.aggregate([
  {
    $group: {
      _id: null,

      // 1️⃣ Total Properties (ALL)
      totalProperties: { $sum: 1 },

      // 2️⃣ Pending Properties
      pendingProperties: {
        $sum: {
          $cond: [{ $eq: ["$isApproved", "Pending"] }, 1, 0],
        },
      },

      // 3️⃣ Approved Properties
      approvedProperties: {
        $sum: {
          $cond: [{ $eq: ["$isApproved", "Approved"] }, 1, 0],
        },
      },

      // 4️⃣ Pending (NOT Approved)
      rejectedProperites: {
        $sum: {
          $cond: [{ $eq: ["$isApproved", "Rejected"] }, 1, 0],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      totalProperties: 1,
      pendingProperties: 1,
      approvedProperties: 1,
      rejectedProperites: 1,
    },
  },
]);
const typeStats = await Property.aggregate([
  {
    $group: {
      _id: "$type",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      type: "$_id",
      total: 1,
    },
  },
]);
const paymentStats = await Payment.aggregate([
  {
    $addFields: {
      createdAtDate: { $toDate: "$createdAt" },
    },
  },
  {
    $match: {
      createdAtDate: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    },
  },
  {
    $group: {
      _id: null,
      approvedAmount: {
        $sum: {
          $cond: [
            { $eq: ["$status", "Approved"] },
            "$amount",
            0,
          ],
        },
      },
      pendingAmount: {
        $sum: {
          $cond: [
            { $eq: ["$status", "Pending"] },
            "$amount",
            0,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      approvedAmount: 1,
      pendingAmount: 1,
      totalAmount: { $add: ["$approvedAmount", "$pendingAmount"] },
    },
  },
]);

const recentProperties = await Property.find().limit(5).sort({createdAt:-1});
const myProperties = await Property.find({createdBy:isAdmin._id}).limit(3).sort({createdAt:-1});
const totalProjects = await Project.countDocuments()

return NextResponse.json({
    success:true,
    firstStat,
    secondStat,
    typeStats,
    paymentStats,
    recentProperties,
    myProperties,
    totalProjects
},{status:200})

    } catch (error) {
        return NextResponse.json({
    success:false,
    message:error.message
},{status:400})

    }
}