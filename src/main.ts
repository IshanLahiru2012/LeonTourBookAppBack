import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then( () => console.log("connected to database"))
    .catch((error) => console.error("There was a problem to connect database :",error));

const app = express();
app.use(express.json());
app.use(cors());


const server = app.listen(process.env.PORT || 5050,()=> {
    console.log("app is listening at port 5050 ");
    })
    .on('error', (err)=>{
        if(err.cause === 'EADDRINUSE'){
            console.log('Port 5050 already in use. Please try a different port');
        }else {
            console.error(err);
        }
    });

app.get("/helth",async (req:Request, res:Response)=>{
    res.json({message:"hello nodeJs"});
});

app.use("/api/v1/user",userRoutes)