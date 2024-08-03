import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import productModel from "../models/product.model";

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, image } = req.body;

  if (!title || !description || !price || !image) {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      "All fields are required"
    );
  }

  try {
    const newProduct = new productModel({ title, description, price, image });
    await newProduct.save();
    sendResponse(
      res,
      httpStatus.CREATED,
      true,
      "Product created successfully",
      newProduct
    );
  } catch (err: any) {
    console.log(err);
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, err.message);
  }
};

// Get all products
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    sendResponse(
      res,
      httpStatus.OK,
      true,
      "Products fetched successfully",
      products
    );
  } catch (err: any) {
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, err.message);
  }
};

// Get a product by ID
const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      "Product ID is required"
    );
  }

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        "Product not found"
      );
    }

    sendResponse(
      res,
      httpStatus.OK,
      true,
      "Product fetched successfully",
      product
    );
  } catch (err: any) {
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, err.message);
  }
};

// Update a product
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price, image } = req.body;

  if (!id) {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      "Product ID is required"
    );
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { title, description, price, image },
      { new: true }
    );

    if (!updatedProduct) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        "Product not found"
      );
    }

    sendResponse(
      res,
      httpStatus.OK,
      true,
      "Product updated successfully",
      updatedProduct
    );
  } catch (err: any) {
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, err.message);
  }
};

export { createProduct, getAllProduct, getProductById, updateProduct };
