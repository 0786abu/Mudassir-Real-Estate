import mongoose from "mongoose";

const { Schema } = mongoose;

const propertySchema = new Schema({
    seo_title:{
        type: String,
        maxLength: 70,
        minLength: 10,
        required: true
    },
    seo_description:{
        type: String, 
        maxLength: 160,
        minLength: 50,
        required: true
    },
    keywords:[String],
    slug:{
        type: String,
        unique: true,
        required: true
    },
    title:{
        type: String,
        required: true,
        maxLength: 100,
        minLength: 10
    },
    description:{
        type: String,
        required: true,
        maxLength: 2000,
        minLength: 20
    },
    price:{
        type: Number,
        required: true,
        min: 4
    },
    country:{
        type: String,
        default: "Pakistan"
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    images:[
        {
            public_id: String,
            url: String
        }
    ],
    rooms:{
        type: Number
    },
    beds:{
        type: Number
    },
    baths:{
        type: Number
    },
    squareFits:{
        type: Number,
        required: true
    },
    areaSize:{
        type: String,
        required: true
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    isApproved:{
        type: String,
        default: "Pending",
        enum:["Pending","Approved","Rejected"]
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    isFree:{
        type: Boolean,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    furnished:{
        type: Boolean,
        required: true
    },
    aboutProperty:{
        type: String,
        required: true
    },
    amenities:[
        {
            type: String,
        }
    ],
    video:{
        type: String
    },
    isRequestedForPayment:{
        type:Boolean,
        default:false
    },
    balcony:{
        type: Number
    },
    operatingSince:{
        type:Number,
        required:true
    },
    floorPlanImage:{
        public_id: String,
        url: String
    },
    views:{
        type: Number,
        default: 0
    },
     createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'createdByModel' },
  createdByModel: { type: String, required: true, enum: ['User', 'Agent'] },
},{ timestamps: true  });
const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;