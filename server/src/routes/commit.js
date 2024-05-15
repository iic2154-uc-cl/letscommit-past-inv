//importing modules
const express = require('express')
const commitController = require('../controllers/commit')
const { postCommit, getCommits, postOwnedCommit } = commitController
const protect = require("../middlewares/protect");

const router = express.Router()

router.post('/', postCommit)
router.get('/list', getCommits)
router.post('/owned', protect.authenticateJWT, postOwnedCommit)

module.exports = router