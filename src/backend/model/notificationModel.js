import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    },
    link:{
        type:String
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'createdByModel' },
      createdByModel: { type: String, required: true, enum: ['User', 'Agent'] },
},{ timestamps: true });
const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default Notification;