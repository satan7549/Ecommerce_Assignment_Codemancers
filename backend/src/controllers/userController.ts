import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import httpStatus from "http-status";
import sendToken from "../utils/sendToken";
import sendError from "../utils/sendError";
import { IUser } from "../types/user";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(
        res,
        httpStatus.BAD_REQUEST,
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
      return sendError(
        res,
        httpStatus.BAD_REQUEST,
        "Please provide both email and password"
      );
    }

    // Example of user login
    const userExists = await UserModel.findOne({ email }).select(
      "email password role"
    );


    if (!userExists) {
      return sendError(
        res,
        httpStatus.UNAUTHORIZED,
        "Invalid email or password"
      );
    }

    // Password comparison
    const isPassword = await userExists.comparePassword(password);

    if (!isPassword) {
      return sendError(
        res,
        httpStatus.UNAUTHORIZED,
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
