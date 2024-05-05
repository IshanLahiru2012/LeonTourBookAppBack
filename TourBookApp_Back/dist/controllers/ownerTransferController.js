import Transfer from "../models/transfer.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
const createTransfer = async (req, resp) => {
    try {
        const existingTransfer = await Transfer.findOne({ user: req.userId });
        if (existingTransfer) {
            return resp.status(409).json({ message: "User transfer already exist" });
        }
        const files = req.files;
        const transfer = new Transfer(req.body);
        transfer.user = new mongoose.Types.ObjectId(req.userId);
        transfer.lastUpdated = new Date();
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
const getTransfer = async (req, resp) => {
    try {
        const transfer = await Transfer.findOne({ user: req.userId });
        if (!transfer) {
            return resp.status(404).json({ message: "transfer not found" });
        }
        resp.json(transfer);
    }
    catch (error) {
        console.log("error: ", error);
        resp.status(500).json({ message: "Error fetching transfer" });
    }
};
const updateTransfer = async (req, resp) => {
    try {
        const transfer = await Transfer.findOne({ user: req.userId });
        if (!transfer) {
            return resp.status(404).json({ message: "transfer not found" });
        }
        transfer.transferName = req.body.transferName;
        transfer.city = req.body.city;
        transfer.vehicleTypes = req.body.vehicleTypes;
        transfer.estimatedArrivalTime = req.body.estimatedArrivalTime;
        transfer.lastUpdated = new Date();
        const files = req.files;
        if (files) {
            for (let i = 0; i < transfer.vehicleTypes.length; i++) {
                if (files[`vehicleTypes[${i}][vehicleImageUrl]`]) {
                    const vehicleImage = isImageFile(files[`vehicleTypes[${i}][vehicleImageUrl]`][0], `vehicleTypes[${i}][vehicleImageUrl]`);
                    if (vehicleImage) {
                        transfer.vehicleTypes[i].vehicleImageUrl = await uploadToCloudinary(files[`vehicleTypes[${i}][vehicleImageUrl]`][0]);
                    }
                    else {
                        transfer.vehicleTypes[i].vehicleImageUrl = '';
                    }
                }
            }
            if (files['transferImageUrl']) {
                const transferImage = isImageFile(files['transferImageUrl'][0], 'transferImageUrl') ?
                    files['transferImageUrl'][0] : undefined;
                if (transferImage) {
                    transfer.transferImageUrl = await uploadToCloudinary(transferImage);
                }
            }
        }
        console.log(transfer);
        await transfer.save();
        console.log(transfer);
        resp.status(200).send(transfer);
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Failed to update transfer" });
    }
};
const uploadToCloudinary = async (image) => {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI1 = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI1);
    return uploadResponse.url;
};
const isImageFile = (file, fieldName) => {
    return typeof file === 'object' && 'fieldname' in file && file.fieldname === fieldName;
};
export default {
    createTransfer,
    getTransfer,
    updateTransfer
};
//# sourceMappingURL=ownerTransferController.js.map