const mongoose = require('mongoose');
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        await mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = connectDB;
