//importing modules
const express = require('express')
const userController = require('../controllers/user')
const { signup, login, update} = userController
const userAuth = require('../middlewares/userAuth')
const protect = require("../middlewares/protect");

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login )

//validating the user
router.get('/validate', protect.authenticateJWT, (req, res) => {
    return res.status(200).json({
        message: "User is valid",
        user: req.user.email,
    });
})

//logout route
router.get('/logout', protect.authenticateJWT, (req, res) => {
    res.clearCookie("jwt");
    return res.status(200).json({
        message: "User logged out successfully",
    });
})

//update route
router.put('/update', protect.authenticateJWT, update)

module.exports = router