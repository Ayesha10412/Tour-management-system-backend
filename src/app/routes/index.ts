import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { DivisionRoutes } from "../modules/division/division.routes";
import { TourRoutes } from "../modules/tour/tour.routes";
import { OtpRoutes } from "../modules/otp/otp.route";
import { BookingRoutes } from "../modules/booking/booking.routes";
export const router = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/division",
    route: DivisionRoutes,
  },
  {
    path: "/tour",
    route: TourRoutes,
  },
  {
    path: "/otp",
    route: OtpRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
