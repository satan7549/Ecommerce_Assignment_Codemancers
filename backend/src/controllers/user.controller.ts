import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import httpStatus from "http-status";
import sendToken from "../utils/sendToken";
import { IUser } from "../types/user";
import sendResponse from "../utils/sendResponse";
import validator from "validator";
import messages from "../utils/messages";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        messages.PROVIDE_EMAIL_PASSWORD
      );
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        messages.INVALID_EMAIL
      );
    }

    if (password.length < 6) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        messages.SHORT_PASSWORD
      );
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return sendResponse(
        res,
        httpStatus.CONFLICT,
        false,
        messages.USER_EXISTS
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user: IUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    sendToken(res, httpStatus.CREATED, user);
  } catch (error: any) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        messages.PROVIDE_EMAIL_PASSWORD
      );
    }

    // Example of user login
    const userExists = await UserModel.findOne({ email }).select(
      "email password role"
    );

    if (!userExists) {
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.USER_NOT_FOUND
      );
    }

    // Password comparison
    const isPassword = await userExists.comparePassword(password);

    if (!isPassword) {
      return sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        false,
        messages.INVALID_EMAIL_PASSWORD
      );
    }

    sendToken(res, httpStatus.OK, userExists);
  } catch (error) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};

export { registerUser, userLogin };
