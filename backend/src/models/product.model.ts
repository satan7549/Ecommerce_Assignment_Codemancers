// src/models/Product.ts
import { Schema, model } from "mongoose";
import { IProduct } from "../types/product";

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, "please enter product title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [6, "price can't exceed 6 characters"],
  },
  image: { type: String, required: true },
});

export default model<IProduct>("Product", ProductSchema);
