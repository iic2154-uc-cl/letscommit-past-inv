//importing modules
const express = require('express')
const assignmentController = require('../controllers/assignment')
const { postAssignments, getToDoAssignment } = assignmentController
const protect = require("../middlewares/protect");

const router = express.Router()

router.post('/', postAssignments)
router.get('/todo', protect.authenticateJWT, getToDoAssignment)

module.exports = router