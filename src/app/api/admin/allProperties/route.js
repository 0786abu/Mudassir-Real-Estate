import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { isAuthorized } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

const toBoolean = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};


export async function GET(req) {
    try {
        await DataBase();
        const isAdmin = await isAuthorized();
        if(!isAdmin){
            return NextResponse.json({
                success:false,
                message:"you are nor authorized to access this route"
            },{status:401})
        }
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;
        const beds = Number(searchParams.get("beds"));
        const baths = Number(searchParams.get("baths"));
        const rooms = Number(searchParams.get("rooms"));
        const areaSize = searchParams.get('areaSize');
        const isApproved = searchParams.get('isApproved');
        const category = searchParams.get('category');
        const type = searchParams.get('type');
        const minsquareSize = searchParams.get('minsquareSize');
        const maxsquareSize = searchParams.get('maxsquareSize');
        const location = searchParams.get('location');
        const city = searchParams.get('city');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const isPaid = searchParams.get('isPaid');
        const isFree = searchParams.get('isFree');
        const isFeatured = searchParams.get('isFeatured');
        const isfurnished = searchParams.get('furnished');
        const paid = toBoolean(isPaid);
        const free = toBoolean(isFree);
        const featured = toBoolean(isFeatured);
        const furnished = toBoolean(isfurnished);

        const filter = {};
        if (paid !== undefined) filter.isPaid = paid;
        if (free !== undefined) filter.isFree = free;
        if (featured !== undefined) filter.isFeatured = featured;
        if (furnished !== undefined) filter.furnished = furnished;
        if (areaSize) filter.areaSize = areaSize;
        if (category) filter.category = category;
        if (type) filter.type = type;
        if (location) filter.location = location;
        if (beds) filter.beds = beds;
        if (city) filter.city = city;
        if (baths) filter.baths = baths;
        if (rooms) filter.rooms = rooms;
        if (isApproved) filter.isApproved = isApproved;
        if (minsquareSize || maxsquareSize) {
            filter.squareFits = {};
            if (minsquareSize) filter.squareFits.$gte = Number(minsquareSize);
            if (maxsquareSize) filter.squareFits.$lte = Number(maxsquareSize);
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        const totalProperties = await Property.countDocuments(filter);
        const totalPages = Math.ceil(totalProperties / limit);
        const properties = await Property.find(filter).skip(skip).limit(limit).populate("createdBy","name profile agencyProfile email role");
        return NextResponse.json({
            success:true,
            totalProperties,
            totalPages,
            properties
        },{status:200})
    } catch (error) {
       return NextResponse.json({
            success:false,
            error:error.message
        },{status:400}) 
    }
}