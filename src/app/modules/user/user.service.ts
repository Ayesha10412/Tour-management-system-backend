/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { IAuthProviders, IUser, ROLE } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist!!");
  }
  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProviders = {
    provider: "credentials",
    providerId: email!,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (payload.role) {
    if (decodedToken.role === ROLE.USER || decodedToken.role === ROLE.GUIDE)
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }
  if (payload.role === ROLE.SUPER_ADMIN && decodedToken.role === ROLE.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === ROLE.USER || decodedToken.role === ROLE.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
    }
  }
  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }
  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};
const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};
export const UserServices = { createUser, getAllUsers, updateUser };
