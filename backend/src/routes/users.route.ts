const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.controller')

//Create
router.post('/', usersController.create)



module.exports = router;
export {}