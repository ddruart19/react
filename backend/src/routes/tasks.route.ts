const express = require('express')
const router = express.Router()
// const { body } = require('express-validator');
import { NextFunction, Request, Response } from "express"
// import { validationResult } from "express-validator";

const tasksController = require('../controllers/tasks.controller')

// Check authentication middleware
const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) { return next() }
  res.status(401).json({message:"Not connected"})
}

// Error management middleware
// const errorManagement = (req: Request, res: Response, next: NextFunction) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     return next()
//   }

//Create
router.post("/", 
    checkAuthenticated,
    tasksController.create
)

//Read
router.get("/", 
    checkAuthenticated,
    tasksController.get
)

//Update
router.put("/:id", 
    checkAuthenticated,
    tasksController.update
)
  
//Delete
router.delete("/:id", 
    checkAuthenticated,
    tasksController.remove
)

module.exports = router;

export {}