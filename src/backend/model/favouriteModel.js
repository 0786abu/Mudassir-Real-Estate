import mongoose from "mongoose";

const { Schema } = mongoose;

const FavouriteSchema = new Schema({
  propertyID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },
  savedBy:{
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel",
    required: true
  },
    createdByModel:{
        type: String,
        required: true,
        enum: ["User","Agent"]
    },
},{ timestamps: true });
const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", FavouriteSchema);

export default Favourite;