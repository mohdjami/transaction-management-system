import { Schema, model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  status: "success" | "pending" | "failed";
  type: "debit" | "credit";
  transactionDate: Date;
  amount: number;
  userId: Types.ObjectId;
}

const transactionSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["success", "pending", "failed"],
    },
    type: {
      type: String,
      required: true,
      enum: ["debit", "credit"],
    },
    transactionDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema,
);
