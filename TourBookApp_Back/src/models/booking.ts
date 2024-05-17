import mongoose, {Schema} from "mongoose";


const bookingSchema = new mongoose.Schema({
    transfer: { type: mongoose.Schema.Types.ObjectId, ref: "Transfer" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookingDetails:{
        date : {type: Date, required:true},
        time :{type: String, required: true},
        distance:{type: Number, required:true},
        color: {type: String, required:true},
    },
    userDetails:{
        email: {type: String, required:true},
        name: {type: String, required:true},
        addressLine1: {type: String, required:true},
        city: {type: String, required:true},
        country: {type: String, required:true},
    },
    vehicleTypeIndex:{type: Number, required:true},
    status: {type: String, enum: ["placed", "inProgress", "outForDelivery", "delivered"] },
    createdAt: { type: Date, default: Date.now },

});

const Booking = mongoose.model("Booking",bookingSchema);

export default Booking;