import { Response } from "express";

const sendError = (res: Response, statusCode: number, message: string) => {
    
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default sendError;
