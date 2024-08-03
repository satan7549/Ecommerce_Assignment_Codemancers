import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import sendError from "../utils/sendError";
import httpStatus from "http-status";
import { IUser } from "../types/user";

// interface for the user in req
interface IUserRequest extends Request {
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
    req.user = decoded as IUser;
    next();
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
    //   id: string;
    // };
    // // Save user inside req.user
    // req.user = await userModel.findById(decoded.id);
    // next();
  } catch (error) {
    return sendError(
      res,
      httpStatus.UNAUTHORIZED,
      "Invalid token. Please log in again."
    );
  }
};

export default isUserAuthenticated;
