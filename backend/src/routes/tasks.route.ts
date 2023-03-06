const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";

const tasksController = require('../controllers/tasks.controller')

//Error management middleware
const errorManagement = (req: Request, res: Response, next: NextFunction) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next()
  }

//Create
router.post("/", 
    body('name').not().isEmpty().trim().escape(),
    body('completed').not().isEmpty(),
    body('user_id').not().isEmpty(),
    errorManagement,
    tasksController.create
)

//Read
router.get("/", tasksController.get)

//Update
router.put("/:id", tasksController.update)
  
//Delete
router.delete("/:id", tasksController.remove)

module.exports = router;

export {}