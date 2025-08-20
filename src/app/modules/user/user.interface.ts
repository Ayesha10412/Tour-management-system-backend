import { Types } from "mongoose";

export enum ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}
export interface IAuthProviders {
  provider: "google" | "credentials"; //google,credentials
  providerId: string;
}
export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  role: ROLE;
  auths: IAuthProviders[];
  booking?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
