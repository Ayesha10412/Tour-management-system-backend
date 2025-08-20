/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

import { checkAuth } from "../../middlewares/checkAuth";
import { Router } from "express";
import { ROLE } from "./user.interface";
const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-users",
  checkAuth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  UserControllers.getAllUsers
);
router.patch(
  "/:id",
  checkAuth(...Object.values(ROLE)),
  UserControllers.updateUser
);
export const userRoutes = router;
