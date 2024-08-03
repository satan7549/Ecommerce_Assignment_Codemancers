import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
  shippingAddress: string;
  isCheckedOut: boolean;
  createdAt: Date;
}
