import mongoose from "mongoose";

const vehicleTypeSchema = new mongoose.Schema({
    vehicleCategory:{type: String, required:true},
    pricePerKm:{type:Number, required:true},
    color:[{type: String, required:true}],
    numOfSeats:{type:Number, required:true},
    manufacYear:{type:Number, required: true},
    vehicleImageUrl:{type: String, required: true},
});

const transferSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    transferName:{type: String, required:true},
    city:{type: String, required:true},
    vehicleTypes:[vehicleTypeSchema],
    estimatedArrivalTime:{type:Number, required:true},
    transferImageUrl:{type: String, required:true},
    lastUpdated:{type:Date, required:true}

});

const Transfer = mongoose.model("Transfer", transferSchema);
export default Transfer;