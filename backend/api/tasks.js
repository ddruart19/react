const express = require("express");
const router = express.Router();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

router.get("/", async (req,res) => {
    try{
        pool.query('SELECT * FROM task', (error, results) => {
            res.status(200).json({message : results.rows});
        });
    }catch (error){
        return res.status(500).send("Server error");
    }

});

module.exports = router;