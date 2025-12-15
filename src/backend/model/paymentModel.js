import mongoose from "mongoose";


const {Schema} = mongoose;

const paymentSchema = new Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, refPath: 'createdByModel'
    },
    createdByModel: { 
        type: String, required: true, 
        enum: ['User', 'Agent']
    },
    amount: {
      type: Number,
      required: true,
    },
bankDetails: {
  bankName: String,
  accountTitle: String,
  accountNumber: String,
  iban: String
},

    paymentMethod: {
      type: String,
      enum: ["jazzcash", "easypaisa", "bank_transfer"],
      required: true,
    },

    paymentScreenshot: {
      public_id:{
        type: String,
      required: true,
      },
      url:{
        type: String,
      required: true,
      }
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    adminNote: {
      type: String, // rejection / approval note
    },

    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;