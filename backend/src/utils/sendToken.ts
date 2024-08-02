import { Response } from "express";
import { IUser } from "../types/user";

const sendToken = (res: Response, statusCode: number, user: IUser) => {
  const token = user.getjwtToken();

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
