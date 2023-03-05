const express = require('express')
const router = express.Router()

const tasksController = require('../controllers/tasks.controller')


//Create
router.post("/", tasksController.create)

//Read
router.get("/", tasksController.get)

//Update
router.put("/:id", tasksController.update)
  
//Delete
router.delete("/:id", tasksController.remove)

module.exports = router;

export {}