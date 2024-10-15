const { verifyToken } = require("../utils/jwt.utils");

const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ status: "Error", message: "Access denied. No token provided." });
    }

    try {
        const decoded = verifyToken(token); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(403).json({ message: error.message }); 
    }
};

module.exports = authenticate;
