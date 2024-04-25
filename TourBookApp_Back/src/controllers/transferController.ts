import {Request, Response} from "express";
import Transfer from "../models/transfer.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
const createTransfer = async (req:Request, resp:Response)=>{

    try{
        const existingTransfer = await Transfer.findOne({user: req.userId});
        if(existingTransfer){
            return resp.status(409).json({message:"User transfer already exist"})
        }
        const isVehicleImage = (file: any,fieldName:string): file is Express.Multer.File => {
            return typeof file === 'object' && 'fieldname' in file && file.fieldname === fieldName;
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const vehicleImage = isVehicleImage(files['vehicleImageUrl'][0], 'vehicleImageUrl') ? files['vehicleImageUrl'][0] : undefined;
        const transferImage = isVehicleImage(files['transferImageUrl'][0], 'transferImageUrl') ? files['transferImageUrl'][0] : undefined;

        const uploadToCloudinary = async (image:Express.Multer.File)=>{
            const base64Image= Buffer.from(image.buffer).toString("base64");
            const dataURI1 = `data:${image.mimetype};base64,${base64Image}`;
            const uploadResponse = await cloudinary.v2.uploader.upload(dataURI1);
            return uploadResponse.url;
        }

        const transfer = new Transfer(req.body);
        transfer.user = new mongoose.Types.ObjectId(req.userId);
        transfer.lastUpdated = new Date();
        if(transferImage){
            transfer.transferImageUrl = await uploadToCloudinary(transferImage);

        }
        if(vehicleImage){
            transfer.vehicleTypes[0].vehicleImageUrl = await uploadToCloudinary(vehicleImage);
        }
        await transfer.save();

        console.log(transfer)
        resp.status(201).send(transfer);
    }catch (error){
        console.log(error);
        resp.status(500).json({message:"Something went wrong"});
    }
}
export default {
    createTransfer
}