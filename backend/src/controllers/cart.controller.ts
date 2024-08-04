import { Response, NextFunction } from "express";
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { IUserRequest } from "../middleware/user.auth";
import sendEmail from "../services/sendEmail";

// Add item to cart
const addToCart = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { productId, quantity } = req.body;
  const userId = req.user?._id;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        "Product not found"
      );
    }

    let cart = await CartModel.findOne({ user: userId, isCheckedOut: false });

    if (!cart) {
      cart = await CartModel.create({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    sendResponse(res, httpStatus.CREATED, true, "Item added to cart", cart);
  } catch (error) {
    next(error);
  }
};

// Get cart
const getCart = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  try {
    const cart = await CartModel.findOne({
      user: userId,
      isCheckedOut: false,
    }).populate("items.product");

    if (!cart) {
      return sendResponse(res, httpStatus.NOT_FOUND, false, "Cart not found");
    }

    sendResponse(res, httpStatus.OK, true, "Cart fetched successfully", cart);
  } catch (error) {
    next(error);
  }
};

// Checkout cart
const checkoutCart = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { shippingAddress } = req.body;

  try {
    const cart = await CartModel.findOne({ user: userId, isCheckedOut: false });

    if (!cart) {
      return sendResponse(res, httpStatus.NOT_FOUND, false, "Cart not found");
    }

    cart.shippingAddress = shippingAddress;
    cart.isCheckedOut = true;
    await cart.save();

    // Send checkout confirmation email
    const emailSubject = "Order Confirmation";
    const emailText = `Thank you for your purchase! Your order has been successfully checked out and will be shipped to ${shippingAddress}.`;
    await sendEmail(req.user.email, emailSubject, emailText);

    sendResponse(res, httpStatus.OK, true, "Checkout successful", cart);
  } catch (error) {
    next(error);
  }
};

export { addToCart, getCart, checkoutCart };
