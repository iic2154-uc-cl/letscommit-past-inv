//importing modules
const express = require('express')
const botController = require('../controllers/bots')
const { getMessages, getCalification } = botController
const protect = require("../middlewares/protect");

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.get('/messages', protect.authenticateJWT, getMessages )

router.get('/calification', protect.authenticateJWT, getCalification )

module.exports = router