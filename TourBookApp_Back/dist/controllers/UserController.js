import User from "../models/user.js";
const getCurrentUser = async (req, resp) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });
        if (!currentUser) {
            return resp.status(404).json({ message: "User not found" });
        }
        return resp.json(currentUser);
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({ message: "Something went wrong" });
    }
};
const createCurrentUser = async (req, res) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            return res.status(200).send();
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
};
const updateCurrentUser = async (req, res) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
        await user.save();
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
};
export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser
};
//# sourceMappingURL=UserController.js.map