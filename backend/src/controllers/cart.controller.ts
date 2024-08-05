import { Response, NextFunction } from "express";
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { IUserRequest } from "../middleware/user.auth";
import sendEmail from "../services/sendEmail";
import messages from "../utils/messages";

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
        messages.PRODUCT_NOT_FOUND
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

    sendResponse(
      res,
      httpStatus.CREATED,
      true,
      messages.ITEM_ADD_TO_CART,
      cart
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

    if (!cart || cart.items.length === 0) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.CART_EMPTY,
        []
      );
    }

    sendResponse(res, httpStatus.OK, true, messages.FETCH, cart);
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

// Remove item from cart
const removeFromCart = async (req: any, res: Response, next: NextFunction) => {
  const { productId } = req.body;
  const userId = req.user?._id;

  try {
    const cart = await CartModel.findOne({ user: userId, isCheckedOut: false });

    if (!cart) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.CART_NOT_FOUND
      );
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.ITEM_NOT_FOUND_CART
      );
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    await cart.save();

    sendResponse(res, httpStatus.OK, true, messages.ITEM_REMOVED_CART, cart);
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
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.CART_NOT_FOUND
      );
    }

    cart.shippingAddress = shippingAddress;
    cart.isCheckedOut = true;
    cart.items = [];
    await cart.save();

    // Send checkout confirmation email
    const emailSubject = messages.ORDER_CONFIRMATION;
    const emailText = messages.THANK_YOU_PURCHASE(shippingAddress);
    await sendEmail(req.user.email, emailSubject, emailText);

    sendResponse(res, httpStatus.OK, true, messages.CHECKOUT_SUCCESS, cart);
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

export { addToCart, getCart, removeFromCart, checkoutCart };
