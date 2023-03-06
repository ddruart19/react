const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.controller')

//Create
router.post('/', usersController.create)
router.post('/authentication', usersController.authentication)



module.exports = router;
export {}