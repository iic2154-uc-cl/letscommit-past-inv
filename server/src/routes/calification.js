//importing modules
const express = require('express')
const calificationController = require('../controllers/calification')
const { postCalification, postCalificationList } = calificationController

const router = express.Router()

router.post('/', postCalification)
router.post('/list', postCalificationList)

module.exports = router
