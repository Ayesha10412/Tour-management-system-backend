import express from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { ROLE } from "../user/user.interface";
import { BookingController } from "./booking.controller";
import {
  createBookingZodSchema,
  updateBookingStatusZodSchema,
} from "./booking.validation";

const router = express.Router();

// api/v1/booking
router.post(
  "/",
  checkAuth(...Object.values(ROLE)),
  validateRequest(createBookingZodSchema),
  BookingController.createBooking
);

// api/v1/booking
router.get(
  "/",
  checkAuth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  BookingController.getAllBookings
);

// api/v1/booking/my-bookings
router.get(
  "/my-bookings",
  checkAuth(...Object.values(ROLE)),
  BookingController.getUserBookings
);

// api/v1/booking/bookingId
router.get(
  "/:bookingId",
  checkAuth(...Object.values(ROLE)),
  BookingController.getSingleBooking
);

// api/v1/booking/bookingId/status
router.patch(
  "/:bookingId/status",
  checkAuth(...Object.values(ROLE)),
  validateRequest(updateBookingStatusZodSchema),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;
