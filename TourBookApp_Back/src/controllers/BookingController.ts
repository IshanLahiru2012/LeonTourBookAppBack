import {Request, Response} from "express";
import Transfer from "../models/transfer.js";
import Booking from "../models/booking.js";
import mongoose, {Schema} from "mongoose";


const createBooking = async (req:Request, resp:Response)=>{
    try{
        const transfer = await Transfer.findById(req.body.transferId)
        if(!transfer){
            throw new Error("Transfer not found");
        }
        const booking  = new Booking(req.body);

        booking.user = new mongoose.Types.ObjectId(req.userId);
        booking.transfer = transfer.id;
        booking.createdAt = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000);
        booking.status = "placed";
        await booking.save();

        console.log(booking);
        resp.status(201).send(booking);

    }catch (error){
        console.log(error);
        resp.status(500).json({message: error.raw.message})

    }

}

const getBookings = async (req:Request, resp:Response)=>{
    try{
        const bookings = await Booking.find({user:req.userId}).populate("transfer").populate("user");

        resp.json(bookings);
    }catch (error){
        console.log(error)
        resp.status(500).json({message:"Something went wrong"});
    }
}

export default {
    createBooking,
    getBookings
}