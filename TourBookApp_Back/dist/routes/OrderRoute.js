import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
const router = express.Router();
router.post("/booking/create-booking", jwtCheck, jwtParse);
//# sourceMappingURL=OrderRoute.js.map