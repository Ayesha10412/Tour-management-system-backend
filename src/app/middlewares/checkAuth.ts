import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import httpStatus from "http-status-codes";
export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(httpStatus.BAD_GATEWAY, "No token received");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(405, "You're not permitted to view this route!");
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
