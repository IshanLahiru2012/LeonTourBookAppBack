import Transfer from "../models/transfer.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
const createTransfer = async (req, resp) => {
    try {
        const existingTransfer = await Transfer.findOne({ user: req.userId });
        if (existingTransfer) {
            return resp.status(409).json({ message: "User transfer already exist" });
        }
        const isImageFile = (file, fieldName) => {
            return typeof file === 'object' && 'fieldname' in file && file.fieldname === fieldName;
        };
        const files = req.files;
        const uploadToCloudinary = async (image) => {
            const base64Image = Buffer.from(image.buffer).toString("base64");
            const dataURI1 = `data:${image.mimetype};base64,${base64Image}`;
            const uploadResponse = await cloudinary.v2.uploader.upload(dataURI1);
            return uploadResponse.url;
        };
        const transfer = new Transfer(req.body);
        for (let i = 0; i < transfer.vehicleTypes.length; i++) {
            const vehicleImage = isImageFile(files[`vehicleTypes[${i}][vehicleImageUrl]`][0], `vehicleTypes[${i}][vehicleImageUrl]`);
            if (vehicleImage) {
                transfer.vehicleTypes[i].vehicleImageUrl = await uploadToCloudinary(files[`vehicleTypes[${i}][vehicleImageUrl]`][0]);
            }
            else {
                transfer.vehicleTypes[i].vehicleImageUrl = '';
            }
        }
        const transferImage = isImageFile(files['transferImageUrl'][0], 'transferImageUrl') ?
            files['transferImageUrl'][0] : undefined;
        transfer.user = new mongoose.Types.ObjectId(req.userId);
        transfer.lastUpdated = new Date();
        if (transferImage) {
            transfer.transferImageUrl = await uploadToCloudinary(transferImage);
        }
        await transfer.save();
        console.log(transfer);
        resp.status(201).send(transfer);
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Something went wrong" });
    }
};
export default {
    createTransfer
};
//# sourceMappingURL=transferController.js.map