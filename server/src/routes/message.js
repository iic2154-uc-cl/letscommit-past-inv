//importing modules
const express = require('express')
const messageController = require('../controllers/message')
const { postMessage, postMessageList } = messageController

const router = express.Router()

router.post('/', postMessage)
router.post('/list', postMessageList)

module.exports = router