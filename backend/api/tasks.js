const express = require("express");
const router = express.Router();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
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