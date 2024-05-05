import Transfer from "../models/transfer.js";
const searchTransfers = async (req, resp) => {
    try {
        const city = req.params.city;
        const searchQuery = req.query.searchQuery || "";
        const selectedColors = req.query.selectedColors || "";
        const sortOption = req.query.sortOption || "lastUpdated";
        const page = parseInt(req.query.page) || 1;
        let query = {};
        query["city"] = new RegExp(city, "i");
        const checkCity = await Transfer.countDocuments(query);
        if (checkCity === 0) {
            return resp.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }
            });
        }
        if (selectedColors) {
            const colorsArray = selectedColors.split(",").map((color) => new RegExp(color, "i"));
            query["color"] = { $all: colorsArray };
        }
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] = [
                { transferName: searchRegex },
                { color: { $in: [searchRegex] } }
            ];
        }
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const transfers = await Transfer.find(query).sort({ [sortOption]: 1 }).skip(skip).limit(pageSize).lean();
        const total = await Transfer.countDocuments(query);
        const response = {
            data: transfers,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize)
            }
        };
        console.log(response);
        resp.json(response);
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Something went wrong" });
    }
};
export default {
    searchTransfers
};
//# sourceMappingURL=TransferController.js.map