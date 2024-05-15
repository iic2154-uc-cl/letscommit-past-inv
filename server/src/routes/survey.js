const express = require('express')
const surveyController = require('../controllers/survey')
const { postSurvey } = surveyController
const protect = require("../middlewares/protect");

const router = express.Router()

router.post('/', protect.authenticateJWT, postSurvey)

module.exports = router
