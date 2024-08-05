import { Document } from "mongoose";

export enum UserRole {
  USER = "user",
  SUPER_ADMIN = "superAdmin",
}

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  getjwtToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// Define a TypeScript interface for the request body
export interface LoginRequestBody {
  email: string;
  password: string;
}
