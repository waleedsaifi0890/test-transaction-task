import mongoose, { Schema, Document } from "mongoose";

// Define a mongoose model
interface ITransaction extends Document {
  amount: number;
  description: string;
  isSuspicious: boolean;
  isAllowed: boolean;
  comment: string;
  createdAt: Date;
}

const TransactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isSuspicious: {
    type: Boolean,
    default: false,
  },
  isAllowed: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);

export default TransactionModel;
