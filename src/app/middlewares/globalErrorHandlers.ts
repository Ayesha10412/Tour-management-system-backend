/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!!";
  //duplicate  error
  if (err.code === 11000) {
    console.log(err.message);
    const matchedArray = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `${matchedArray[1]} already exists!`;
  }
  //cast error or object id error
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectId. Please provide a valid id.";
  } else if (err instanceof AppError) {
    statusCode = err.statuscode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
