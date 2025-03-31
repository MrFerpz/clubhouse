const db = require('./pool');

// using queries in this project for functions that interact directly with database outside of main flow

async function cleanTable() {
    await db.query("DELETE FROM users WHERE id = 1");
}

async function printTable() {
    const response  = await db.query("SELECT * FROM users");
    console.log(response.rows);
}

