import express from "express";
import {jwtCheck, jwtParse} from "../middleware/auth.js";
import BookingController from "../controllers/BookingController.js";
import bookingController from "../controllers/BookingController.js";

const router = express.Router();

router.post("/create-booking",jwtCheck, jwtParse, BookingController.createBooking);
router.get("/",jwtCheck, jwtParse, bookingController.getBookings)

export default router;