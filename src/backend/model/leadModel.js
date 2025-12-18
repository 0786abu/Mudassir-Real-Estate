import mongoose from "mongoose";


const {Schema} = mongoose;

const leadSchema = new Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },

  // Request sender (Visitor / User)
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "requestedByModel",
  },
  requestedByModel: {
    type: String,
    enum: ["User", "Agent"],
  },

  // Property owner (Agent / User)
  requestedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "requestedToModel",
  },
  requestedToModel: {
    type: String,
    required: true,
    enum: ["User", "Agent"],
  },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isGuest:{
    type:Boolean
  },
  status: {
    type: String,
    enum: ["pending", "contacted", "closed"],
    default: "pending",
  },

}, { timestamps: true });


const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;