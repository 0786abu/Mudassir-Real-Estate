import mongoose from "mongoose";


const {Schema} = mongoose;

const projectSchema = new Schema({
  seo_title:{type:String,required:true},
  seo_description:{type:String,required:true},
  keywords:[String],
  projectTitle: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  projectLogo:{
    url:{type:String,required:true},
    public_id:{type:String,required:true}
  },
  images:[
    {
        url:{type:String,required:true},
        public_id:{type:String,required:true}
    }
  ],
  offering:[String],
  developedBy:{
    logo:{
        url:{type:String,required:true},
        public_id:{type:String,required:true}
    },
    developer:{type:String,required:true},
    description:{type:String,required:true}
  },
  marketingBy:{
    logo:{
        url:{type:String,required:true},
        public_id:{type:String,required:true}
    },
    platform:{type:String,required:true},
    description:{type:String,required:true}
  },
  type:{
    type:String,
    required:true
  },
  minItemPrice:{
    type:Number,
    required:true
  },
    maxItemPrice:{
    type:Number,
    required:true
  },
  items:[
    {
        itemTitle:{type:String,required:true},
        parentMaxPrice:{type:Number,required:true},
        parentMinPrice:{type:Number,required:true},
        subItems:[
            {
                subItemTitle:{type:String,required:true},
                minPrice:{type:Number,required:true},
                maxPrice:{type:Number,required:true},
                areaSize:{type:String,required:true},
                beds:{type:Number},
                bathrooms:{type:Number}
            }
        ]
    }
  ],
  detailedDescription:{
    type:String,
    required:true
  },
  isFeatured:{
    type:Boolean
  },
  isSponsored:{
    type:Boolean
  },
  map:{
    type:String,
    required:true
  },
  floorPlans:[
    {
        floorName:{type:String,required:true},
        floorImage:{
            url:{type:String,required:true},
            public_id:{type:String,required:true}
        }
    }
  ],
  paymentPlans:[
    {
        paymentName:{type:String,required:true},
        paymentImage:{
            url:{type:String,required:true},
            public_id:{type:String,required:true}
        }
    }
  ],
  features:{
    plotFeatures:[String],
    forFamily_Lifestyle:[String],
    forWork_Connectivity:[String],
    forSafety_Maintenance:[String],
    others:[String]
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
    required:true
  },
  projectOwnerPhone:{
    type:Number,
    required:true
  },
  projectOwnerEmail:{
    type:String,
    required:true
  },
  projectOwnerWhatsappAPI:{
    type:String,
    required:true
  }


}, { timestamps: true });


const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;