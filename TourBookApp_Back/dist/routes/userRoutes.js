import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import userController from "../controllers/userController.js";
import { validateUserRequest } from "../middleware/validation.js";
const router = express.Router();
router.get("/", jwtCheck, jwtParse, userController.getCurrentUser);
router.post("/", jwtCheck, userController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateUserRequest, userController.updateCurrentUser);
export default router;
//# sourceMappingURL=userRoutes.js.map