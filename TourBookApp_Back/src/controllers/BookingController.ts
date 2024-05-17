import {Request, Response} from "express";
import Transfer from "../models/transfer.js";
import Booking from "../models/booking.js";
import mongoose from "mongoose";

const createBooking = async (req:Request, resp:Response)=>{
    try{
        const transfer = await Transfer.findById(req.body.transferId)
        if(!transfer){
            throw new Error("Transfer not found");
        }
        const booking  = new Booking(req.body);

        booking.user = new mongoose.Types.ObjectId(req.userId);
        booking.transfer = transfer.id;
        booking.createdAt = new Date(Date.now());
        booking.status = "placed";


        await booking.save();

        console.log(booking);
        resp.status(201).send(booking);

    }catch (error){
        console.log(error);
        resp.status(500).json({message: error.raw.message})

    }

}

export default {
    createBooking
}