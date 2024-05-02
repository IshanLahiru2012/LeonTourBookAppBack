import { body, validationResult } from "express-validator";
const handleValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
export const validateUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("city must be a string"),
    body("country").isString().notEmpty().withMessage("country must be a string"),
    handleValidationErrors
];
export const validateTransferRequest = [
    body("transferName").isString().notEmpty().withMessage("transferName required and must be a string"),
    body("city").isString().notEmpty().withMessage("city required and must be a string"),
    body("estimatedArrivalTime").isInt({ min: 0 }).notEmpty().withMessage("estimatedArrivalTime required and must be a positive number"),
    body("vehicleTypes").isArray().withMessage("vehicleTypes must be a Array"),
    body("vehicleTypes.*.vehicleCategory").isString().notEmpty().withMessage("vehicleTypes required and must be a string"),
    body("vehicleTypes.*.pricePerKm").isFloat({ min: 0 }).notEmpty().withMessage("pricePerKm required and must be positive"),
    body("vehicleTypes.*.numOfSeats").isInt({ min: 0 }).notEmpty().withMessage("NumOfSeats required and must be positive"),
    body("vehicleTypes.*.manufacYear").isInt({ min: 0 }).notEmpty().withMessage("manufacYear required and must be positive"),
    body("vehicleTypes.*.color").isArray().withMessage("color must be an Array").not().isEmpty().withMessage("color array can't be empty"),
    handleValidationErrors
];
//# sourceMappingURL=validation.js.map