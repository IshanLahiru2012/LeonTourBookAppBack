import {Request, Response} from "express";
import Transfer from "../models/transfer.js";

const searchTransfers = async (req:Request, resp:Response)=>{
    try {
        const city = req.params.city;

        const searchQuery = req.query.searchQuery as string || "";
        const selectedCategory = req.query.selectedCategory as string || "";
        const sortOption = req.query.sortOption as string || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {};

        query["city"] = new RegExp(city, "i");
        const checkCity = await Transfer.countDocuments(query)
        if (checkCity ===0){
            return resp.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }
            })
        }
        if(selectedCategory){
            const vehiclesArray = selectedCategory.split(",").map((vehicle) => new RegExp(vehicle, "i"));
            query["vehicleTypes.vehicleCategory" ] = {$all: vehiclesArray};
        }
        if (searchQuery){
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] =[
                { transferName: searchRegex},
                { "vehicleTypes.vehicleCategory" : {$in: [searchRegex]}   }
            ];
        }
        const pageSize =10;
        const skip = (page-1)*pageSize;

        const transfers = await Transfer.find(query).sort({[sortOption]:1}).skip(skip).limit(pageSize).lean();

        const total = await Transfer.countDocuments(query);

        const response = {
            data: transfers,
            pagination: {
                total,
                page,
                pages: Math.ceil(total/pageSize)
            }
        }
        console.log(response)
        resp.json(response);

    }catch (error){
        console.log(error);
        resp.status(500).json({message:"Something went wrong"});
    }

}

const getTransfer = async  (req:Request, resp: Response)=>{
    try{
        const transferId = req.params.transferId;
        const transfer = await Transfer.findById(transferId);
        if(!transfer){
            return resp.status(404).json({message: "Transfer not found"});
        }
        resp.json(transfer);

    }catch (error){
        console.log(error);
        resp.status(500).json({message:"Something went wrong"});
    }
}

export default {
    searchTransfers,
    getTransfer
}