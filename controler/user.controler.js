const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt.utils");

const userRegister = async (req, res) => {
    try {
        const { fName, lName, email, password } = req.body;

        if (!fName || !lName || !email || !password) {
            return res.status(400).json({ status: "Error", message: "All fields are required" });
        }

        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ status: "Error", message: "The email already has an account. Please login." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fName,
            lName,
            email,
            password: hashedPassword,
        });

        await newUser.save(); 
        const token = generateToken(newUser);

        return res.status(201).json({
            status: "Success",
            message: `User ${fName} ${lName} has been registered successfully`,
            token,
        });
    } catch (error) {
        console.error("Error in userRegister:", error); 
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { __v: false, password: false });
        return res.status(200).json({ status: "Success" , data: users});
    } catch (error) {
        console.error("Error in getAllUsers:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "Error", message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(401).json({ status: "Error", message: "Incorrect password" });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: `Welcome back ${user.fName} ${user.lName}`,
            token,
        });
    } catch (error) {
        console.error("Error in userLogin:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};

module.exports = {
    userRegister,
    getAllUsers,
    userLogin,
};