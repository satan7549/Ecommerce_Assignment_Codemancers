import { Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
}
