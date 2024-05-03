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
const vehicleImageUrlsList = Array.from({ length: 12 }, (_, index) => ({ name: `vehicleTypes[${index}][vehicleImageUrl]`, maxCount: 1 }));
const mfUpload = upload.fields([{ name: 'transferImageUrl', maxCount: 1 }, ...vehicleImageUrlsList]);
router.post("/", mfUpload, validateTransferRequest, jwtCheck, jwtParse, transferController.createTransfer);
router.get("/", jwtCheck, jwtParse, transferController.getTransfer);
router.put("/", mfUpload, validateTransferRequest, jwtCheck, jwtParse, transferController.updateTransfer);
export default router;
//# sourceMappingURL=transferRoutes.js.map