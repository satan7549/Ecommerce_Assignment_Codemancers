import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import httpStatus from "http-status";
import sendToken from "../utils/sendToken";
import { IUser } from "../types/user";
import sendResponse from "../utils/sendResponse";

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
        "Please provide both email and password"
      );
    }
    // Check if user already exists
    const hashedPassword = await bcrypt.hash(password, 5);

    const user: IUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    sendToken(res, httpStatus.CREATED, user);
  } catch (error) {
    // Pass the error to the error middleware
    next(error);
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
        "Please provide both email and password"
      );
    }

    // Example of user login
    const userExists = await UserModel.findOne({ email }).select(
      "email password role"
    );

    if (!userExists) {
      return sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        false,
        "User not found. You need to signup first."
      );
    }

    // Password comparison
    const isPassword = await userExists.comparePassword(password);

    if (!isPassword) {
      return sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        false,
        "Invalid email or password"
      );
    }

    sendToken(res, httpStatus.OK, userExists);
  } catch (error) {
    // Pass the error to the error middleware
    next(error);
  }
};

export { registerUser, userLogin };
