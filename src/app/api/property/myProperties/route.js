import { DataBase } from "@/backend/config/database";
import Property from "@/backend/model/propertyModel";
import { isAuthenticated } from "@/backend/utils/middlewere";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await DataBase();
        const isUser = await isAuthenticated();
        if(!isUser){
             return NextResponse.json(
                {
                    success: false,
                    message: `your are not authorized to access this route, please login first`
                },
                { status: 400 }
            );
        }
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const beds = Number(searchParams.get("beds"));
        const limit = 4;
        const skip = (page - 1) * limit;
        const areaSize = searchParams.get('areaSize');
        const category = searchParams.get('category');
        const type = searchParams.get('type');
        const location = searchParams.get('location');
        const city = searchParams.get('city');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const filter = {createdBy:isUser?._id};
        console.log(type)
        if (areaSize) filter.areaSize = areaSize;
        if (category) filter.category = category;
        if (type) filter.type = type;
        if (location) filter.location = location;
        if (beds) filter.beds = beds;
        if (city) filter.city = city;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        const numOfProperties = await Property.countDocuments(filter);
        const totalPages = Math.ceil(numOfProperties / limit);
        const properties = await Property.find(filter).skip(skip).limit(limit).populate('createdBy', 'name email agencyProfile profile whatsappAPI socialMedia');
        return NextResponse.json({
            success: true,
            totalProperties: numOfProperties,
            totalPages,
            currentPage: page,
            properties
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
