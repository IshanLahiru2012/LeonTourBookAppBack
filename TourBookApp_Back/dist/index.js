import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import ownerTransferRoutes from "./routes/OwnerTransferRoutes.js";
import transferRoute from "./routes/TransferRoute.js";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("connected to database"))
    .catch((error) => console.error("There was a problem to connect database :", error));
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5050;
const server = app.listen(port, () => {
    console.log(`app is listening at port :${port} `);
})
    .on('error', (err) => {
    if (err.cause === 'EADDRINUSE') {
        console.log('Port 5050 already in use. Please try a different port');
    }
    else {
        console.error(err);
    }
});
app.get("/helth", async (req, res) => {
    res.json({ message: "hello nodeJs" });
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transfer", ownerTransferRoutes);
app.use("/api/v1/public/transfer", transferRoute);
//# sourceMappingURL=index.js.map