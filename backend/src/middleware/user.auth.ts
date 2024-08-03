import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import sendError from "../utils/sendError";
import httpStatus from "http-status";
import { IUser } from "../types/user";
import UserModel from "../models/user.model";

// interface for the user in req
export interface IUserRequest extends Request {
  user?: any;
}

const isUserAuthenticated = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendError(
      res,
      httpStatus.UNAUTHORIZED,
      "Please log in to access this resource."
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    // Fetch the user from the database
    const user = await UserModel.findById((decoded as any).id).select(
      "-password"
    );

    if (!user) {
      return sendError(res, httpStatus.UNAUTHORIZED, "User not found.");
    }

    // Save user inside req.user
    req.user = user as IUser;

    next();
  } catch (error) {
    return sendError(
      res,
      httpStatus.UNAUTHORIZED,
      "Invalid token. Please log in again."
    );
  }
};

const isAdmin = (req: IUserRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "superAdmin") {
    return sendError(
      res,
      httpStatus.FORBIDDEN,
      "Access denied. You do not have the required permissions."
    );
  }
  next();
};

export { isUserAuthenticated, isAdmin };
