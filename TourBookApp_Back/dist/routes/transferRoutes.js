import express from "express";
import multer from "multer";
import transferController from "../controllers/transferController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateTransferRequest } from "../middleware/validation.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    dest: 'uploads/'
});
const mfUpload = upload.fields([{ name: 'transferImageUrl', maxCount: 1 }, { name: 'vehicleImageUrl', maxCount: 1 }]);
router.post("/", mfUpload, validateTransferRequest, jwtCheck, jwtParse, transferController.createTransfer);
export default router;
//# sourceMappingURL=transferRoutes.js.map