import mongoose, { Schema } from "mongoose";
import { ICart, ICartItem } from "../types/cart";

const CartItemSchema: Schema<ICartItem> = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema: Schema<ICart> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [CartItemSchema],
  shippingAddress: {
    type: String,
    required: false,
  },
  isCheckedOut: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CartModel = mongoose.model<ICart>("Cart", CartSchema);

export default CartModel;
