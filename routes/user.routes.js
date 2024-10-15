const express = require("express");
const { userRegister ,getAllUsers ,userLogin } = require("../controler/user.controler");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router()

router.route("/register")
                .post( userRegister )

router.route("/getAllUsers")
                .get( authenticate, getAllUsers )

router.route("/login")
                .post( userLogin )
                

module.exports = router