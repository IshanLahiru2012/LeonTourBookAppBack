import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import BookingController from "../controllers/BookingController.js";
const router = express.Router();
router.post("/create-booking", jwtCheck, jwtParse, BookingController.createBooking);
export default router;
//# sourceMappingURL=BookingRoute.js.map