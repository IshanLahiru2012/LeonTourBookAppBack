import express from "express";
import { param } from "express-validator";
import TransferController from "../controllers/TransferController.js";
const router = express.Router();
router.get("/search/:city", param("city").isString().trim().notEmpty().withMessage("City parameter must be a valid string"), TransferController.searchTransfers);
export default router;
//# sourceMappingURL=TransferRoute.js.map