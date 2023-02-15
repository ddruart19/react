const express = require("express");
const router = express.Router();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todoapp',
    password: 'admin',
    port: 5432,
});

router.get("/", async (req,res) => {
    pool.query('SELECT * FROM task', (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results.rows);
    });
});

module.exports = router;