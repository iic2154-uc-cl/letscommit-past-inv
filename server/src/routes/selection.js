const express = require('express')
const selectionController = require('../controllers/selection')
const { postSelection } = selectionController
const protect = require("../middlewares/protect");

const router = express.Router()

router.post('/', protect.authenticateJWT, postSelection)

module.exports = router
