const express = require('express')
const router = express.Router()
import { Request, Response } from "express"

const tasksController = require('../controllers/tasks.controller')


//Create
router.post("/", tasksController.create)

//Read
router.get("/", tasksController.get)

//Update
router.put("/:id", (req : Request, res : Response) => {
    res.json({'message': 'Update tasks'})
  })
  
//Delete
router.delete("/:id", (req : Request, res : Response) => {
    res.json({'message': 'Delete tasks'})
  })

module.exports = router;