import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import productModel from "../models/product.model";
import messages from "../utils/messages";

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, image } = req.body;

  if (!title || !description || !price || !image) {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      messages.ALL_FIELDS_REQUIRED
    );
  }

  try {
    const newProduct = new productModel({ title, description, price, image });
    await newProduct.save();
    sendResponse(res, httpStatus.CREATED, true, messages.CREATED, newProduct);
  } catch (error: any) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      error.message,
      error
    );
  }
};

// Get all products
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    sendResponse(res, httpStatus.OK, true, messages.FETCH, products);
  } catch (error: any) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      error.message,
      error
    );
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
      messages.PRODUCT_ID_REQUIRED
    );
  }

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.PRODUCT_NOT_FOUND
      );
    }

    sendResponse(res, httpStatus.OK, true, messages.FETCH, product);
  } catch (error: any) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      error.message,
      error
    );
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
      messages.PRODUCT_ID_REQUIRED
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
        messages.PRODUCT_NOT_FOUND
      );
    }

    sendResponse(
      res,
      httpStatus.OK,
      true,
      messages.UPDATE_SUCCESS,
      updatedProduct
    );
  } catch (error: any) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      error.message,
      error
    );
  }
};

export { createProduct, getAllProduct, getProductById, updateProduct };
