"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const express_validator_1 = require("express-validator");
const tasksController = require('../controllers/tasks.controller');
//Error management middleware
const errorManagement = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
};
//Create
router.post("/", body('name').not().isEmpty().trim().escape(), body('completed').not().isEmpty(), body('user_id').not().isEmpty(), errorManagement, tasksController.create);
//Read
router.get("/", tasksController.get);
//Update
router.put("/:id", tasksController.update);
//Delete
router.delete("/:id", tasksController.remove);
module.exports = router;
