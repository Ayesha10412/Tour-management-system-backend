/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/appError";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(httpStatus.BAD_REQUEST, "Fake request");
    const user = await UserServices.createUser(req.body);
    res
      .status(httpStatus.CREATED)
      .json({ message: "User created successfully!", user });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
export const UserControllers = {
  createUser,
};

//route matching-> controller->service->model->db
