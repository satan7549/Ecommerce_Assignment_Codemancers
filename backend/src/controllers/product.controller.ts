import { Request, Response } from "express";
import productMode from "../models/product.mode";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, image } = req.body;

  if (!title || !description || !price || !image) {
    return sendResponse(res, httpStatus.BAD_REQUEST, false, "All fields are required");
  }

  try {
    const newProduct = new productMode({ title, description, price, image });
    await newProduct.save();
    sendResponse(res, httpStatus.CREATED, true, "Product created successfully", newProduct);
  } catch (err: any) {
    console.log(err);
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, err.message);
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await productMode.find();
    sendResponse(res, httpStatus.OK, true, "Products fetched successfully", products);
  } catch (err: any) {
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, err.message);
  }
};

export { createProduct, getAllProduct };
